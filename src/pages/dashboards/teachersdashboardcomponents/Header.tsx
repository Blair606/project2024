import { useState } from 'react';
import { EnvelopeIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';
import ProfileMenu from './ProfileMenu';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left side */}
        <div className="flex items-center lg:w-64">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <EnvelopeIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Send Message</span>
          </button>
          
          <ProfileMenu 
            user={user}
            showMenu={showProfileMenu}
            setShowMenu={setShowProfileMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;