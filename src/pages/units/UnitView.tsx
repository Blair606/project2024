import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  LockClosedIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Topic, Unit } from '../../types/unit';

const UnitView = () => {
  const { unitId, topicId } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API
    // For now, get from localStorage
    const units = JSON.parse(localStorage.getItem('units') || '[]');
    const foundUnit = units.find((u: Unit) => u.id === Number(unitId));
    if (foundUnit) {
      setUnit(foundUnit);
      const topic = foundUnit.topics.find((t: Topic) => t.id === Number(topicId));
      if (topic) {
        setCurrentTopic(topic);
      }
    }
  }, [unitId, topicId]);

  const handleNextTopic = () => {
    if (!unit || !currentTopic) return;
    const currentIndex = unit.topics.findIndex(t => t.id === currentTopic.id);
    if (currentIndex < unit.topics.length - 1) {
      const nextTopic = unit.topics[currentIndex + 1];
      navigate(`/unit/${unitId}/topic/${nextTopic.id}`);
    }
  };

  const handlePreviousTopic = () => {
    if (!unit || !currentTopic) return;
    const currentIndex = unit.topics.findIndex(t => t.id === currentTopic.id);
    if (currentIndex > 0) {
      const previousTopic = unit.topics[currentIndex - 1];
      navigate(`/unit/${unitId}/topic/${previousTopic.id}`);
    }
  };

  const handleQuizSubmit = () => {
    if (!currentTopic) return;
    
    const correctAnswers = currentTopic.questions.filter(q => 
      answers[q.id] === q.correctAnswer
    ).length;
    
    const score = (correctAnswers / currentTopic.questions.length) * 100;
    
    // Update topic completion status
    const updatedTopic = {
      ...currentTopic,
      completed: true,
      lastVisited: new Date().toISOString()
    };
    
    // Update unit in localStorage
    const units = JSON.parse(localStorage.getItem('units') || '[]');
    const updatedUnits = units.map((u: Unit) => {
      if (u.id === Number(unitId)) {
        return {
          ...u,
          topics: u.topics.map(t => 
            t.id === updatedTopic.id ? updatedTopic : t
          ),
          progress: Math.round(
            (u.topics.filter(t => t.completed).length / u.topics.length) * 100
          )
        };
      }
      return u;
    });
    
    localStorage.setItem('units', JSON.stringify(updatedUnits));
    setQuizSubmitted(true);
    
    // If score is sufficient, enable next topic
    if (score >= 70) {
      setTimeout(handleNextTopic, 2000);
    }
  };

  if (!unit || !currentTopic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="text-sm text-gray-500">
            {unit.code} - {unit.name}
          </div>
        </div>

        {/* Topic Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{currentTopic.title}</h1>
          <div className="prose max-w-none mb-8">
            {currentTopic.content}
          </div>

          {!showQuiz ? (
            <button
              onClick={() => setShowQuiz(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Take Quiz to Continue
            </button>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Topic Quiz</h2>
              {currentTopic.questions.map(question => (
                <div key={question.id} className="border rounded-lg p-4">
                  <p className="font-medium mb-3">{question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={() => setAnswers({
                            ...answers,
                            [question.id]: option
                          })}
                          disabled={quizSubmitted}
                          className="text-blue-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              {!quizSubmitted && (
                <button
                  onClick={handleQuizSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={Object.keys(answers).length !== currentTopic.questions.length}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          )}
        </div>

        {/* Topic Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousTopic}
            disabled={unit.topics[0].id === currentTopic.id}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Previous Topic
          </button>
          <button
            onClick={handleNextTopic}
            disabled={!currentTopic.completed || unit.topics[unit.topics.length - 1].id === currentTopic.id}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            Next Topic
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitView; 