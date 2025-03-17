import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { navItems } from '../../../constants/navigation';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeTab, 
  setActiveTab 
}: SidebarProps) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform 
      transition-transform duration-300 ease-in-out lg:translate-x-0 
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Teacher Portal</h2>
            <p className="text-sm text-gray-500">Spring 2024</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            // Navigation items rendering logic
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;