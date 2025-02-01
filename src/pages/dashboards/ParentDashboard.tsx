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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="Parent" userName="Mr. Smith" />
      
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Parent Portal</h2>
          <nav className="mt-8 space-y-2">
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <AcademicCapIcon className="w-5 h-5 mr-3" />
              Academic Progress
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <CurrencyDollarIcon className="w-5 h-5 mr-3" />
              Financial Overview
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <CalendarIcon className="w-5 h-5 mr-3" />
              Schedule
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3" />
              Communication
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 p-8">
        {/* Student Overview Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Academic Progress */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Academic Progress</h2>
            <div className="space-y-4">
              {academicProgress.map(subject => (
                <div key={subject.id} className="border p-4 rounded-lg hover:border-blue-500 transition-colors">
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
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
              <div className="space-y-4">
                {financialOverview.map(item => (
                  <div key={item.id} className="border p-4 rounded-lg">
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

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border p-4 rounded-lg">
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
      </div>
    </div>
  );
};

export default ParentDashboard;