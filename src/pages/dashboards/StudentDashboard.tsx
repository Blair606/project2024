import { useState } from 'react';
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  ChartBarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('courses');

  const [currentCourses] = useState([
    { id: 1, name: 'Advanced Mathematics', progress: 75, nextClass: '2:30 PM Today' },
    { id: 2, name: 'Computer Science', progress: 60, nextClass: '10:00 AM Tomorrow' },
    // Add more courses as needed
  ]);

  const [upcomingTasks] = useState([
    { id: 1, title: 'Math Assignment', due: '2024-03-20', course: 'Advanced Mathematics' },
    { id: 2, title: 'Programming Project', due: '2024-03-22', course: 'Computer Science' },
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Your Math assignment has been graded', teacher: 'Dr. Smith', time: '1 hour ago' },
    { id: 2, message: 'New study materials uploaded for Computer Science', teacher: 'Prof. Johnson', time: '3 hours ago' },
    { id: 3, message: 'Class cancelled tomorrow', teacher: 'Dr. Williams', time: '5 hours ago' },
  ]);

  const [financialStatus] = useState({
    tuitionStatus: 'Paid',
    nextPayment: '2024-04-01',
    amount: 1500,
    scholarshipStatus: 'Active',
  });

  const [academicResults] = useState({
    gpa: 3.8,
    totalCredits: 45,
    currentSemesterGrades: [
      { course: 'Advanced Mathematics', grade: 'A', percentage: 92 },
      { course: 'Computer Science', grade: 'A-', percentage: 88 },
    ],
  });

  // Add quick stats for the overview
  const quickStats = [
    { id: 1, label: 'Attendance Rate', value: '95%', icon: CheckCircleIcon, color: 'text-green-500' },
    { id: 2, label: 'Upcoming Tests', value: '3', icon: ExclamationCircleIcon, color: 'text-orange-500' },
    { id: 3, label: 'GPA Trend', value: '+0.2', icon: ArrowTrendingUpIcon, color: 'text-blue-500' },
  ];

  const menuItems = [
    { id: 'courses', icon: BookOpenIcon, label: 'Courses' },
    { id: 'schedule', icon: CalendarIcon, label: 'Schedule' },
    { id: 'discussions', icon: ChatBubbleLeftRightIcon, label: 'Discussions' },
    { id: 'notifications', icon: BellIcon, label: 'Notifications' },
    { id: 'academic', icon: ChartBarIcon, label: 'Academic Progress' },
    { id: 'financial', icon: BanknotesIcon, label: 'Financial Status' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'courses':
        return (
          <div className="space-y-6">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickStats.map((stat) => (
                <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Courses */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                  <BookOpenIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Current Courses
                </h2>
                <div className="space-y-4">
                  {currentCourses.map(course => (
                    <div key={course.id} 
                         className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-100 border-2 border-transparent 
                                  transition-all duration-200 cursor-pointer">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-gray-800">{course.name}</h3>
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full">{course.nextClass}</span>
                        </div>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-blue-600">{course.progress}% Complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                  <CalendarIcon className="w-5 h-5 mr-2 text-purple-500" />
                  Upcoming Tasks
                </h2>
                <div className="space-y-4">
                  {upcomingTasks.map(task => (
                    <div key={task.id} className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-200">
                      <h3 className="font-medium text-purple-900">{task.title}</h3>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-purple-600">{task.course}</span>
                        <span className="text-purple-700 font-medium">Due: {task.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                <BellIcon className="w-5 h-5 mr-2 text-blue-500" />
                Recent Notifications
              </h2>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} 
                       className="group p-4 border-l-4 border-blue-500 bg-white hover:bg-blue-50/50 
                                rounded-r-xl shadow-sm hover:shadow-md transition-all duration-200">
                    <p className="text-gray-800 font-medium group-hover:text-blue-700 transition-colors">
                      {notification.message}
                    </p>
                    <div className="flex items-center mt-2 space-x-3">
                      <span className="text-sm font-medium text-blue-600">{notification.teacher}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Mark All as Read
                </button>
                <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Notification Settings
                </button>
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                <ChartBarIcon className="w-5 h-5 mr-2 text-blue-500" />
                Academic Progress
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <p className="text-sm font-medium text-blue-600 mb-1">Current GPA</p>
                  <p className="text-3xl font-bold text-blue-700">{academicResults.gpa}</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <p className="text-sm font-medium text-green-600 mb-1">Total Credits</p>
                  <p className="text-3xl font-bold text-green-700">{academicResults.totalCredits}</p>
                </div>
              </div>
              <div className="space-y-4">
                {academicResults.currentSemesterGrades.map((course, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{course.course}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{course.percentage}%</span>
                      <span className="font-bold text-blue-600">{course.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BanknotesIcon className="w-5 h-5 mr-2" />
                Financial Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tuition Status:</span>
                  <span className="text-green-500 font-medium">{financialStatus.tuitionStatus}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Payment:</span>
                  <span className="font-medium">${financialStatus.amount} on {financialStatus.nextPayment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Scholarship:</span>
                  <span className="text-blue-500 font-medium">{financialStatus.scholarshipStatus}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-6">
            <p className="text-gray-500">Content for {activeMenu} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="Student" userName="John Doe" />
      
      {/* Enhanced Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
              <p className="text-sm text-gray-500">Spring 2024</p>
            </div>
          </div>
          <div className="h-0.5 bg-gray-100 w-full mb-6"></div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(item.id);
                }}
                className={`flex items-center p-3 rounded-xl transition-all duration-200
                  ${activeMenu === item.id 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${activeMenu === item.id ? 'text-white' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="ml-64 pt-16 p-8">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John! 👋</h1>
            <p className="text-blue-100">Your learning journey continues. You have 3 classes today.</p>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;