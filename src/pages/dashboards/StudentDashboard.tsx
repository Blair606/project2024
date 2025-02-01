import { useState } from 'react';
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';

const StudentDashboard = () => {
  const [currentCourses] = useState([
    { id: 1, name: 'Advanced Mathematics', progress: 75, nextClass: '2:30 PM Today' },
    { id: 2, name: 'Computer Science', progress: 60, nextClass: '10:00 AM Tomorrow' },
    // Add more courses as needed
  ]);

  const [upcomingTasks] = useState([
    { id: 1, title: 'Math Assignment', due: '2024-03-20', course: 'Advanced Mathematics' },
    { id: 2, title: 'Programming Project', due: '2024-03-22', course: 'Computer Science' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="Student" userName="John Doe" />
      
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
          <nav className="mt-8">
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <BookOpenIcon className="w-5 h-5 mr-3" />
              Courses
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <CalendarIcon className="w-5 h-5 mr-3" />
              Schedule
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3" />
              Discussions
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="col-span-full bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Student!</h1>
            <p className="text-gray-600 mt-2">Here's what's happening in your courses</p>
          </div>

          {/* Current Courses */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
            <div className="space-y-4">
              {currentCourses.map(course => (
                <div key={course.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{course.name}</h3>
                    <span className="text-sm text-gray-500">Next: {course.nextClass}</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              {upcomingTasks.map(task => (
                <div key={task.id} className="border p-4 rounded-lg">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">Due: {task.due}</p>
                  <p className="text-sm text-gray-500">{task.course}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;