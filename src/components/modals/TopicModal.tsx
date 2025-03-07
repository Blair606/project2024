import { useState } from 'react';
import { Topic } from '../../types/unit';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (topic: Omit<Topic, 'id' | 'completed'>) => void;
  initialData?: Topic;
}

export const TopicModal = ({ isOpen, onClose, onSubmit, initialData }: TopicModalProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    questions: initialData?.questions || [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ]
  });

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: ''
        }
      ]
    });
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = formData.questions.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = formData.questions.map((q, i) => {
      if (i === questionIndex) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium mb-4">
          {initialData ? 'Edit Topic' : 'Create New Topic'}
        </h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Topic Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700">Questions</h4>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  Add Question
                </button>
              </div>

              {formData.questions.map((question, qIndex) => (
                <div key={qIndex} className="border rounded-lg p-4">
                  <input
                    type="text"
                    placeholder="Question"
                    className="w-full mb-3 p-2 border rounded"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                    required
                  />
                  
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={option === question.correctAnswer}
                          onChange={() => handleQuestionChange(qIndex, 'correctAnswer', option)}
                          required
                        />
                        <input
                          type="text"
                          placeholder={`Option ${oIndex + 1}`}
                          className="flex-1 p-2 border rounded"
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {initialData ? 'Save Changes' : 'Create Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 