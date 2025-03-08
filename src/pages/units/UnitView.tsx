import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';

interface Unit {
  id: string;
  title: string;
  description: string;
  content: string;
  resources: Array<{
    id: string;
    title: string;
    type: 'video' | 'document' | 'quiz';
    url: string;
  }>;
}

const UnitView: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  
  // This would typically come from an API call
  const [unit] = useState<Unit>({
    id: unitId || '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, props, and state.',
    content: 'React is a JavaScript library for building user interfaces...',
    resources: [
      {
        id: '1',
        title: 'React Basics Video',
        type: 'video',
        url: 'https://example.com/video1'
      },
      {
        id: '2',
        title: 'React Documentation',
        type: 'document',
        url: 'https://example.com/docs'
      },
      {
        id: '3',
        title: 'React Quiz',
        type: 'quiz',
        url: 'https://example.com/quiz1'
      }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Unit Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{unit.title}</h1>
            <p className="text-gray-600">{unit.description}</p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content</h2>
            <div className="prose max-w-none">
              {unit.content}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resources</h2>
            <div className="grid gap-4">
              {unit.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mr-4">
                    {resource.type === 'video' && (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {resource.type === 'document' && (
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {resource.type === 'quiz' && (
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Access
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnitView; 