import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  AcademicCapIcon,
  UserIcon,
  BoltIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
  ClockIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Learner Portal',
      description: 'Access your courses, assignments, and track your learning progress',
      icon: UserIcon,
      path: '/learner/login',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Tutor Portal',
      description: 'Manage courses, learners, and track academic performance',
      icon: AcademicCapIcon,
      path: '/tutor/login',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Guardian Portal',
      description: 'Monitor your ward\'s progress and manage finances',
      icon: UserGroupIcon,
      path: '/dashboard/guardian',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  const features = [
    {
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications about grades, assignments, and announcements',
      icon: BoltIcon,
      color: 'text-blue-500',
    },
    {
      title: 'Secure Access',
      description: 'Protected portals with role-based authentication and data encryption',
      icon: ShieldCheckIcon,
      color: 'text-green-500',
    },
    {
      title: 'Easy Management',
      description: 'Intuitive interface for managing courses, assignments, and grades',
      icon: PuzzlePieceIcon,
      color: 'text-purple-500',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and progress tracking for better insights',
      icon: ChartBarIcon,
      color: 'text-indigo-500',
    },
    {
      title: 'Flexible Schedule',
      description: 'Access your portal anytime, anywhere with 24/7 availability',
      icon: ClockIcon,
      color: 'text-red-500',
    },
    {
      title: 'Mobile Friendly',
      description: 'Fully responsive design that works seamlessly on all devices',
      icon: DevicePhoneMobileIcon,
      color: 'text-yellow-500',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Welcome to EduPortal
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Your comprehensive learning management system. Choose your portal to get started.
            </p>
          </div>

          {/* Portal Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`${role.color} p-6 sm:p-8`}>
                  <role.icon className="w-12 h-12 text-white mb-4" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {role.title}
                  </h2>
                  <p className="text-white text-sm opacity-90">
                    {role.description}
                  </p>
                </div>
                <div className="p-6">
                  <button
                    onClick={() => navigate(role.path)}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                  >
                    Access Portal
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-24 sm:mt-32">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose EduPortal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature) => (
                <div 
                  key={feature.title} 
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
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

export default HomePage;