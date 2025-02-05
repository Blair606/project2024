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
  UserCircleIcon,
  BookmarkIcon,
  DocumentIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('courses');

  const [currentUnits] = useState([
    {
      id: 1,
      code: 'CS 301',
      name: 'Machine Learning',
      instructor: 'Dr. Sarah Chen',
      progress: 65,
      nextClass: '2:30 PM Today',
      resources: [
        { id: 1, title: 'Introduction to ML Algorithms', type: 'pdf', downloadUrl: '#' },
        { id: 2, title: 'Python ML Libraries', type: 'doc', downloadUrl: '#' },
      ],
      assignments: [
        { id: 1, title: 'ML Model Implementation', dueDate: '2024-03-20', status: 'pending' },
        { id: 2, title: 'Dataset Analysis', dueDate: '2024-03-22', status: 'completed' },
      ]
    },
    {
      id: 2,
      code: 'CS 302',
      name: 'Network Security',
      instructor: 'Prof. James Wilson',
      progress: 70,
      nextClass: '10:00 AM Tomorrow',
      resources: [
        { id: 1, title: 'Cryptography Basics', type: 'pdf', downloadUrl: '#' },
        { id: 2, title: 'Security Protocols', type: 'pdf', downloadUrl: '#' },
      ],
      assignments: [
        { id: 1, title: 'Security Audit Report', dueDate: '2024-03-22', status: 'pending' },
        { id: 2, title: 'Encryption Implementation', dueDate: '2024-03-25', status: 'pending' },
      ]
    },
    {
      id: 3,
      code: 'CS 303',
      name: 'Neural Networks',
      instructor: 'Dr. Michael Chang',
      progress: 60,
      nextClass: '11:30 AM Today',
      resources: [
        { id: 1, title: 'Neural Network Architectures', type: 'pdf', downloadUrl: '#' },
        { id: 2, title: 'Deep Learning Frameworks', type: 'doc', downloadUrl: '#' },
      ],
      assignments: [
        { id: 1, title: 'CNN Implementation', dueDate: '2024-03-24', status: 'pending' },
      ]
    },
    {
      id: 4,
      code: 'CS 304',
      name: 'Strategic Information Systems',
      instructor: 'Dr. Emily Brooks',
      progress: 75,
      nextClass: '2:00 PM Tomorrow',
      resources: [
        { id: 1, title: 'IS Strategy Framework', type: 'pdf', downloadUrl: '#' },
        { id: 2, title: 'Case Studies', type: 'pdf', downloadUrl: '#' },
      ],
      assignments: [
        { id: 1, title: 'Business Strategy Analysis', dueDate: '2024-03-23', status: 'pending' },
      ]
    },
    {
      id: 5,
      code: 'CS 305',
      name: 'Mobile Computing',
      instructor: 'Prof. Lisa Martinez',
      progress: 68,
      nextClass: '9:00 AM Tomorrow',
      resources: [
        { id: 1, title: 'Mobile App Development', type: 'pdf', downloadUrl: '#' },
        { id: 2, title: 'UI/UX Guidelines', type: 'pdf', downloadUrl: '#' },
      ],
      assignments: [
        { id: 1, title: 'Mobile App Project', dueDate: '2024-03-26', status: 'pending' },
      ]
    },
    {
      id: 6,
      code: 'CS 306',
      name: 'Multimedia Systems',
      instructor: 'Dr. Robert Kim',
      progress: 72,
      nextClass: '4:00 PM Today',
      resources: [
        { id: 1, title: 'Multimedia Processing', type: 'pdf', downloadUrl: '#' },
        { id: 2, title: 'Compression Techniques', type: 'doc', downloadUrl: '#' },
      ],
      assignments: [
        { id: 1, title: 'Media Processing Project', dueDate: '2024-03-25', status: 'pending' },
      ]
    }
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

  // Update profile data
  const [profileData] = useState({
    name: 'Bildard Blair Odhiambo',
    studentId: '2021/CS/31442',
    course: 'Bachelor of Science in Computer Science',
    year: '3rd Year, 2nd Semester',
    email: 'bildard.blair@university.edu',
    achievements: [
      { id: 1, title: 'Dean\'s List 2023', icon: '🏆' },
      { id: 2, title: 'Best Programming Project', icon: '��' },
      { id: 3, title: 'Research Excellence', icon: '🔬' },
    ]
  });

  // Update weekly schedule
  const [weeklySchedule] = useState([
    {
      day: 'Monday',
      classes: [
        { id: 1, unit: 'Machine Learning', code: 'CS 301', time: '09:00 - 11:00', room: 'Lab 101', instructor: 'Dr. Sarah Chen' },
        { id: 2, unit: 'Neural Networks', code: 'CS 303', time: '14:00 - 16:00', room: 'Lab 203', instructor: 'Dr. Michael Chang' },
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { id: 3, unit: 'Network Security', code: 'CS 302', time: '11:00 - 13:00', room: 'Room 105', instructor: 'Prof. James Wilson' },
        { id: 4, unit: 'Mobile Computing', code: 'CS 305', time: '14:00 - 16:00', room: 'Lab 102', instructor: 'Prof. Lisa Martinez' },
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { id: 5, unit: 'Strategic Information Systems', code: 'CS 304', time: '09:00 - 11:00', room: 'Room 201', instructor: 'Dr. Emily Brooks' },
        { id: 6, unit: 'Multimedia Systems', code: 'CS 306', time: '14:00 - 16:00', room: 'Lab 204', instructor: 'Dr. Robert Kim' },
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { id: 7, unit: 'Machine Learning', code: 'CS 301', time: '11:00 - 13:00', room: 'Lab 101', instructor: 'Dr. Sarah Chen' },
        { id: 8, unit: 'Network Security', code: 'CS 302', time: '14:00 - 16:00', room: 'Room 105', instructor: 'Prof. James Wilson' },
      ]
    },
    {
      day: 'Friday',
      classes: [
        { id: 9, unit: 'Neural Networks', code: 'CS 303', time: '09:00 - 11:00', room: 'Lab 203', instructor: 'Dr. Michael Chang' },
        { id: 10, unit: 'Mobile Computing', code: 'CS 305', time: '14:00 - 16:00', room: 'Lab 102', instructor: 'Prof. Lisa Martinez' },
      ]
    }
  ]);

  // Update quick stats
  const quickStats = [
    { id: 1, label: 'Overall GPA', value: '3.8', icon: AcademicCapIcon, color: 'text-green-500' },
    { id: 2, label: 'Units This Semester', value: '6', icon: BookOpenIcon, color: 'text-blue-500' },
    { id: 3, label: 'Attendance Rate', value: '92%', icon: CheckCircleIcon, color: 'text-indigo-500' },
  ];

  const menuItems = [
    { id: 'courses', icon: BookOpenIcon, label: 'Courses' },
    { id: 'schedule', icon: CalendarIcon, label: 'Schedule' },
    { id: 'profile', icon: UserCircleIcon, label: 'Profile' },
    { id: 'discussions', icon: ChatBubbleLeftRightIcon, label: 'Discussions' },
    { id: 'notifications', icon: BellIcon, label: 'Notifications' },
    { id: 'academic', icon: ChartBarIcon, label: 'Academic Progress' },
    { id: 'financial', icon: BanknotesIcon, label: 'Financial Status' },
    { id: 'resources', icon: BookmarkIcon, label: 'Resources' },
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Units with Enhanced Details */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                  <BookOpenIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Current Units
                </h2>
                <div className="space-y-6">
                  {currentUnits.map(course => (
                    <div key={course.id} className="border rounded-xl p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{course.name}</h3>
                          <p className="text-gray-600">Instructor: {course.instructor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                            {course.nextClass}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-blue-600">{course.progress}% Complete</span>
                      </div>

                      {/* Resources and Assignments Tabs */}
                      <div className="mt-4 border-t pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Recent Resources</h4>
                            <div className="space-y-2">
                              {course.resources.slice(0, 2).map(resource => (
                                <a
                                  key={resource.id}
                                  href={resource.downloadUrl}
                                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg group"
                                >
                                  <DocumentIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 mr-2" />
                                  <span className="text-sm text-gray-600 group-hover:text-blue-600">
                                    {resource.title}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Upcoming Tasks</h4>
                            <div className="space-y-2">
                              {course.assignments.map(assignment => (
                                <div
                                  key={assignment.id}
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                                >
                                  <span className="text-sm text-gray-600">{assignment.title}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    assignment.status === 'pending' 
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {assignment.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Access and Stats */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 text-left flex items-center space-x-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition-colors">
                      <DocumentPlusIcon className="w-5 h-5" />
                      <span>Submit Assignment</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left flex items-center space-x-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition-colors">
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      <span>Contact Instructor</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left flex items-center space-x-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition-colors">
                      <BookmarkIcon className="w-5 h-5" />
                      <span>View All Resources</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            {/* Weekly Timetable */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                Weekly Timetable
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      {weeklySchedule.map(day => (
                        <th key={day.day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {day.day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Time slots from 9 AM to 5 PM */}
                    {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                      <tr key={hour} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {`${hour}:00 - ${hour + 1}:00`}
                        </td>
                        {weeklySchedule.map(day => {
                          const classAtThisTime = day.classes.find(c => {
                            const [startHour] = c.time.split(' - ')[0].split(':').map(Number);
                            return startHour === hour;
                          });

                          return (
                            <td key={day.day} className="px-6 py-4 whitespace-nowrap">
                              {classAtThisTime && (
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                  <p className="font-medium text-blue-700">{classAtThisTime.unit}</p>
                                  <p className="text-sm text-gray-600">{classAtThisTime.code}</p>
                                  <p className="text-sm text-blue-600">{classAtThisTime.time}</p>
                                  <p className="text-xs text-gray-500">
                                    {classAtThisTime.room} • {classAtThisTime.instructor}
                                  </p>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
              <div className="space-y-4">
                {weeklySchedule[0].classes.map(class_ => (
                  <div key={class_.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{class_.unit}</p>
                      <p className="text-sm text-gray-600">{class_.time} • {class_.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{class_.instructor}</p>
                      <p className="text-sm font-medium text-blue-600">{class_.code}</p>
                    </div>
                  </div>
                ))}
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

      case 'resources':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                <BookmarkIcon className="w-5 h-5 mr-2 text-blue-500" />
                Course Resources
              </h2>
              {currentUnits.map(course => (
                <div key={course.id} className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">{course.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.resources.map(resource => (
                      <a
                        key={resource.id}
                        href={resource.downloadUrl}
                        className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 flex items-center space-x-3"
                      >
                        <DocumentIcon className="w-6 h-6 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">{resource.title}</p>
                          <p className="text-sm text-gray-500">Type: {resource.type}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Resource Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Resource Type</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>PDF Documents</option>
                    <option>Video Lectures</option>
                    <option>Practice Materials</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Course</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Courses</option>
                    {currentUnits.map(course => (
                      <option key={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircleIcon className="w-16 h-16 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.studentId}</p>
                  <p className="text-blue-600">{profileData.course} • {profileData.year}</p>
                </div>
                <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Email: {profileData.email}</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.achievements.map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <span className="font-medium text-blue-900">{achievement.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Academic Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current GPA</span>
                    <span className="font-bold text-blue-600">{academicResults.gpa}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Credits Completed</span>
                    <span className="font-bold text-green-600">{academicResults.totalCredits}</span>
                  </div>
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
      <DashboardHeader userRole="Student" userName={profileData.name} />
      
      {/* Enhanced Sidebar */}
      <div className="fixed w-64 h-full bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
              <p className="text-sm text-gray-500">{profileData.year}</p>
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
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {profileData.name.split(' ')[0]}! ��</h1>
            <p className="text-blue-100">Your learning journey continues. Keep up the excellent work in {profileData.course}!</p>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;