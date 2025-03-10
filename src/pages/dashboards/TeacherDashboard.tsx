import { useState, useEffect } from 'react';
import {
  UsersIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  PlusIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  VideoCameraIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import CreateAssignmentModal from '../../components/modals/CreateAssignmentModal';
import CreateDiscussionGroupModal from '../../components/modals/CreateDiscussionGroupModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface ClassData {
  id: number;
  year: number;
  className: string;
  totalStudents: number;
  averagePerformance: number;
  students: StudentAnalytics[];
}

interface DiscussionGroupData {
  title: string;
  course: string;
  numberOfGroups: number;
}

interface StudentAnalytics {
  id: string;
  name: string;
  grades: {
    unit: string;
    grade: number;
    attendance: number;
    submissions: number;
  }[];
}

interface Notification {
  id: number;
  title: string;
  message: string;
  classId: number;
  timestamp: string;
  emailNotification: boolean;
}

interface NotificationFormData {
  title: string;
  message: string;
  classId: number;
  emailNotification: boolean;
}

interface ScheduledClass {
  id: number;
  title: string;
  course: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed';
  meetingLink?: string;
  recording?: string;
}

interface Assignment {
  id: number;
  title: string;
  courseId: number;
  dueDate: string;
  type: string;
}

interface ProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  enableMFA: boolean;
  staffId: string;
  department: string;
  phone: string;
  nationalId: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseUnit {
  id: number;
  name: string;
  content: string;
  resources: string[];
  lastUpdated: string;
}

