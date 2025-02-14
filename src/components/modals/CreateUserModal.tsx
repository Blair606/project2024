import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Student, Teacher } from '../../types/user';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: Partial<Student | Teacher>) => void;
  userType: 'student' | 'teacher';
}

const CreateUserModal = ({ isOpen, onClose, onSubmit, userType }: CreateUserModalProps) => {
  const [formData, setFormData] = useState<Partial<Student | Teacher>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    nationalId: '',
    status: 'active',
    school: 'SPAS',
    joinDate: new Date().toISOString().split('T')[0],
  });

  const [guardians, setGuardians] = useState<Student['guardians']>([]);
  const [guardian, setGuardian] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    occupation: '',
    nationalId: '',
  });

  const [qualifications, setQualifications] = useState<string[]>([]);
  const [qualification, setQualification] = useState('');

  const [subjects, setSubjects] = useState<string[]>([]);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        nationalId: '',
        status: 'active',
        school: 'SPAS',
        joinDate: new Date().toISOString().split('T')[0],
      });
      setGuardians([]);
      setQualifications([]);
      setSubjects([]);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      ...(userType === 'student' && {
        role: 'student' as const,
        studentId: `S${Math.floor(Math.random() * 10000)}`,
        guardians,
      }),
      ...(userType === 'teacher' && {
        role: 'teacher' as const,
        employeeId: `T${Math.floor(Math.random() * 10000)}`,
        qualifications,
        subjects,
        yearsOfExperience: Number(formData.yearsOfExperience || 0),
      }),
    };
    onSubmit(userData);
    onClose();
  };

  const addGuardian = () => {
    if (guardian.name && guardian.relationship) {
      setGuardians([...guardians, guardian]);
      setGuardian({
        name: '',
        relationship: '',
        phone: '',
        email: '',
        occupation: '',
        nationalId: '',
      });
    }
  };

  const removeGuardian = (index: number) => {
    setGuardians(guardians.filter((_, i) => i !== index));
  };

  const addQualification = () => {
    if (qualification && !qualifications.includes(qualification)) {
      setQualifications([...qualifications, qualification]);
      setQualification('');
    }
  };

  const removeQualification = (qual: string) => {
    setQualifications(qualifications.filter((q) => q !== qual));
  };

  const addSubject = () => {
    if (subject && !subjects.includes(subject)) {
      setSubjects([...subjects, subject]);
      setSubject('');
    }
  };

  const removeSubject = (sub: string) => {
    setSubjects(subjects.filter((s) => s !== sub));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Add New {userType === 'student' ? 'Student' : 'Teacher'}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        {/* Basic Information */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name*
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email*
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone*
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">
                            National ID*
                          </label>
                          <input
                            type="text"
                            id="nationalId"
                            required
                            value={formData.nationalId}
                            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address*
                          </label>
                          <input
                            type="text"
                            id="address"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                            School*
                          </label>
                          <select
                            id="school"
                            required
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value as any })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
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

                        {userType === 'student' && (
                          <>
                            <div>
                              <label htmlFor="studyLevel" className="block text-sm font-medium text-gray-700">
                                Study Level*
                              </label>
                              <select
                                id="studyLevel"
                                required
                                value={formData.studyLevel}
                                onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value as any })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              >
                                <option value="certificate">Certificate</option>
                                <option value="diploma">Diploma</option>
                                <option value="degree">Degree</option>
                                <option value="masters">Masters</option>
                                <option value="phd">PhD</option>
                              </select>
                            </div>

                            <div>
                              <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                                Program*
                              </label>
                              <input
                                type="text"
                                id="program"
                                required
                                value={formData.program}
                                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                Specialization*
                              </label>
                              <input
                                type="text"
                                id="specialization"
                                required
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
                                Year of Study*
                              </label>
                              <input
                                type="number"
                                id="yearOfStudy"
                                required
                                min="1"
                                max="6"
                                value={formData.yearOfStudy}
                                onChange={(e) => setFormData({ ...formData, yearOfStudy: Number(e.target.value) })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                                Semester*
                              </label>
                              <input
                                type="number"
                                id="semester"
                                required
                                min="1"
                                max="3"
                                value={formData.semester}
                                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                                Date of Birth*
                              </label>
                              <input
                                type="date"
                                id="dateOfBirth"
                                required
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                                Emergency Contact*
                              </label>
                              <input
                                type="tel"
                                id="emergencyContact"
                                required
                                value={formData.emergencyContact}
                                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            {/* Guardians */}
                            <div className="sm:col-span-2">
                              <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Guardians</label>
                                <button
                                  type="button"
                                  onClick={addGuardian}
                                  className="text-sm text-purple-600 hover:text-purple-700"
                                >
                                  + Add Guardian
                                </button>
                              </div>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    value={guardian.name}
                                    onChange={(e) => setGuardian({ ...guardian, name: e.target.value })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Relationship"
                                    value={guardian.relationship}
                                    onChange={(e) => setGuardian({ ...guardian, relationship: e.target.value })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={guardian.phone}
                                    onChange={(e) => setGuardian({ ...guardian, phone: e.target.value })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <input
                                    type="email"
                                    placeholder="Email"
                                    value={guardian.email}
                                    onChange={(e) => setGuardian({ ...guardian, email: e.target.value })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Occupation"
                                    value={guardian.occupation}
                                    onChange={(e) => setGuardian({ ...guardian, occupation: e.target.value })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    placeholder="National ID"
                                    value={guardian.nationalId}
                                    onChange={(e) => setGuardian({ ...guardian, nationalId: e.target.value })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                </div>
                                {guardians.map((g, index) => (
                                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <div>
                                      <p className="text-sm font-medium">{g.name}</p>
                                      <p className="text-xs text-gray-500">{g.relationship}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeGuardian(index)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <XMarkIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {userType === 'teacher' && (
                          <>
                            <div>
                              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                Department*
                              </label>
                              <input
                                type="text"
                                id="department"
                                required
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                Specialization*
                              </label>
                              <input
                                type="text"
                                id="specialization"
                                required
                                value={formData.specialization}
                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                                Years of Experience*
                              </label>
                              <input
                                type="number"
                                id="yearsOfExperience"
                                required
                                min="0"
                                value={formData.yearsOfExperience}
                                onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                            </div>

                            {/* Qualifications */}
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Qualifications*</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    placeholder="Add qualification"
                                    className="block w-48 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={addQualification}
                                    className="text-purple-600 hover:text-purple-700"
                                  >
                                    <PlusIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {qualifications.map((qual) => (
                                  <span
                                    key={qual}
                                    className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                                  >
                                    {qual}
                                    <button
                                      type="button"
                                      onClick={() => removeQualification(qual)}
                                      className="text-purple-600 hover:text-purple-700"
                                    >
                                      <XMarkIcon className="h-4 w-4" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Subjects */}
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Subjects*</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Add subject"
                                    className="block w-48 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={addSubject}
                                    className="text-purple-600 hover:text-purple-700"
                                  >
                                    <PlusIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {subjects.map((sub) => (
                                  <span
                                    key={sub}
                                    className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                                  >
                                    {sub}
                                    <button
                                      type="button"
                                      onClick={() => removeSubject(sub)}
                                      className="text-purple-600 hover:text-purple-700"
                                    >
                                      <XMarkIcon className="h-4 w-4" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        >
                          Add {userType === 'student' ? 'Student' : 'Teacher'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateUserModal; 