import { useState } from 'react';
import {
  UsersIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courses] = useState([
    { id: 1, name: 'Advanced Mathematics', students: 30, nextClass: '2:30 PM Today', progress: 75 },
    { id: 2, name: 'Computer Science', students: 25, nextClass: '10:00 AM Tomorrow', progress: 60 },
    { id: 3, name: 'Physics 101', students: 28, nextClass: '1:15 PM Tomorrow', progress: 80 },
  ]);

  const [discussionGroups] = useState([
    {
      id: 1,
      name: 'Math Problem Solving',
      course: 'Advanced Mathematics',
      members: 15,
      lastActive: '2 hours ago',
      topics: 8,
    },
    {
      id: 2,
      name: 'Programming Projects',
      course: 'Computer Science',
      members: 12,
      lastActive: '30 minutes ago',
      topics: 5,
    },
    {
      id: 3,
      name: 'Physics Lab Group',
      course: 'Physics 101',
      members: 10,
      lastActive: '1 day ago',
      topics: 3,
    },
  ]);

  const [assignments] = useState([
    {
      id: 1,
      title: 'Calculus Quiz',
      course: 'Advanced Mathematics',
      dueDate: '2024-03-25',
      type: 'Quiz',
      status: 'Active',
      submissions: 18,
      totalStudents: 30,
    },
    {
      id: 2,
      title: 'Programming Project',
      course: 'Computer Science',
      dueDate: '2024-04-01',
      type: 'Project',
      status: 'Draft',
      submissions: 0,
      totalStudents: 25,
    },
    {
      id: 3,
      title: 'Physics Lab Report',
      course: 'Physics 101',
      dueDate: '2024-03-28',
      type: 'Lab Report',
      status: 'Active',
      submissions: 20,
      totalStudents: 28,
    },
  ]);

  const [upcomingTasks] = useState([
    { id: 1, type: 'Grade', task: 'Math Assignments', deadline: 'Today', count: 15 },
    { id: 2, type: 'Review', task: 'Project Submissions', deadline: 'Tomorrow', count: 8 },
    { id: 3, type: 'Prepare', task: 'Lecture Materials', deadline: 'In 2 days', count: 1 },
  ]);

  const [studentStats] = useState({
    totalStudents: 83,
    averageAttendance: 92,
    averageGrade: 'B+',
    activeDiscussions: 5,
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'discussions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Discussion Groups</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <PlusIcon className="w-5 h-5 mr-2" />
                New Group
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discussionGroups.map((group) => (
                <div key={group.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {group.course}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Members:</span>
                      <span className="font-medium">{group.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Topics:</span>
                      <span className="font-medium">{group.topics}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Active:</span>
                      <span className="font-medium">{group.lastActive}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                      View Discussions
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                      Manage Members
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Assignments</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Assignment
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assignment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submissions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{assignment.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {assignment.course}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {assignment.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {assignment.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            assignment.status === 'Active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {assignment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {assignment.submissions} / {assignment.totalStudents}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <UsersIcon className="w-12 h-12 text-blue-500" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                    <p className="text-2xl font-semibold text-gray-800">{studentStats.totalStudents}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <CalendarIcon className="w-12 h-12 text-green-500" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Avg. Attendance</h3>
                    <p className="text-2xl font-semibold text-gray-800">{studentStats.averageAttendance}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <AcademicCapIcon className="w-12 h-12 text-purple-500" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Avg. Grade</h3>
                    <p className="text-2xl font-semibold text-gray-800">{studentStats.averageGrade}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-yellow-500" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Active Discussions</h3>
                    <p className="text-2xl font-semibold text-gray-800">{studentStats.activeDiscussions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Overview */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
                <div className="space-y-4">
                  {courses.map(course => (
                    <div key={course.id} className="border p-4 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">{course.name}</h3>
                        <span className="text-sm text-gray-500">{course.students} Students</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Next Class: {course.nextClass}</span>
                        <span>Progress: {course.progress}%</span>
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
                <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
                <div className="space-y-4">
                  {upcomingTasks.map(task => (
                    <div key={task.id} className="border p-4 rounded-lg hover:border-blue-500 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-medium text-blue-600">{task.type}</span>
                          <h3 className="font-medium mt-1">{task.task}</h3>
                          <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {task.count} items
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole="Teacher" userName="Prof. Smith" />
      
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Teacher Portal</h2>
          <nav className="mt-8 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg ${
                activeTab === 'overview' ? 'bg-blue-50' : ''
              }`}
            >
              <BookOpenIcon className="w-5 h-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`w-full flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg ${
                activeTab === 'discussions' ? 'bg-blue-50' : ''
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3" />
              Discussions
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`w-full flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg ${
                activeTab === 'assignments' ? 'bg-blue-50' : ''
              }`}
            >
              <DocumentCheckIcon className="w-5 h-5 mr-3" />
              Assignments
            </button>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <UsersIcon className="w-5 h-5 mr-3" />
              Students
            </a>
            <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <ChartBarIcon className="w-5 h-5 mr-3" />
              Analytics
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-16 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;