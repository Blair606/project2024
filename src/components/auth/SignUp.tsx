import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, AcademicCapIcon, HomeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // Default role
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    enableMFA: false,
    phone: '',
    // Student-specific fields
    studentId: '',
    studyLevel: 'degree',
    school: 'SPAS',
    program: '',
    specialization: '',
    yearOfStudy: 1,
    semester: 1,
    dateOfBirth: '',
    nationalId: '',
    address: '',
    guardians: [{ name: '', phone: '', relationship: '' }],
    emergencyContact: '',
    // Teacher-specific fields
    staffId: '',
    department: '',
    // Parent-specific fields
    studentIdForParent: '',
    relationshipToStudent: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGuardianChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGuardians = [...formData.guardians];
    updatedGuardians[index][name] = value;
    setFormData({
      ...formData,
      guardians: updatedGuardians,
    });
  };

  const addGuardian = () => {
    setFormData({
      ...formData,
      guardians: [...formData.guardians, { name: '', phone: '', relationship: '' }],
    });
  };

  const removeGuardian = (index) => {
    const updatedGuardians = formData.guardians.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      guardians: updatedGuardians,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        duration: 4000,
        style: { background: '#ef4444', color: 'white' },
      });
      return;
    }

    // Create user data object
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: role,
      phone: formData.phone,
      enableMFA: formData.enableMFA,
      ...(role === 'student' && {
        studentId: formData.studentId,
        studyLevel: formData.studyLevel,
        school: formData.school,
        program: formData.program,
        specialization: formData.specialization,
        yearOfStudy: Number(formData.yearOfStudy),
        semester: Number(formData.semester),
        dateOfBirth: formData.dateOfBirth,
        nationalId: formData.nationalId,
        address: formData.address,
        guardians: formData.guardians,
        emergencyContact: formData.emergencyContact,
      }),
      ...(role === 'teacher' && {
        staffId: formData.staffId,
        department: formData.department,
      }),
      ...(role === 'parent' && {
        studentIdForParent: formData.studentIdForParent,
        relationshipToStudent: formData.relationshipToStudent,
      })
    };

    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    toast.success('Registration successful! Redirecting to login...', {
      duration: 3000,
      style: { background: '#22c55e', color: 'white' },
    });

    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select your role and fill in the details to get started.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Your Role
              </label>
              <div className="mt-1 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    role === 'student'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    role === 'teacher'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    role === 'parent'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Parent
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Role-Specific Fields */}
            {role === 'student' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                      Student ID
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      id="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="studyLevel" className="block text-sm font-medium text-gray-700">
                      Study Level
                    </label>
                    <select
                      name="studyLevel"
                      id="studyLevel"
                      value={formData.studyLevel}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="degree">Degree</option>
                      <option value="diploma">Diploma</option>
                      <option value="certificate">Certificate</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                      School
                    </label>
                    <select
                      name="school"
                      id="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="SASA">SASA</option>
                      <option value="SBE">SBE</option>
                      <option value="SED">SED</option>
                      <option value="SEES">SEES</option>
                      <option value="SHHS">SHHS</option>
                      <option value="HSSS">HSSS</option>
                      <option value="SPAS">SPAS</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                      Program
                    </label>
                    <input
                      type="text"
                      name="program"
                      id="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      id="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
                      Year of Study
                    </label>
                    <input
                      type="number"
                      name="yearOfStudy"
                      id="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <input
                      type="number"
                      name="semester"
                      id="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">
                      National ID
                    </label>
                    <input
                      type="text"
                      name="nationalId"
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Guardians' Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Guardians' Details</h3>
                  {formData.guardians.map((guardian, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor={`guardianName-${index}`} className="block text-sm font-medium text-gray-700">
                          Guardian Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id={`guardianName-${index}`}
                          value={guardian.name}
                          onChange={(e) => handleGuardianChange(index, e)}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor={`guardianPhone-${index}`} className="block text-sm font-medium text-gray-700">
                          Guardian Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id={`guardianPhone-${index}`}
                          value={guardian.phone}
                          onChange={(e) => handleGuardianChange(index, e)}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor={`guardianRelationship-${index}`} className="block text-sm font-medium text-gray-700">
                          Relationship
                        </label>
                        <input
                          type="text"
                          name="relationship"
                          id={`guardianRelationship-${index}`}
                          value={guardian.relationship}
                          onChange={(e) => handleGuardianChange(index, e)}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      {formData.guardians.length > 1 && (
                        <div className="md:col-span-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeGuardian(index)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Remove Guardian
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGuardian}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    + Add Another Guardian
                  </button>
                </div>
              </>
            )}

            {role === 'teacher' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    name="staffId"
                    id="staffId"
                    value={formData.staffId}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {role === 'parent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentIdForParent" className="block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentIdForParent"
                    id="studentIdForParent"
                    value={formData.studentIdForParent}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your child's student ID"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="relationshipToStudent" className="block text-sm font-medium text-gray-700">
                    Relationship to Student
                  </label>
                  <select
                    name="relationshipToStudent"
                    id="relationshipToStudent"
                    value={formData.relationshipToStudent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select relationship</option>
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="guardian">Guardian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Multi-Factor Authentication */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="enableMFA"
                id="enableMFA"
                checked={formData.enableMFA}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="enableMFA" className="ml-2 block text-sm text-gray-900">
                Enable Multi-Factor Authentication (MFA)
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/signin')}
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;