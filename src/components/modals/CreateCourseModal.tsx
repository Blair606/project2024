import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: CourseFormData) => void;
  editData?: CourseFormData;
}

export interface CourseFormData {
  id?: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  department: string;
  instructor: string;
  status: 'active' | 'inactive';
  enrollmentCapacity: number;
  startDate: string;
  endDate: string;
  schedule: {
    day: string;
    time: string;
    duration: number;
  }[];
  prerequisites: string[];
}

const initialFormData: CourseFormData = {
  code: '',
  title: '',
  description: '',
  credits: 3,
  school: 'SPAS',
  department: '',
  instructor: '',
  status: 'active',
  enrollmentCapacity: 40,
  startDate: '',
  endDate: '',
  schedule: [{ day: 'Monday', time: '09:00', duration: 2 }],
  prerequisites: [],
};

const CreateCourseModal = ({ isOpen, onClose, onSubmit, editData }: CourseModalProps) => {
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [prerequisite, setPrerequisite] = useState('');

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData(initialFormData);
    }
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleScheduleChange = (index: number, field: keyof typeof formData.schedule[0], value: string | number) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setFormData({ ...formData, schedule: newSchedule });
  };

  const addScheduleSlot = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: 'Monday', time: '09:00', duration: 2 }],
    });
  };

  const removeScheduleSlot = (index: number) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index),
    });
  };

  const addPrerequisite = () => {
    if (prerequisite && !formData.prerequisites.includes(prerequisite)) {
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, prerequisite],
      });
      setPrerequisite('');
    }
  };

  const removePrerequisite = (prereq: string) => {
    setFormData({
      ...formData,
      prerequisites: formData.prerequisites.filter((p) => p !== prereq),
    });
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
                      {editData ? 'Edit Course' : 'Create New Course'}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        {/* Course Code */}
                        <div>
                          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Course Code*
                          </label>
                          <input
                            type="text"
                            id="code"
                            required
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* Course Title */}
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Course Title*
                          </label>
                          <input
                            type="text"
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* Credits */}
                        <div>
                          <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                            Credits*
                          </label>
                          <input
                            type="number"
                            id="credits"
                            required
                            min="1"
                            max="6"
                            value={formData.credits}
                            onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* School */}
                        <div>
                          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                            School*
                          </label>
                          <select
                            id="school"
                            required
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value as CourseFormData['school'] })}
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

                        {/* Department */}
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

                        {/* Instructor */}
                        <div>
                          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                            Instructor*
                          </label>
                          <input
                            type="text"
                            id="instructor"
                            required
                            value={formData.instructor}
                            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* Status */}
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status*
                          </label>
                          <select
                            id="status"
                            required
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        {/* Enrollment Capacity */}
                        <div>
                          <label htmlFor="enrollmentCapacity" className="block text-sm font-medium text-gray-700">
                            Enrollment Capacity*
                          </label>
                          <input
                            type="number"
                            id="enrollmentCapacity"
                            required
                            min="1"
                            value={formData.enrollmentCapacity}
                            onChange={(e) => setFormData({ ...formData, enrollmentCapacity: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* Start Date */}
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Start Date*
                          </label>
                          <input
                            type="date"
                            id="startDate"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>

                        {/* End Date */}
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            End Date*
                          </label>
                          <input
                            type="date"
                            id="endDate"
                            required
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description*
                        </label>
                        <textarea
                          id="description"
                          required
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>

                      {/* Schedule */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">Schedule*</label>
                          <button
                            type="button"
                            onClick={addScheduleSlot}
                            className="text-sm text-purple-600 hover:text-purple-700"
                          >
                            + Add Time Slot
                          </button>
                        </div>
                        <div className="space-y-2">
                          {formData.schedule.map((slot, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <select
                                value={slot.day}
                                onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="time"
                                value={slot.time}
                                onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                              />
                              <input
                                type="number"
                                min="1"
                                max="4"
                                value={slot.duration}
                                onChange={(e) => handleScheduleChange(index, 'duration', Number(e.target.value))}
                                className="block w-24 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                                placeholder="Hours"
                              />
                              {formData.schedule.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeScheduleSlot(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Prerequisites */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={prerequisite}
                              onChange={(e) => setPrerequisite(e.target.value)}
                              placeholder="Course code"
                              className="block w-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={addPrerequisite}
                              className="text-sm text-purple-600 hover:text-purple-700"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.prerequisites.map((prereq) => (
                            <span
                              key={prereq}
                              className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                            >
                              {prereq}
                              <button
                                type="button"
                                onClick={() => removePrerequisite(prereq)}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        >
                          {editData ? 'Save Changes' : 'Create Course'}
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

export default CreateCourseModal; 