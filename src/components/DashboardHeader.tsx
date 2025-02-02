import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  userRole: string;
  userName?: string;
}

const DashboardHeader = ({ userRole, userName = 'User' }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-64 right-0 z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-gray-600"
            title="Return to Home"
          >
            <HomeIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              {userRole} Portal
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-blue-600">Spring 2024</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-700">Welcome back, {userName}</span>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;