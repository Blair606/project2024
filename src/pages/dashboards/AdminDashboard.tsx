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
} from '@heroicons/react/24/outline';
import DashboardHeader from '../../components/DashboardHeader';

interface BaseUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  nationalId: string;
  phone: string;
  address: string;
}

interface Guardian {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  occupation: string;
  nationalId: string;
}

interface Student extends BaseUser {
  role: 'student';
  studentId: string;
  studyLevel: 'certificate' | 'diploma' | 'degree' | 'masters' | 'phd';
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  program: string;
  specialization: string;
  yearOfStudy: number;
  semester: number;
  dateOfBirth: string;
  guardians: Guardian[];
  emergencyContact: string;
}

interface Teacher extends BaseUser {
  role: 'teacher';
  employeeId: string;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  department: string;
  specialization: string;
  qualifications: string[];
  yearsOfExperience: number;
  subjects: string[];
}

type User = Student | Teacher;

// Add school programs constant
const SCHOOL_PROGRAMS = {
  SASA: [
    'BSc in Crop Science',
    'BSc in Animal Science',
    'BSc in Agribusiness Management',
    'BSc in Agricultural Resource Management',
    'BSc in Horticulture',
    'BSc in Soil Science'
  ],
  SBE: [
    'Bachelor of Business Administration',
    'Bachelor of Finance',
    'Bachelor of Accounting',
    'Bachelor of Economics',
    'Bachelor of Marketing',
    'Bachelor of Human Resource Management'
  ],
  SED: [
    'Bachelor of Education in Curriculum Development',
    'Bachelor of Education in Educational Administration',
    'Bachelor of Education in Educational Psychology',
    'Bachelor of Education in Special Needs',
    'Bachelor of Early Childhood Education',
    'Bachelor of Mathematics and Science Education'
  ],
  SEES: [
    'BSc in Environmental Science',
    'BSc in Environmental Planning and Management',
    'BSc in Marine Biology and Fisheries',
    'BSc in Geography',
    'BSc in Geology',
    'BSc in Meteorology'
  ],
  SHHS: [
    'Bachelor of Science in Nursing',
    'Bachelor of Public Health',
    'Bachelor of Food, Nutrition and Dietetics',
    'Bachelor of Environmental Health',
    'Bachelor of Medicine and Surgery'
  ],
  HSSS: [
    'Bachelor of Arts in Literature',
    'Bachelor of Arts in History',
    'Bachelor of Arts in Philosophy',
    'Bachelor of Arts in Sociology',
    'Bachelor of Arts in Psychology',
    'Bachelor of Arts in Political Science',
    'Bachelor of Arts in Anthropology',
    'Bachelor of Arts in Languages'
  ],
  SPAS: [
    'BSc in Mathematics',
    'BSc in Physics',
    'BSc in Chemistry',
    'BSc in Biology',
    'BSc in Computer Science',
    'BSc in Statistics',
    'BSc in Biotechnology'
  ]
} as const;

