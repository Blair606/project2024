import { useState } from 'react';
import { ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface Discussion {
  id: string;
  title: string;
  lastMessage: string;
  participants: number;
  unreadCount: number;
  lastActive: string;
}

const Discussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Class Discussions</h2>
        <button 
          onClick={() => setShowNewDiscussionModal(true)}
          className="btn-primary flex items-center"
        >
          <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
          New Discussion
        </button>
      </div>

      <div className="grid gap-4">
        {discussions.map((discussion) => (
          <div 
            key={discussion.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{discussion.title}</h3>
                <p className="text-gray-600 mt-1">{discussion.lastMessage}</p>
              </div>
              {discussion.unreadCount > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {discussion.unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center mt-4 text-sm text-gray-500">
              <UserCircleIcon className="w-4 h-4 mr-1" />
              <span>{discussion.participants} participants</span>
              <span className="mx-2">•</span>
              <span>Last active {discussion.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussions;