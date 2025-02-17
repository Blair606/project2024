import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  UsersIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  UserPlusIcon,
  BuildingLibraryIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';
import CreateCourseModal, { CourseFormData } from '../../components/modals/CreateCourseModal';
import CourseDetailsModal from '../../components/modals/CourseDetailsModal';
import CreateUserModal from '../../components/modals/CreateUserModal';
import CreateDepartmentModal, { DepartmentFormData } from '../../components/modals/CreateDepartmentModal';
import { User, Student, Teacher } from '../../types/user';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from 'react-csv';

// Add Course related interfaces
interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  department: string;
  instructor: string;
  status: 'active' | 'inactive';
  enrollmentCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  schedule: {
    day: string;
    time: string;
    duration: number;
  }[];
  prerequisites: string[];
}

// Add Department interface
interface Department {
  id: string;
  name: string;
  code: string;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  head: string;
  description: string;
  status: 'active' | 'inactive';
  facultyCount: number;
  studentsCount: number;
  coursesCount: number;
  createdAt: string;
  updatedAt: string;
}

// Add Financial interfaces
interface FinancialTransaction {
  id: string;
  studentId: string;
  studentName: string;
  type: 'tuition' | 'library' | 'hostel' | 'other';
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  description: string;
}

// Add new interfaces for finance filtering
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface FinanceFilters {
  dateRange: DateRange;
  transactionType: string;
  paymentStatus: string;
  amountRange: {
    min: string;
    max: string;
  };
  searchTerm: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Add new interfaces for settings
interface SystemSettings {
  general: {
    schoolName: string;
    academicYear: string;
    currentTerm: number;
    timezone: string;
    dateFormat: string;
    language: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    paymentReminders: boolean;
    assignmentNotifications: boolean;
    systemUpdates: boolean;
  };
  security: {
    passwordExpiration: number;
    loginAttempts: number;
    sessionTimeout: number;
    twoFactorAuth: boolean;
  };
  academic: {
    gradingSystem: 'letter' | 'percentage' | 'gpa';
    passingGrade: number;
    attendanceThreshold: number;
    lateSubmissionPolicy: 'strict' | 'flexible' | 'none';
  };
}

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [systemStats] = useState({
    totalStudents: 1250,
    totalTeachers: 75,
    activeCourses: 48,
    departments: 12,
    totalRevenue: 15000000,
    pendingPayments: 2500000,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'teacher',
      status: 'active',
      joinDate: '2024-01-01',
      nationalId: '1234567890',
      phone: '555-1234',
      address: '123 Elm St, Anytown, USA',
      employeeId: 'T001',
      school: 'SPAS',
      department: 'Department of Mathematics',
      specialization: 'Advanced Mathematics',
      qualifications: ['Ph.D. in Mathematics', 'M.Sc. in Applied Mathematics'],
      yearsOfExperience: 8,
      subjects: ['Calculus', 'Linear Algebra', 'Statistics']
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      nationalId: '0987654321',
      phone: '555-5678',
      address: '456 Oak St, Anytown, USA',
      studentId: 'S001',
      studyLevel: 'degree',
      school: 'SPAS',
      program: 'BSc Computer Science',
      specialization: 'Software Engineering',
      yearOfStudy: 2,
      semester: 1,
      dateOfBirth: '2000-05-15',
      guardians: [],
      emergencyContact: '555-3456'
    }
  ]);

  // Add state for courses
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      title: 'Introduction to Computer Science',
      description: 'Fundamental concepts of programming and computer science',
      credits: 3,
      school: 'SPAS',
      department: 'Computer Science',
      instructor: 'John Doe',
      status: 'active',
      enrollmentCapacity: 50,
      currentEnrollment: 35,
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      schedule: [
        { day: 'Monday', time: '09:00', duration: 2 },
        { day: 'Wednesday', time: '09:00', duration: 2 }
      ],
      prerequisites: []
    },
    {
      id: '2',
      code: 'MATH201',
      title: 'Advanced Calculus',
      description: 'Advanced concepts in calculus and mathematical analysis',
      credits: 4,
      school: 'SPAS',
      department: 'Mathematics',
      instructor: 'Jane Smith',
      status: 'active',
      enrollmentCapacity: 40,
      currentEnrollment: 38,
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      schedule: [
        { day: 'Tuesday', time: '11:00', duration: 2 },
        { day: 'Thursday', time: '11:00', duration: 2 }
      ],
      prerequisites: ['MATH101']
    }
  ]);

  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [courseStatusFilter, setCourseStatusFilter] = useState('');
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const coursesPerPage = 10;

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState<CourseFormData | undefined>();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userModalType, setUserModalType] = useState<'student' | 'teacher'>('student');

  // Add departments state
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Department of Computer Science',
      code: 'CS',
      school: 'SPAS',
      head: 'Dr. John Smith',
      description: 'The Department of Computer Science offers comprehensive programs in software development, artificial intelligence, and data science.',
      status: 'active',
      facultyCount: 15,
      studentsCount: 250,
      coursesCount: 20,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Department of Mathematics',
      code: 'MATH',
      school: 'SPAS',
      head: 'Dr. Sarah Johnson',
      description: 'The Mathematics Department provides strong foundations in pure and applied mathematics.',
      status: 'active',
      facultyCount: 12,
      studentsCount: 180,
      coursesCount: 15,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');
  const [departmentSchoolFilter, setDepartmentSchoolFilter] = useState('');
  const [departmentStatusFilter, setDepartmentStatusFilter] = useState('');
  const [currentDepartmentPage, setCurrentDepartmentPage] = useState(1);
  const departmentsPerPage = 10;

  // Add department modal state
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [editDepartmentData, setEditDepartmentData] = useState<DepartmentFormData | undefined>();

  // Add financial state
  const [financialStats] = useState({
    totalRevenue: 15000000,
    pendingPayments: 2500000,
    overduePayments: 1200000,
    monthlyRevenue: 3500000,
    monthlyExpenses: 2800000,
    currentBalance: 8500000,
  });

  const [transactions] = useState<FinancialTransaction[]>([
    {
      id: '1',
      studentId: 'S001',
      studentName: 'John Doe',
      type: 'tuition',
      amount: 45000,
      status: 'paid',
      dueDate: '2024-02-15',
      paidDate: '2024-02-14',
      description: 'Semester 1 Tuition Fee'
    },
    {
      id: '2',
      studentId: 'S002',
      studentName: 'Jane Smith',
      type: 'hostel',
      amount: 25000,
      status: 'pending',
      dueDate: '2024-02-28',
      description: 'Hostel Fee - Block A'
    },
    {
      id: '3',
      studentId: 'S003',
      studentName: 'Mike Johnson',
      type: 'library',
      amount: 5000,
      status: 'overdue',
      dueDate: '2024-02-01',
      description: 'Library Fee'
    }
  ]);

  // Inside AdminDashboard component, add new state
  const [financeFilters, setFinanceFilters] = useState<FinanceFilters>({
    dateRange: {
      startDate: null,
      endDate: null,
    },
    transactionType: '',
    paymentStatus: '',
    amountRange: {
      min: '',
      max: '',
    },
    searchTerm: '',
    sortBy: 'dueDate',
    sortOrder: 'desc',
  });

  // Add settings state
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    general: {
      schoolName: 'International Academy',
      academicYear: '2023-2024',
      currentTerm: 2,
      timezone: 'Africa/Nairobi',
      dateFormat: 'DD/MM/YYYY',
      language: 'en',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      paymentReminders: true,
      assignmentNotifications: true,
      systemUpdates: true,
    },
    security: {
      passwordExpiration: 90,
      loginAttempts: 3,
      sessionTimeout: 30,
      twoFactorAuth: false,
    },
    academic: {
      gradingSystem: 'percentage',
      passingGrade: 50,
      attendanceThreshold: 75,
      lateSubmissionPolicy: 'flexible',
    },
  });

  // Format currency in KSh
  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString('en-KE')}`;
  };

  // Add department handlers
  const handleCreateDepartment = (departmentData: DepartmentFormData) => {
    const newDepartment = {
      ...departmentData,
      id: String(departments.length + 1),
      facultyCount: 0,
      studentsCount: 0,
      coursesCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDepartments([...departments, newDepartment]);
  };

  const handleEditDepartment = (departmentData: DepartmentFormData) => {
    setDepartments(departments.map(department => 
      department.id === departmentData.id ? 
      { 
        ...department, 
        ...departmentData,
        updatedAt: new Date().toISOString()
      } : 
      department
    ));
  };

  const handleDeleteDepartment = (departmentId: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(department => department.id !== departmentId));
    }
  };

  // Filter and Search Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleCreateCourse = (courseData: CourseFormData) => {
    const newCourse: Course = {
      ...courseData,
      id: String(courses.length + 1),
      currentEnrollment: 0,
    };
    setCourses([...courses, newCourse]);
  };

  const handleEditCourse = (courseData: CourseFormData) => {
    setCourses(courses.map(course => 
      course.id === courseData.id ? { ...course, ...courseData } : course
    ));
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleCreateUser = (userData: Partial<Student | Teacher>) => {
    const newUser = {
      ...userData,
      id: String(users.length + 1),
    } as User;
    setUsers([...users, newUser]);
  };

  // Add new helper functions for finance
  const getFilteredTransactions = (transactions: FinancialTransaction[]) => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        transaction.studentName.toLowerCase().includes(financeFilters.searchTerm.toLowerCase()) ||
        transaction.studentId.toLowerCase().includes(financeFilters.searchTerm.toLowerCase());
      
      const matchesType = !financeFilters.transactionType || 
        transaction.type === financeFilters.transactionType;
      
      const matchesStatus = !financeFilters.paymentStatus || 
        transaction.status === financeFilters.paymentStatus;
      
      const matchesAmount = 
        (!financeFilters.amountRange.min || transaction.amount >= Number(financeFilters.amountRange.min)) &&
        (!financeFilters.amountRange.max || transaction.amount <= Number(financeFilters.amountRange.max));
      
      const matchesDateRange = 
        (!financeFilters.dateRange.startDate || new Date(transaction.dueDate) >= financeFilters.dateRange.startDate) &&
        (!financeFilters.dateRange.endDate || new Date(transaction.dueDate) <= financeFilters.dateRange.endDate);
      
      return matchesSearch && matchesType && matchesStatus && matchesAmount && matchesDateRange;
    }).sort((a, b) => {
      const aValue = a[financeFilters.sortBy as keyof typeof a];
      const bValue = b[financeFilters.sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return financeFilters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return financeFilters.sortOrder === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  };

  const getTransactionSummary = (filteredTransactions: FinancialTransaction[]) => {
    return {
      total: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
      paid: filteredTransactions.filter(t => t.status === 'paid')
        .reduce((sum, t) => sum + t.amount, 0),
      pending: filteredTransactions.filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0),
      overdue: filteredTransactions.filter(t => t.status === 'overdue')
        .reduce((sum, t) => sum + t.amount, 0),
    };
  };

  const renderContent = () => {
    // Move filtered departments outside case block
    const filteredDepartments = departments.filter(department => {
      const matchesSearch = 
        department.name.toLowerCase().includes(departmentSearchTerm.toLowerCase()) ||
        department.code.toLowerCase().includes(departmentSearchTerm.toLowerCase());
      const matchesSchool = !departmentSchoolFilter || department.school === departmentSchoolFilter;
      const matchesStatus = !departmentStatusFilter || department.status === departmentStatusFilter;
      return matchesSearch && matchesSchool && matchesStatus;
    });

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats Grid - Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center">
                  <UsersIcon className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
                    <p className="text-lg sm:text-2xl font-bold mt-1">{systemStats.totalStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center">
                  <AcademicCapIcon className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
                  <div className="ml-4">
                    <p className="text-xs sm:text-sm text-gray-600">Total Teachers</p>
                    <p className="text-lg sm:text-2xl font-bold mt-1">{systemStats.totalTeachers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center">
                  <BookOpenIcon className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-xs sm:text-sm text-gray-600">Active Courses</p>
                    <p className="text-lg sm:text-2xl font-bold mt-1">{systemStats.activeCourses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
                    <p className="text-lg sm:text-2xl font-bold mt-1">KSh {systemStats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Overview - Responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Activities */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  <ChartBarIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Recent Activities
                </h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-gray-600">No recent activities</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  <Cog6ToothIcon className="w-5 h-5 mr-2 text-purple-500" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <button 
                    className="p-2 sm:p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors flex flex-col items-center"
                  >
                    <UserPlusIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm text-center">Add New User</span>
                  </button>
                  <button className="p-2 sm:p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors flex flex-col items-center">
                    <BookOpenIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
                    <span className="text-xs sm:text-sm text-center">Create Course</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h2>
              <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => {
                    setUserModalType('student');
                    setIsUserModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Add Student</span>
                </button>
                <button 
                  onClick={() => {
                    setUserModalType('teacher');
                    setIsUserModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Add Teacher</span>
                </button>
              </div>
            </div>

            {/* Search and Filter Bar - Responsive layout */}
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <select 
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="flex-1 sm:flex-none min-w-[120px] text-sm sm:text-base border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Roles</option>
                    <option value="teacher">Teachers</option>
                    <option value="student">Students</option>
                  </select>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-none min-w-[120px] text-sm sm:text-base border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table - Responsive table */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <div className="text-xs sm:text-sm text-gray-500 capitalize">{user.role}</div>
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                            <div className="flex space-x-2 sm:space-x-3">
                              <button 
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} results
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded ${
                      currentPage === page ? 'bg-purple-500 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Create User Modal */}
            <CreateUserModal
              isOpen={isUserModalOpen}
              onClose={() => setIsUserModalOpen(false)}
              onSubmit={handleCreateUser}
              userType={userModalType}
            />
          </div>
        );

      case 'courses': {
        // Filter courses based on search and filters
        const filteredCourses = courses.filter(course => {
          const matchesSearch = 
            course.code.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
            course.title.toLowerCase().includes(courseSearchTerm.toLowerCase());
          const matchesSchool = !schoolFilter || course.school === schoolFilter;
          const matchesStatus = !courseStatusFilter || course.status === courseStatusFilter;
          return matchesSearch && matchesSchool && matchesStatus;
        });

        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Course Management</h2>
              <button 
                onClick={() => {
                  setEditCourseData(undefined);
                  setIsCourseModalOpen(true);
                }}
                className="flex-1 sm:flex-none bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
              >
                <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">Add New Course</span>
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={courseSearchTerm}
                      onChange={(e) => setCourseSearchTerm(e.target.value)}
                      placeholder="Search courses..."
                      className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <select 
                    value={schoolFilter}
                    onChange={(e) => setSchoolFilter(e.target.value)}
                    className="flex-1 sm:flex-none min-w-[120px] text-sm sm:text-base border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Schools</option>
                    <option value="SASA">SASA</option>
                    <option value="SBE">SBE</option>
                    <option value="SED">SED</option>
                    <option value="SEES">SEES</option>
                    <option value="SHHS">SHHS</option>
                    <option value="HSSS">HSSS</option>
                    <option value="SPAS">SPAS</option>
                  </select>
                  <select 
                    value={courseStatusFilter}
                    onChange={(e) => setCourseStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-none min-w-[120px] text-sm sm:text-base border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">School</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCourses
                        .slice((currentCoursePage - 1) * coursesPerPage, currentCoursePage * coursesPerPage)
                        .map((course) => (
                          <tr key={course.id} className="hover:bg-gray-50">
                            <td 
                              className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap cursor-pointer"
                              onClick={() => setSelectedCourse(course)}
                            >
                              <div className="text-xs sm:text-sm font-medium text-gray-900">{course.code}</div>
                            </td>
                            <td 
                              className="px-3 sm:px-6 py-2 sm:py-4 cursor-pointer"
                              onClick={() => setSelectedCourse(course)}
                            >
                              <div className="text-xs sm:text-sm text-gray-900">{course.title}</div>
                              <div className="text-xs text-gray-500">{course.description.substring(0, 50)}...</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">{course.school}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">{course.instructor}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">
                                {course.currentEnrollment}/{course.enrollmentCapacity}
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full ${
                                course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {course.status}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                              <div className="flex space-x-2 sm:space-x-3">
                                <button 
                                  onClick={() => {
                                    setEditCourseData(course);
                                    setIsCourseModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                Showing {Math.min((currentCoursePage - 1) * coursesPerPage + 1, filteredCourses.length)} to{' '}
                {Math.min(currentCoursePage * coursesPerPage, filteredCourses.length)} of{' '}
                {filteredCourses.length} courses
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setCurrentCoursePage(prev => Math.max(prev - 1, 1))}
                  disabled={currentCoursePage === 1}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentCoursePage(page)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded ${
                      currentCoursePage === page ? 'bg-purple-500 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentCoursePage(prev => Math.min(prev + 1, Math.ceil(filteredCourses.length / coursesPerPage)))}
                  disabled={currentCoursePage === Math.ceil(filteredCourses.length / coursesPerPage)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Course Details Modal */}
            {selectedCourse && (
              <CourseDetailsModal
                isOpen={!!selectedCourse}
                onClose={() => setSelectedCourse(null)}
                course={selectedCourse}
              />
            )}

            {/* Course Create/Edit Modal */}
            <CreateCourseModal
              isOpen={isCourseModalOpen}
              onClose={() => {
                setIsCourseModalOpen(false);
                setEditCourseData(undefined);
              }}
              onSubmit={(courseData) => {
                if (editCourseData) {
                  handleEditCourse(courseData);
                } else {
                  handleCreateCourse(courseData);
                }
                setIsCourseModalOpen(false);
              }}
              editData={editCourseData}
            />
          </div>
        );
      }

      case 'departments':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Department Management</h2>
              <button 
                onClick={() => {
                  setEditDepartmentData(undefined);
                  setIsDepartmentModalOpen(true);
                }}
                className="flex-1 sm:flex-none bg-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
              >
                <BuildingLibraryIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">Add Department</span>
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={departmentSearchTerm}
                      onChange={(e) => setDepartmentSearchTerm(e.target.value)}
                      placeholder="Search departments..."
                      className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <select 
                    value={departmentSchoolFilter}
                    onChange={(e) => setDepartmentSchoolFilter(e.target.value)}
                    className="flex-1 sm:flex-none min-w-[120px] text-sm sm:text-base border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Schools</option>
                    <option value="SASA">SASA</option>
                    <option value="SBE">SBE</option>
                    <option value="SED">SED</option>
                    <option value="SEES">SEES</option>
                    <option value="SHHS">SHHS</option>
                    <option value="HSSS">HSSS</option>
                    <option value="SPAS">SPAS</option>
                  </select>
                  <select 
                    value={departmentStatusFilter}
                    onChange={(e) => setDepartmentStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-none min-w-[120px] text-sm sm:text-base border rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Departments Table */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">School</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Head</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Students</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDepartments
                        .slice((currentDepartmentPage - 1) * departmentsPerPage, currentDepartmentPage * departmentsPerPage)
                        .map((department) => (
                          <tr key={department.id} className="hover:bg-gray-50">
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm font-medium text-gray-900">{department.name}</div>
                              <div className="text-xs text-gray-500">{department.code}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">{department.school}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">{department.head}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">{department.facultyCount}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-500">{department.studentsCount}</div>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full ${
                                department.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {department.status}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                              <div className="flex space-x-2 sm:space-x-3">
                                <button 
                                  onClick={() => {
                                    setEditDepartmentData(department);
                                    setIsDepartmentModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteDepartment(department.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                Showing {Math.min((currentDepartmentPage - 1) * departmentsPerPage + 1, filteredDepartments.length)} to{' '}
                {Math.min(currentDepartmentPage * departmentsPerPage, filteredDepartments.length)} of{' '}
                {filteredDepartments.length} departments
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => setCurrentDepartmentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentDepartmentPage === 1}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(filteredDepartments.length / departmentsPerPage) }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentDepartmentPage(page)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded ${
                      currentDepartmentPage === page ? 'bg-purple-500 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentDepartmentPage(prev => Math.min(prev + 1, Math.ceil(filteredDepartments.length / departmentsPerPage)))}
                  disabled={currentDepartmentPage === Math.ceil(filteredDepartments.length / departmentsPerPage)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Department Create/Edit Modal */}
            <CreateDepartmentModal
              isOpen={isDepartmentModalOpen}
              onClose={() => {
                setIsDepartmentModalOpen(false);
                setEditDepartmentData(undefined);
              }}
              onSubmit={(departmentData) => {
                if (editDepartmentData) {
                  handleEditDepartment(departmentData);
                } else {
                  handleCreateDepartment(departmentData);
                }
                setIsDepartmentModalOpen(false);
              }}
              editData={editDepartmentData}
            />
          </div>
        );

      case 'finance': {
        const currentFilteredTransactions = getFilteredTransactions(transactions);
        const currentTransactionSummary = getTransactionSummary(currentFilteredTransactions);
        
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Total Revenue Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(financialStats.totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CurrencyDollarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Pending Payments Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Payments</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(financialStats.pendingPayments)}
                    </p>
                    <p className="text-sm text-yellow-600 mt-2 flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      Due within 30 days
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <BanknotesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Overdue Payments Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overdue Payments</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(financialStats.overduePayments)}
                    </p>
                    <p className="text-sm text-red-600 mt-2 flex items-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      Requires immediate action
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <ArrowTrendingDownIcon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Transaction Filters</h3>
                <CSVLink
                  data={currentFilteredTransactions}
                  filename="transactions.csv"
                  className="mt-2 sm:mt-0 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export to CSV
                </CSVLink>
                      </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="flex space-x-2">
                    <DatePicker
                      selected={financeFilters.dateRange.startDate}
                      onChange={(date: Date | null) => setFinanceFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, startDate: date }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholderText="Start Date"
                    />
                    <DatePicker
                      selected={financeFilters.dateRange.endDate}
                      onChange={(date: Date | null) => setFinanceFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, endDate: date }
                      }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholderText="End Date"
                    />
                    </div>
                </div>

                {/* Transaction Type Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
                  <select
                    value={financeFilters.transactionType}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      transactionType: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">All Types</option>
                    <option value="tuition">Tuition</option>
                    <option value="library">Library</option>
                    <option value="hostel">Hostel</option>
                    <option value="other">Other</option>
                  </select>
                  </div>

                {/* Payment Status Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                  <select
                    value={financeFilters.paymentStatus}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      paymentStatus: e.target.value
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  </div>

                {/* Amount Range Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Amount Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={financeFilters.amountRange.min}
                      onChange={(e) => setFinanceFilters(prev => ({
                        ...prev,
                        amountRange: { ...prev.amountRange, min: e.target.value }
                      }))}
                      placeholder="Min"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      value={financeFilters.amountRange.max}
                      onChange={(e) => setFinanceFilters(prev => ({
                        ...prev,
                        amountRange: { ...prev.amountRange, max: e.target.value }
                      }))}
                      placeholder="Max"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                </div>
              </div>
            </div>

              {/* Search and Sort */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={financeFilters.searchTerm}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      searchTerm: e.target.value
                    }))}
                    placeholder="Search by student name or ID..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
              </div>
                <div className="flex space-x-2">
                  <select
                    value={financeFilters.sortBy}
                    onChange={(e) => setFinanceFilters(prev => ({
                      ...prev,
                      sortBy: e.target.value
                    }))}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="dueDate">Due Date</option>
                    <option value="amount">Amount</option>
                    <option value="studentName">Student Name</option>
                    <option value="status">Status</option>
                  </select>
                  <button
                    onClick={() => setFinanceFilters(prev => ({
                      ...prev,
                      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
                    }))}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {financeFilters.sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-xl font-bold mt-1">{formatCurrency(currentTransactionSummary.total)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-xl font-bold text-green-600 mt-1">{formatCurrency(currentTransactionSummary.paid)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">{formatCurrency(currentTransactionSummary.pending)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-bold text-red-600 mt-1">{formatCurrency(currentTransactionSummary.overdue)}</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentFilteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.studentName}</div>
                          <div className="text-sm text-gray-500">{transaction.studentId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{transaction.type}</div>
                          <div className="text-xs text-gray-500">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(transaction.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                            <button className="text-green-600 hover:text-green-900 text-sm">Mark Paid</button>
                            <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Settings Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure your system preferences and administrative settings
              </p>
            </div>

            {/* General Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                General Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={systemSettings.general.schoolName}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, schoolName: e.target.value }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={systemSettings.general.academicYear}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, academicYear: e.target.value }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Term
                  </label>
                  <select
                    value={systemSettings.general.currentTerm}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, currentTerm: Number(e.target.value) }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value={1}>Term 1</option>
                    <option value={2}>Term 2</option>
                    <option value={3}>Term 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time Zone
                  </label>
                  <select
                    value={systemSettings.general.timezone}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, timezone: e.target.value }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Africa/Nairobi">East Africa Time (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <button
                    onClick={() => setSystemSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        emailNotifications: !prev.notifications.emailNotifications
                      }
                    }))}
                    className={`${
                      systemSettings.notifications.emailNotifications
                        ? 'bg-purple-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        systemSettings.notifications.emailNotifications
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                    />
              </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive alerts via SMS</p>
                  </div>
                  <button
                    onClick={() => setSystemSettings(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        smsNotifications: !prev.notifications.smsNotifications
                      }
                    }))}
                    className={`${
                      systemSettings.notifications.smsNotifications
                        ? 'bg-purple-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        systemSettings.notifications.smsNotifications
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                    />
              </button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Security Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password Expiration (days)
                  </label>
                  <input
                    type="number"
                    value={systemSettings.security.passwordExpiration}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordExpiration: Number(e.target.value) }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={systemSettings.security.loginAttempts}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, loginAttempts: Number(e.target.value) }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={systemSettings.security.sessionTimeout}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: Number(e.target.value) }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <button
                    onClick={() => setSystemSettings(prev => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        twoFactorAuth: !prev.security.twoFactorAuth
                      }
                    }))}
                    className={`${
                      systemSettings.security.twoFactorAuth
                        ? 'bg-purple-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        systemSettings.security.twoFactorAuth
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                    />
              </button>
                </div>
              </div>
            </div>

            {/* Academic Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Academic Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Grading System
                  </label>
                  <select
                    value={systemSettings.academic.gradingSystem}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      academic: {
                        ...prev.academic,
                        gradingSystem: e.target.value as 'letter' | 'percentage' | 'gpa'
                      }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="letter">Letter Grade (A, B, C...)</option>
                    <option value="percentage">Percentage</option>
                    <option value="gpa">GPA (4.0 Scale)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Passing Grade (%)
                  </label>
                  <input
                    type="number"
                    value={systemSettings.academic.passingGrade}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      academic: { ...prev.academic, passingGrade: Number(e.target.value) }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Attendance Threshold (%)
                  </label>
                  <input
                    type="number"
                    value={systemSettings.academic.attendanceThreshold}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      academic: { ...prev.academic, attendanceThreshold: Number(e.target.value) }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Late Submission Policy
                  </label>
                  <select
                    value={systemSettings.academic.lateSubmissionPolicy}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      academic: {
                        ...prev.academic,
                        lateSubmissionPolicy: e.target.value as 'strict' | 'flexible' | 'none'
                      }
                    }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="strict">Strict (No Late Submissions)</option>
                    <option value="flexible">Flexible (With Penalty)</option>
                    <option value="none">None (Accept All Submissions)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Settings Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  // Here you would typically save the settings to your backend
                  alert('Settings saved successfully!');
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-2 text-gray-500">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 right-0 left-0 lg:left-64 z-10 transition-all duration-300">
        <DashboardHeader userRole="Administrator" userName={user?.name || 'Admin'} />
      </div>
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Responsive Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-lg`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute right-4 top-4 p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              <Cog6ToothIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Admin Portal</h2>
              <p className="text-sm text-gray-500">System Management</p>
            </div>
          </div>
          <div className="h-0.5 bg-gray-100 w-full mb-6"></div>
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: ChartBarIcon, label: 'Overview' },
              { id: 'users', icon: UsersIcon, label: 'User Management' },
              { id: 'courses', icon: BookOpenIcon, label: 'Course Management' },
              { id: 'departments', icon: BuildingLibraryIcon, label: 'Departments' },
              { id: 'finance', icon: CurrencyDollarIcon, label: 'Financial Overview' },
              { id: 'settings', icon: Cog6ToothIcon, label: 'System Settings' },
            ].map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`flex items-center p-3 rounded-xl transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-white' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 pt-16 min-h-screen ${
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
      }`}>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Banner */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Welcome back, Admin! 👋</h1>
                  <p className="text-purple-100">Here's an overview of your system's performance.</p>
                </div>
                {activeTab === 'users' && (
                  <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
                    <button
                      className="flex-1 sm:flex-none flex items-center justify-center px-3 sm:px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 text-sm sm:text-base"
                    >
                      <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Add Student
                    </button>
                    <button
                      className="flex-1 sm:flex-none flex items-center justify-center px-3 sm:px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 text-sm sm:text-base"
                    >
                      <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Add Teacher
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Render content based on active tab */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 