// Add school departments constant
const SCHOOL_DEPARTMENTS = {
  SASA: [
    'Department of Crop Science',
    'Department of Animal Science',
    'Department of Agricultural Economics',
    'Department of Agricultural Engineering',
    'Department of Agribusiness Management',
    'Department of Food Science and Technology'
  ],
  SBE: [
    'Department of Business Administration',
    'Department of Economics',
    'Department of Accounting and Finance',
    'Department of Marketing',
    'Department of Human Resource Management',
    'Department of Entrepreneurship'
  ],
  SED: [
    'Department of Educational Administration',
    'Department of Curriculum Studies',
    'Department of Educational Psychology',
    'Department of Early Childhood Education',
    'Department of Special Education',
    'Department of Educational Technology'
  ],
  SEES: [
    'Department of Environmental Science',
    'Department of Marine Science',
    'Department of Geography',
    'Department of Geology',
    'Department of Meteorology',
    'Department of Natural Resource Management'
  ],
  SHHS: [
    'Department of Nursing',
    'Department of Public Health',
    'Department of Human Nutrition',
    'Department of Medical Laboratory Sciences',
    'Department of Community Health',
    'Department of Health Systems Management'
  ],
  HSSS: [
    'Department of Literature',
    'Department of Languages',
    'Department of Philosophy',
    'Department of History',
    'Department of Sociology',
    'Department of Psychology',
    'Department of Political Science'
  ],
  SPAS: [
    'Department of Mathematics',
    'Department of Physics',
    'Department of Chemistry',
    'Department of Computer Science',
    'Department of Statistics',
    'Department of Biological Sciences',
    'Department of Biotechnology'
  ]
} as const;

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  
  const [systemStats] = useState({
    totalStudents: 1250,
    totalTeachers: 75,
    activeCourses: 48,
    departments: 12,
    totalRevenue: 15000000,
    pendingPayments: 2500000,
  });

  // Sample user data with complete type information
  const initialUsers: User[] = [
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
  ];

  // User Management State
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Add state for managing guardian forms
  const [guardianCount, setGuardianCount] = useState(1);

  // Add state for selected school
  const [selectedSchool, setSelectedSchool] = useState<keyof typeof SCHOOL_PROGRAMS | ''>('');

  // Add state for selected school in teacher form
  const [selectedTeacherSchool, setSelectedTeacherSchool] = useState<keyof typeof SCHOOL_DEPARTMENTS | ''>('');

  // Add error state
  const [formError, setFormError] = useState<string>('');

  // Function to add new guardian form
  const addGuardianForm = () => {
    setGuardianCount(prev => prev + 1);
  };

  // Function to remove guardian form
  const removeGuardianForm = () => {
    if (guardianCount > 1) {
      setGuardianCount(prev => prev - 1);
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

  // User Management Functions
  const handleAddUser = (formData: FormData): User => {
    if (userType === 'student') {
      const guardians: Guardian[] = Array.from({ length: guardianCount }, (_, index) => ({
        name: formData.get(`guardianName[${index}]`) as string,
        relationship: formData.get(`guardianRelationship[${index}]`) as string,
        phone: formData.get(`guardianPhone[${index}]`) as string,
        email: formData.get(`guardianEmail[${index}]`) as string,
        occupation: formData.get(`guardianOccupation[${index}]`) as string,
        nationalId: formData.get(`guardianNationalId[${index}]`) as string,
      })).filter(guardian => guardian.name && guardian.relationship);

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        status: 'active',
        joinDate: new Date().toISOString(),
        nationalId: formData.get('nationalId') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        role: 'student',
        studentId: formData.get('studentId') as string,
        studyLevel: formData.get('studyLevel') as 'certificate' | 'diploma' | 'degree' | 'masters' | 'phd',
        school: formData.get('school') as 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS',
        program: formData.get('program') as string,
        specialization: formData.get('specialization') as string,
        yearOfStudy: parseInt(formData.get('yearOfStudy') as string),
        semester: parseInt(formData.get('semester') as string),
        dateOfBirth: formData.get('dateOfBirth') as string,
        guardians,
        emergencyContact: `${formData.get('emergencyContactName')} (${formData.get('emergencyContactRelation')}) - ${formData.get('emergencyContactPhone')}`
      } as Student;
    } else {
      const qualificationsText = formData.get('qualifications') as string;
      const subjectsText = formData.get('subjects') as string;

      const qualifications = qualificationsText
        .split('\n')
        .map(q => q.trim())
        .filter(q => q.length > 0);

      const subjects = subjectsText
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        status: 'active',
        joinDate: new Date().toISOString(),
        nationalId: formData.get('nationalId') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        role: 'teacher',
        employeeId: formData.get('employeeId') as string,
        school: formData.get('school') as 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS',
        department: formData.get('department') as string,
        specialization: formData.get('specialization') as string,
        qualifications,
        yearsOfExperience: parseInt(formData.get('yearsOfExperience') as string),
        subjects
      } as Teacher;
    }
  };

  // Add reset function
  const resetForm = () => {
    setSelectedUser(null);
    setSelectedSchool('');
    setSelectedTeacherSchool('');
    setGuardianCount(1);
  };

  // Update handleEditUser function
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserType(user.role);
    
    if (user.role === 'student') {
      setSelectedSchool(user.school);
      setGuardianCount(user.guardians.length || 1);
    } else {
      setSelectedTeacherSchool(user.school);
    }
    
    setIsUserModalOpen(true);
  };

  // Update modal close handler
  const handleCloseModal = () => {
    setIsUserModalOpen(false);
    resetForm();
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  };

  const navItems = [
    { id: 'overview', icon: ChartBarIcon, label: 'Overview' },
    { id: 'users', icon: UsersIcon, label: 'User Management' },
    { id: 'courses', icon: BookOpenIcon, label: 'Course Management' },
    { id: 'departments', icon: BuildingLibraryIcon, label: 'Departments' },
    { id: 'finance', icon: CurrencyDollarIcon, label: 'Financial Overview' },
    { id: 'settings', icon: Cog6ToothIcon, label: 'System Settings' },
  ];

  // Add validation function
  const validateForm = (formData: FormData): boolean => {
    setFormError('');

    // Common validations
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const nationalId = formData.get('nationalId') as string;

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    if (!phone.match(/^\+?[\d\s-]{10,}$/)) {
      setFormError('Please enter a valid phone number');
      return false;
    }

    if (!nationalId.match(/^[A-Z0-9]{5,}$/i)) {
      setFormError('Please enter a valid National ID');
      return false;
    }

    if (userType === 'student') {
      const studentId = formData.get('studentId') as string;
      if (!studentId.match(/^[A-Z0-9]{5,}$/i)) {
        setFormError('Please enter a valid Student ID');
        return false;
      }

      // Validate at least one guardian
      const primaryGuardianName = formData.get('guardianName[0]') as string;
      const primaryGuardianPhone = formData.get('guardianPhone[0]') as string;
      if (!primaryGuardianName || !primaryGuardianPhone) {
        setFormError('Primary guardian information is required');
        return false;
      }
    } else {
      const employeeId = formData.get('employeeId') as string;
      if (!employeeId.match(/^[A-Z0-9]{5,}$/i)) {
        setFormError('Please enter a valid Employee ID');
        return false;
      }

      const qualifications = (formData.get('qualifications') as string).trim();
      const subjects = (formData.get('subjects') as string).trim();
      if (!qualifications || !subjects) {
        setFormError('Please enter qualifications and subjects');
        return false;
      }
    }

    return true;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold mt-1">{systemStats.totalStudents}</p>
                  </div>
                  <UsersIcon className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Teachers</p>
                    <p className="text-2xl font-bold mt-1">{systemStats.totalTeachers}</p>
                  </div>
                  <AcademicCapIcon className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold mt-1">{systemStats.activeCourses}</p>
                  </div>
                  <BookOpenIcon className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            </div>

            {/* System Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">No recent activities</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                    <UserPlusIcon className="w-6 h-6 mb-2 mx-auto" />
                    <span className="block text-center">Add New User</span>
                  </button>
                  <button className="p-4 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                    <BookOpenIcon className="w-6 h-6 mb-2 mx-auto" />
                    <span className="block text-center">Create Course</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    setSelectedUser(null);
                    setIsUserModalOpen(true);
                    setUserType('student');
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                >
                  <UserPlusIcon className="w-5 h-5 mr-2" />
                  Add Student
                </button>
                <button 
                  onClick={() => {
                    setSelectedUser(null);
                    setIsUserModalOpen(true);
                    setUserType('teacher');
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <AcademicCapIcon className="w-5 h-5 mr-2" />
                  Add Teacher
                </button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              >
                <option value="">All Roles</option>
                <option value="teacher">Teachers</option>
                <option value="student">Students</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
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

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} results
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page ? 'bg-purple-500 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Updated Modal */}
            {isUserModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                  <div className="flex justify-between items-center p-6 border-b">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {selectedUser ? 'Edit User' : userType === 'student' ? 'Add New Student' : 'Add New Teacher'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {userType === 'student' ? 
                          'Fill in student and guardian information' : 
                          'Fill in teacher information'}
                      </p>
                    </div>
                    <button 
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="overflow-y-auto flex-1 p-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      
                      if (!validateForm(formData)) {
                        return;
                      }
                      
                      try {
                        const newUser = handleAddUser(formData);
                        
                        if (selectedUser) {
                          setUsers(prevUsers => 
                            prevUsers.map(user => 
                              user.id === selectedUser.id ? { ...newUser, id: user.id } : user
                            )
                          );
                        } else {
                          setUsers(prevUsers => [...prevUsers, newUser]);
                        }
                        
                        handleCloseModal();
                      } catch (error) {
                        setFormError('An error occurred while saving the user. Please try again.');
                      }
                    }}>
                      {/* Add error message display */}
                      {formError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-600">{formError}</p>
                        </div>
                      )}

                      {userType === 'student' ? (
                        <div className="space-y-8">
                          {/* Student Information Section */}
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Student Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                                <input
                                  type="text"
                                  name="studentId"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Study Level</label>
                                <select
                                  name="studyLevel"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Select Study Level</option>
                                  <option value="certificate">Certificate</option>
                                  <option value="diploma">Diploma</option>
                                  <option value="degree">Bachelor's Degree</option>
                                  <option value="masters">Master's Degree</option>
                                  <option value="phd">PhD/Doctorate</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">School</label>
                                <select
                                  name="school"
                                  required
                                  value={selectedSchool}
                                  onChange={(e) => setSelectedSchool(e.target.value as keyof typeof SCHOOL_PROGRAMS)}
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Select School</option>
                                  <option value="SASA">School of Agricultural Sciences and Agribusiness (SASA)</option>
                                  <option value="SBE">School of Business and Economics (SBE)</option>
                                  <option value="SED">School of Education (SED)</option>
                                  <option value="SEES">School of Environmental and Earth Sciences (SEES)</option>
                                  <option value="SHHS">School of Health and Human Sciences (SHHS)</option>
                                  <option value="HSSS">School of Humanities and Social Sciences (HSSS)</option>
                                  <option value="SPAS">School of Pure and Applied Sciences (SPAS)</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Program</label>
                                <select
                                  name="program"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Select Program</option>
                                  {selectedSchool && SCHOOL_PROGRAMS[selectedSchool].map((program) => (
                                    <option key={program} value={program}>
                                      {program}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Specialization/Major</label>
                                <input
                                  type="text"
                                  name="specialization"
                                  placeholder="e.g., Software Engineering, Finance, Plant Science"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                                <select
                                  name="yearOfStudy"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Select Year</option>
                                  {[1, 2, 3, 4, 5, 6].map(year => (
                                    <option key={year} value={year}>Year {year}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Semester</label>
                                <select
                                  name="semester"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Select Semester</option>
                                  <option value="1">Semester 1</option>
                                  <option value="2">Semester 2</option>
                                  <option value="3">Semester 3</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                  type="date"
                                  name="dateOfBirth"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">National ID</label>
                                <input
                                  type="text"
                                  name="nationalId"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                  name="address"
                                  rows={2}
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Guardian Information Section */}
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-lg font-medium text-gray-900">Guardian Information</h4>
                              <button
                                type="button"
                                onClick={addGuardianForm}
                                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                              >
                                + Add Another Guardian
                              </button>
                            </div>
                            <div id="guardiansContainer" className="space-y-6">
                              {Array.from({ length: guardianCount }, (_, index) => (
                                <div key={index} data-guardian-section={index + 1} className="border rounded-lg p-4 bg-gray-50">
                                  <div className="flex justify-between items-center mb-4">
                                    <h5 className="font-medium text-gray-700">
                                      {index === 0 ? 'Primary Guardian' : `Guardian ${index + 1}`}
                                    </h5>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          const section = (e.target as HTMLElement).closest('[data-guardian-section]');
                                          if (section) {
                                            section.classList.toggle('collapsed');
                                          }
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                      >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>
                                      {index > 0 && (
                                        <button
                                          type="button"
                                          onClick={removeGuardianForm}
                                          className="text-red-500 hover:text-red-700"
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Relationship to Student</label>
                                      <select
                                        name={`guardianRelationship[${index}]`}
                                        required
                                        className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      >
                                        <option value="">Select Relationship</option>
                                        <option value="mother">Mother</option>
                                        <option value="father">Father</option>
                                        <option value="grandmother">Grandmother</option>
                                        <option value="grandfather">Grandfather</option>
                                        <option value="aunt">Aunt</option>
                                        <option value="uncle">Uncle</option>
                                        <option value="sibling">Sibling</option>
                                        <option value="legal_guardian">Legal Guardian</option>
                                        <option value="other">Other</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                      <input
                                        type="text"
                                        name={`guardianName[${index}]`}
                                        required
                                        className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                      <input
                                        type="tel"
                                        name={`guardianPhone[${index}]`}
                                        required
                                        className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Email</label>
                                      <input
                                        type="email"
                                        name={`guardianEmail[${index}]`}
                                        required
                                        className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Occupation</label>
                                      <input
                                        type="text"
                                        name={`guardianOccupation[${index}]`}
                                        required
                                        className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">National ID</label>
                                      <input
                                        type="text"
                                        name={`guardianNationalId[${index}]`}
                                        required
                                        className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Emergency Contact Section */}
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                                <input
                                  type="text"
                                  name="emergencyContactName"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                                <input
                                  type="tel"
                                  name="emergencyContactPhone"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                                <input
                                  type="text"
                                  name="emergencyContactRelation"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {/* Teacher Information Section */}
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Teacher Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                                <input
                                  type="text"
                                  name="employeeId"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">School</label>
                                <select
                                  name="school"
                                  required
                                  value={selectedTeacherSchool}
                                  onChange={(e) => setSelectedTeacherSchool(e.target.value as keyof typeof SCHOOL_DEPARTMENTS)}
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                >
                                  <option value="">Select School</option>
                                  <option value="SASA">School of Agricultural Sciences and Agribusiness (SASA)</option>
                                  <option value="SBE">School of Business and Economics (SBE)</option>
                                  <option value="SED">School of Education (SED)</option>
                                  <option value="SEES">School of Environmental and Earth Sciences (SEES)</option>
                                  <option value="SHHS">School of Health and Human Sciences (SHHS)</option>
                                  <option value="HSSS">School of Humanities and Social Sciences (HSSS)</option>
                                  <option value="SPAS">School of Pure and Applied Sciences (SPAS)</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <select
                                  name="department"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                >
                                  <option value="">Select Department</option>
                                  {selectedTeacherSchool && SCHOOL_DEPARTMENTS[selectedTeacherSchool].map((department) => (
                                    <option key={department} value={department}>
                                      {department}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                  type="tel"
                                  name="phone"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">National ID</label>
                                <input
                                  type="text"
                                  name="nationalId"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                <input
                                  type="text"
                                  name="specialization"
                                  placeholder="e.g., Advanced Mathematics, Organic Chemistry, Software Engineering"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <input
                                  type="number"
                                  name="yearsOfExperience"
                                  min="0"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Subjects</label>
                                <input
                                  type="text"
                                  name="subjects"
                                  placeholder="Separate subjects with commas"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                                <textarea
                                  name="qualifications"
                                  rows={3}
                                  placeholder="Enter each qualification on a new line (e.g., Ph.D. in Computer Science, M.Sc. in Software Engineering)"
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                  name="address"
                                  rows={2}
                                  required
                                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6 flex justify-end space-x-3 sticky bottom-0 bg-white pt-4 border-t">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`px-4 py-2 text-white rounded-md ${
                            userType === 'student' 
                              ? 'bg-blue-500 hover:bg-blue-600' 
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          {selectedUser ? 'Save Changes' : 'Add User'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      // Add other tab content here...
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader userRole="Administrator" userName={user?.name || 'Admin'} />
      
      <div className="flex flex-1 pt-16">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-20 left-4 p-2 rounded-md bg-white shadow-md lg:hidden z-50"
        >
          <span className="sr-only">Toggle Menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="h-full bg-white shadow-lg">
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
              
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full p-3 rounded-xl transition-all duration-200
                      ${activeTab === item.id 
                        ? 'bg-purple-500 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-white' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-w-0">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 