interface Course {
  id: number;
  name: string;
  students: number;
  nextClass: string;
  progress: number;
  units: CourseUnit[];
}

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: 'Advanced Mathematics',
      students: 30,
      nextClass: '2:30 PM Today',
      progress: 75,
      units: [
        {
          id: 1,
          name: 'Calculus I',
          content: 'Introduction to limits and derivatives',
          resources: ['Textbook Chapter 1', 'Practice Problems PDF'],
          lastUpdated: new Date().toISOString(),
        },
      ],
    },
    {
      id: 2,
      name: 'Computer Science',
      students: 25,
      nextClass: '10:00 AM Tomorrow',
      progress: 60,
      units: [],
    },
    {
      id: 3,
      name: 'Physics 101',
      students: 28,
      nextClass: '1:15 PM Tomorrow',
      progress: 80,
      units: [],
    },
  ]);

  const [discussionGroups, setDiscussionGroups] = useState([
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

  const [assignments, setAssignments] = useState([
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

  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);

  const [selectedClassOverview, setSelectedClassOverview] = useState<ClassData | null>(null);
  const [showIndividualStudent, setShowIndividualStudent] = useState(false);

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const GRADE_COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      course: 'Advanced Mathematics',
      date: '2024-03-20',
      time: '10:00 AM - 11:30 AM',
      status: 'upcoming',
    },
  ]);

  const [isScheduleClassModalOpen, setIsScheduleClassModalOpen] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<CourseUnit | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navItems = [
    { id: 'overview', icon: BookOpenIcon, label: 'Overview' },
    { id: 'discussions', icon: ChatBubbleLeftRightIcon, label: 'Discussions' },
    { id: 'assignments', icon: DocumentCheckIcon, label: 'Assignments' },
    { id: 'online-classes', icon: VideoCameraIcon, label: 'Online Classes' },
    { id: 'students', icon: UsersIcon, label: 'Students' },
    { id: 'analytics', icon: ChartBarIcon, label: 'Analytics' },
    { id: 'profile', icon: UserCircleIcon, label: 'Profile' },
    { id: 'divider', type: 'divider' },
    { 
      id: 'logout', 
      icon: ArrowLeftOnRectangleIcon, 
      label: 'Logout',
      onClick: handleLogout 
    }
  ];

  const handleCreateAssignment = (assignmentData: Assignment) => {
    const newAssignment = {
      ...assignmentData,
      id: assignments.length + 1,
      status: 'Active',
      submissions: 0,
      course: courses.find(c => c.id === assignmentData.courseId)?.name || '',
      totalStudents: courses.find(c => c.id === assignmentData.courseId)?.students || 0,
    };

    setAssignments([...assignments, newAssignment]);
  };

  const handleCreateDiscussionGroup = (groupData: DiscussionGroupData) => {
    const selectedCourse = courses.find(c => c.id.toString() === groupData.course);
    const studentsPerGroup = Math.ceil(
      (selectedCourse?.students || 0) / groupData.numberOfGroups
    );

    const newGroups = Array.from({ length: groupData.numberOfGroups }, (_, index) => ({
      id: discussionGroups.length + index + 1,
      name: `${groupData.title} - Group ${index + 1}`,
      course: selectedCourse?.name || '',
      members: studentsPerGroup,
      lastActive: 'Just created',
      topics: 0,
    }));

    setDiscussionGroups([...discussionGroups, ...newGroups]);
  };

  const [classes] = useState<ClassData[]>([
    {
      id: 1,
      year: 1,
      className: "Year 1 - Advanced Mathematics",
      totalStudents: 30,
      averagePerformance: 75,
      students: [
        {
          id: "1",
          name: "John Doe",
          grades: [
            { unit: "Calculus", grade: 85, attendance: 90, submissions: 8 },
            { unit: "Algebra", grade: 78, attendance: 85, submissions: 7 }
          ]
        },
      ]
    },
    {
      id: 2,
      year: 2,
      className: "Year 2 - Computer Science",
      totalStudents: 25,
      averagePerformance: 82,
      students: [
        {
          id: "2",
          name: "Jane Smith",
          grades: [
            { unit: "Programming", grade: 92, attendance: 95, submissions: 9 },
            { unit: "Algorithms", grade: 88, attendance: 92, submissions: 8 }
          ]
        },
      ]
    },
  ]);

  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const selectedClass = classes.find(c => c.id === selectedClassId);
  const selectedStudent = selectedClass?.students.find(s => s.id === selectedStudentId);

  const handleSendNotification = async (data: NotificationFormData) => {
    const newNotification: Notification = {
      id: notifications.length + 1,
      ...data,
      timestamp: new Date().toISOString(),
    };

    setNotifications([newNotification, ...notifications]);

    if (data.emailNotification) {
      const selectedClass = classes.find(c => c.id === data.classId);
      console.log(`Sending email to ${selectedClass?.className} students:`, data.message);
    }

    setIsNotificationModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discussions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Discussion Groups</h2>
              <button
                onClick={() => setIsDiscussionModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
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
              <button
                onClick={() => setIsAssignmentModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
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

      case 'online-classes':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Online Classes</h2>
              <button
                onClick={() => setIsScheduleClassModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Schedule Class
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scheduledClasses.map((class_) => (
                <div key={class_.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{class_.title}</h3>
                      <p className="text-gray-600">{class_.course}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      class_.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800'
                        : class_.status === 'live'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {class_.status.charAt(0).toUpperCase() + class_.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{class_.date}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{class_.time}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    {class_.status === 'upcoming' ? (
                      <>
                        <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Start Class
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100">
                          Cancel
                        </button>
                      </>
                    ) : class_.status === 'live' ? (
                      <button className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                        Join Class
                      </button>
                    ) : (
                      <button className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                        View Recording
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex space-x-4 mb-6">
                <select
                  className="form-select rounded-md border-gray-300"
                  value={selectedClassId || ''}
                  onChange={(e) => {
                    setSelectedClassId(Number(e.target.value));
                    setSelectedStudentId(null);
                  }}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.className}
                    </option>
                  ))}
                </select>

                {selectedClassId && (
                  <select
                    className="form-select rounded-md border-gray-300"
                    value={selectedStudentId || ''}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                  >
                    <option value="">All Students</option>
                    {selectedClass?.students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {selectedClassId && !selectedStudentId && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4">Class Performance</h3>
                      <BarChart
                        width={500}
                        height={300}
                        data={selectedClass?.students.map(student => ({
                          name: student.name,
                          average: student.grades.reduce((acc, curr) => acc + curr.grade, 0) / student.grades.length,
                          attendance: student.grades.reduce((acc, curr) => acc + curr.attendance, 0) / student.grades.length
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" name="Average Grade" fill="#8884d8" />
                        <Bar dataKey="attendance" name="Attendance %" fill="#82ca9d" />
                      </BarChart>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <h3 className="text-lg font-semibold mb-4">Unit Performance Distribution</h3>
                      <PieChart width={400} height={300}>
                        <Pie
                          data={[
                            { name: 'A (90-100)', value: selectedClass?.students.filter(s => 
                              s.grades.some(g => g.grade >= 90)).length || 0 },
                            { name: 'B (80-89)', value: selectedClass?.students.filter(s => 
                              s.grades.some(g => g.grade >= 80 && g.grade < 90)).length || 0 },
                            { name: 'C (70-79)', value: selectedClass?.students.filter(s => 
                              s.grades.some(g => g.grade >= 70 && g.grade < 80)).length || 0 },
                            { name: 'D (60-69)', value: selectedClass?.students.filter(s => 
                              s.grades.some(g => g.grade >= 60 && g.grade < 70)).length || 0 },
                            { name: 'F (<60)', value: selectedClass?.students.filter(s => 
                              s.grades.some(g => g.grade < 60)).length || 0 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx={200}
                          cy={150}
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                        >
                          {GRADE_COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                  </div>
                </>
              )}

              {selectedStudentId && (
                <>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      Student Analysis: {selectedStudent?.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="text-lg font-semibold mb-4">Performance by Unit</h4>
                        <BarChart
                          width={500}
                          height={300}
                          data={selectedStudent?.grades}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="unit" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="grade" name="Grade" fill="#8884d8" />
                          <Bar dataKey="attendance" name="Attendance" fill="#82ca9d" />
                        </BarChart>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="text-lg font-semibold mb-4">Submission Analysis</h4>
                        <LineChart
                          width={500}
                          height={300}
                          data={selectedStudent?.grades}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="unit" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="submissions" name="Submissions" stroke="#8884d8" />
                        </LineChart>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          label: 'Average Grade',
                          value: `${(selectedStudent?.grades.reduce((acc, curr) => acc + curr.grade, 0) || 0 / 
                            (selectedStudent?.grades.length || 1)).toFixed(1)}%`
                        },
                        {
                          label: 'Average Attendance',
                          value: `${(selectedStudent?.grades.reduce((acc, curr) => acc + curr.attendance, 0) || 0 / 
                            (selectedStudent?.grades.length || 1)).toFixed(1)}%`
                        },
                        {
                          label: 'Total Submissions',
                          value: selectedStudent?.grades.reduce((acc, curr) => acc + curr.submissions, 0) || 0
                        }
                      ].map((metric, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                          <h4 className="text-sm text-gray-500">{metric.label}</h4>
                          <div className="text-2xl font-bold mt-2">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircleIcon className="w-16 h-16 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Loading...'}
                  </h2>
                  <p className="text-gray-600">{profileData?.staffId || 'Loading...'}</p>
                  <p className="text-blue-600">{profileData?.department || 'Loading...'}</p>
                </div>
                <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Edit Profile
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Professional Information</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <p><span className="font-medium">Staff ID:</span> {profileData?.staffId}</p>
                    <p><span className="font-medium">Department:</span> {profileData?.department}</p>
                    <p><span className="font-medium">Role:</span> {profileData?.role}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <p><span className="font-medium">Email:</span> {profileData?.email}</p>
                    <p><span className="font-medium">Phone:</span> {profileData?.phone}</p>
                    <p><span className="font-medium">National ID:</span> {profileData?.nationalId}</p>
                    <p><span className="font-medium">Address:</span> {profileData?.address}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Date of Birth:</span> {new Date(profileData?.dateOfBirth || '').toLocaleDateString()}</p>
                    <p><span className="font-medium">Emergency Contact:</span> {profileData?.emergencyContact}</p>
                    <p><span className="font-medium">MFA Status:</span> {profileData?.enableMFA ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="font-bold text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium text-gray-800">
                      {new Date(profileData?.createdAt || '').toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium text-gray-800">
                      {new Date(profileData?.updatedAt || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Courses</h2>
                </div>
                <div className="space-y-6">
                  {courses.map(course => (
                    <div key={course.id} className="border p-6 rounded-xl hover:border-blue-500 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{course.name}</h3>
                          <span className="text-sm text-gray-500">{course.students} Students • Next Class: {course.nextClass}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Progress: {course.progress}%</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-700">Course Units</h4>
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsUnitModalOpen(true);
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Add Unit
                          </button>
                        </div>

                        {course.units.length > 0 ? (
                          <div className="grid gap-4">
                            {course.units.map(unit => (
                              <div
                                key={unit.id}
                                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                onClick={() => {
                                  setSelectedUnit(unit);
                                  setIsContentModalOpen(true);
                                }}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium text-gray-900">{unit.name}</h5>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{unit.content}</p>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    Last updated: {new Date(unit.lastUpdated).toLocaleDateString()}
                                  </span>
                                </div>
                                {unit.resources.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {unit.resources.map((resource, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                      >
                                        {resource}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 text-sm">No units added yet</p>
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setIsUnitModalOpen(true);
                              }}
                              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Add your first unit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {courses.map((classData) => (
                <div 
                  key={classData.id}
                  className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedClassOverview({
                    id: classData.id,
                    year: 1,
                    className: classData.name,
                    totalStudents: classData.students,
                    averagePerformance: classData.progress,
                    students: []
                  })}
                >
                  <h3 className="text-xl font-bold mb-4">{classData.name}</h3>
                  <p>Total Students: {classData.students}</p>
                  <p>Average Performance: {classData.progress}%</p>
                </div>
              ))}
            </div>

            {selectedClassOverview && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{selectedClassOverview.className} Analytics</h2>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowIndividualStudent(!showIndividualStudent)}
                  >
                    {showIndividualStudent ? 'Show Class Overview' : 'Show Individual Students'}
                  </button>
                </div>

                {!showIndividualStudent ? (
                  <BarChart
                    width={1000}
                    height={400}
                    data={[selectedClassOverview]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="className" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averagePerformance" fill="#8884d8" name="Class Average Performance" />
                  </BarChart>
                ) : (
                  <BarChart
                    width={1000}
                    height={400}
                    data={selectedClassOverview.students}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#82ca9d" name="Student Performance" />
                  </BarChart>
                )}
              </div>
            )}
          </div>
        );
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const userId = user?.id;
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await axios.get(`http://localhost:3000/api/users/users/${userId}`);
        console.log('Profile data received:', response.data);
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data. Please try again later.');
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchProfileData();
    }
  }, [user?.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileMenu && !(event.target as Element).closest('.relative')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const renderUnitModal = () => (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${
      isUnitModalOpen ? 'block' : 'hidden'
    }`}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Unit</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Handle unit creation logic here
          setIsUnitModalOpen(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Content</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsUnitModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderContentModal = () => (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 ${
      isContentModalOpen ? 'block' : 'hidden'
    }`}>
      <div className="relative top-20 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Edit Unit Content: {selectedUnit?.name}
        </h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          // Handle content update logic here
          setIsContentModalOpen(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={8}
                defaultValue={selectedUnit?.content}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Resources</label>
              <div className="mt-2 space-y-2">
                {selectedUnit?.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={resource}
                    />
                    <button type="button" className="text-red-600 hover:text-red-800">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PlusIcon className="w-5 h-5 mr-1" />
                  Add Resource
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsContentModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center lg:w-64">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="lg:hidden ml-2">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="flex items-center justify-end flex-1 space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-gray-500">Spring 2024</span>
              <span className="text-gray-300">|</span>
            </div>
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Send Message</span>
            </button>
            <div className="flex items-center border-l pl-4 ml-4">
              <div className="hidden sm:block text-right mr-3">
                <p className="text-sm font-medium text-gray-900">
                  {isLoading ? 'Loading...' : profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Teacher'}
                </p>
                <p className="text-xs text-gray-500">{profileData?.department || 'Department'}</p>
              </div>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="relative w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
              >
                <span className="text-sm font-medium text-blue-600">
                  {profileData?.firstName ? profileData.firstName[0] + profileData.lastName[0] : 'T'}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border top-12">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowProfileMenu(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setShowProfileMenu(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Settings
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute right-4 top-4 p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

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
          <div className="h-0.5 bg-gray-100 w-full mb-6"></div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              if (item.type === 'divider') {
                return <div key="divider" className="h-0.5 bg-gray-100 my-4" />;
              }

              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center p-3 rounded-xl transition-all duration-200
                    ${item.id === 'logout' 
                      ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                      : activeTab === item.id 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  <item.icon 
                    className={`w-5 h-5 mr-3 ${
                      item.id === 'logout'
                        ? 'text-red-600'
                        : activeTab === item.id 
                          ? 'text-white' 
                          : ''
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className={`transition-all duration-300 pt-16 min-h-screen ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
      }`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Welcome back, {isLoading ? 'Teacher' : profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Teacher'}! 👋
                  </h1>
                  <p className="text-blue-100">
                    {profileData?.department ? `${profileData.department} Department` : 'Loading department...'}
                  </p>
                </div>
                <button
                  onClick={() => setIsNotificationModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 w-full sm:w-auto justify-center"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Send Class Message
                </button>
              </div>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </main>

      <CreateAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        courses={courses}
        onSubmit={handleCreateAssignment}
      />

      <CreateDiscussionGroupModal
        isOpen={isDiscussionModalOpen}
        onClose={() => setIsDiscussionModalOpen(false)}
        courses={courses}
        onSubmit={handleCreateDiscussionGroup}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onSubmit={handleSendNotification}
        classes={classes}
      />

      <ScheduleClassModal
        isOpen={isScheduleClassModalOpen}
        onClose={() => setIsScheduleClassModalOpen(false)}
        courses={courses}
        onSubmit={(data) => {
          const newClass: ScheduledClass = {
            id: scheduledClasses.length + 1,
            ...data,
            status: 'upcoming',
          };
          setScheduledClasses([...scheduledClasses, newClass]);
          setIsScheduleClassModalOpen(false);
        }}
      />

      {user?.role === 'admin' && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-lg"
          >
            <Cog6ToothIcon className="w-5 h-5 mr-2" />
            Access Admin Dashboard
          </button>
        </div>
      )}

      {renderUnitModal()}
      {renderContentModal()}
    </div>
  );
};

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  classes 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: NotificationFormData) => void;
  classes: { id: number; className: string }[];
}) => {
  const [formData, setFormData] = useState<NotificationFormData>({
    title: '',
    message: '',
    classId: 0,
    emailNotification: true,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Send Class Notification</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
            setFormData({ title: '', message: '', classId: 0, emailNotification: true });
          }}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Class</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.classId}
                onChange={(e) => setFormData({ ...formData, classId: Number(e.target.value) })}
                required
              >
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>{cls.className}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  checked={formData.emailNotification}
                  onChange={(e) => setFormData({ ...formData, emailNotification: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-600">Send email notification</span>
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ScheduleClassModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  courses 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: Omit<ScheduledClass, 'id' | 'status'>) => void;
  courses: { id: number; name: string; }[];
}) => {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    date: '',
    time: '',
    meetingLink: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Schedule Online Class</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
          setFormData({ title: '', course: '', date: '', time: '', meetingLink: '' });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meeting Link (Optional)</label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="https://meet.google.com/..."
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherDashboard;