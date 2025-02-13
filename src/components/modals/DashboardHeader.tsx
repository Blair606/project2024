import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface DashboardHeaderProps {
  userRole: string;
  userName: string;
}

const DashboardHeader = ({ userRole, userName }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">{userRole} Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <BellIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="w-8 h-8 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 