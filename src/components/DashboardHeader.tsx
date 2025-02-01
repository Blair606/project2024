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
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Return to Home"
          >
            <HomeIcon className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm text-gray-500">
            {userRole} Dashboard
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Welcome, {userName}</span>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;