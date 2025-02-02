import { useState } from 'react';
import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [studentInfo] = useState({
    name: 'Alex Smith',
    grade: '11th Grade',
    attendance: 95,
    overallGrade: 'A-',
  });

  const [academicProgress] = useState([
    { id: 1, subject: 'Advanced Mathematics', grade: 'A', attendance: '95%', teacher: 'Dr. Johnson' },
    { id: 2, subject: 'Computer Science', grade: 'B+', attendance: '92%', teacher: 'Prof. Williams' },
    { id: 3, subject: 'Physics', grade: 'A-', attendance: '98%', teacher: 'Dr. Brown' },
  ]);

  const [financialOverview] = useState([
    { id: 1, type: 'Tuition Fee', amount: 5000, status: 'Paid', dueDate: 'Paid on Mar 15' },
    { id: 2, type: 'Library Fee', amount: 200, status: 'Pending', dueDate: 'Due Apr 1' },
    { id: 3, type: 'Lab Fee', amount: 300, status: 'Pending', dueDate: 'Due Apr 15' },
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: 'Parent-Teacher Meeting', date: 'Mar 25, 2024', time: '3:00 PM' },
    { id: 2, title: 'Science Fair', date: 'Apr 5, 2024', time: '10:00 AM' },
    { id: 3, title: 'Sports Day', date: 'Apr 12, 2024', time: '9:00 AM' },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Academic Progress */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-500" />
                Academic Progress
              </h2>
              <div className="space-y-4">
                {academicProgress.map(subject => (
                  <div key={subject.id} 
                       className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-100 border-2 border-transparent 
                                transition-all duration-200 cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-lg">{subject.subject}</h3>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        Grade: {subject.grade}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Teacher: {subject.teacher}</span>
                      <span>Attendance: {subject.attendance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Overview & Events */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-500" />
                  Financial Overview
                </h2>
                <div className="space-y-4">
                  {financialOverview.map(item => (
                    <div key={item.id} 
                         className="p-4 rounded-xl bg-gray-50 hover:bg-green-50/50 hover:border-green-100 border-2 border-transparent 
                                  transition-all duration-200 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.type}</h3>
                          <p className="text-sm text-gray-500">{item.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${item.amount}</p>
                          <span className={`text-sm ${
                            item.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-purple-500" />
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} 
                         className="p-4 rounded-xl bg-gray-50 hover:bg-purple-50/50 hover:border-purple-100 border-2 border-transparent 
                                  transition-all duration-200 cursor-pointer">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-500" />
                Financial Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {financialOverview.map(item => (
                  <div key={item.id} 
                       className="p-4 rounded-xl bg-gray-50 hover:bg-green-50/50 hover:border-green-100 border-2 border-transparent 
                                transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.type}</h3>
                        <p className="text-sm text-gray-500">{item.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.amount}</p>
                        <span className={`text-sm ${
                          item.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6">Payment History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {financialOverview.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 15, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'Paid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-purple-500" />
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <div key={event.id} 
                       className="p-4 rounded-xl bg-gray-50 hover:bg-purple-50/50 hover:border-purple-100 border-2 border-transparent 
                                transition-all duration-200">
                    <h3 className="font-medium text-lg mb-2">{event.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-blue-500" />
                Messages from Teachers
              </h2>
              <div className="space-y-4">
                {academicProgress.map(subject => (
                  <div key={subject.id} 
                       className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-100 border-2 border-transparent 
                                transition-all duration-200">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium">{subject.subject}</h3>
                        <p className="text-sm text-gray-500">Teacher: {subject.teacher}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-xl font-semibold mb-6">School Announcements</h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} 
                       className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 hover:border-blue-100 border-2 border-transparent 
                                transition-all duration-200">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="Parent" userName="Mr. Smith" />
      
      {/* Enhanced Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Parent Portal</h2>
              <p className="text-sm text-gray-500">Spring 2024</p>
            </div>
          </div>
          <div className="h-0.5 bg-gray-100 w-full mb-6"></div>
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: AcademicCapIcon, label: 'Academic Progress' },
              { id: 'financial', icon: CurrencyDollarIcon, label: 'Financial Overview' },
              { id: 'schedule', icon: CalendarIcon, label: 'Schedule' },
              { id: 'communication', icon: ChatBubbleLeftRightIcon, label: 'Communication' },
            ].map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`flex items-center p-3 rounded-xl transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-white' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="ml-64 pt-16 p-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Mr. Smith! 👋</h1>
            <p className="text-blue-100">Here's an overview of {studentInfo.name}'s academic progress.</p>
          </div>
        </div>

        {/* Student Overview Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <AcademicCapIcon className="w-12 h-12 text-blue-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Student Name</h3>
                <p className="text-lg font-semibold text-gray-800">{studentInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="w-12 h-12 text-green-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Grade Level</h3>
                <p className="text-lg font-semibold text-gray-800">{studentInfo.grade}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-12 h-12 text-purple-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Attendance</h3>
                <p className="text-lg font-semibold text-gray-800">{studentInfo.attendance}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="w-12 h-12 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Overall Grade</h3>
                <p className="text-lg font-semibold text-gray-800">{studentInfo.overallGrade}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Render content based on active tab */}
        {renderContent()}
      </div>
    </div>
  );
};

export default ParentDashboard;