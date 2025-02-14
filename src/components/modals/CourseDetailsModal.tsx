import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ClockIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Course } from '../../types/course';

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

const CourseDetailsModal = ({ isOpen, onClose, course }: CourseDetailsModalProps) => {
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
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      Course Details
                    </Dialog.Title>

                    {/* Course Header */}
                    <div className="bg-purple-50 rounded-lg p-4 mb-6">
                      <h4 className="text-xl font-bold text-purple-900">{course.title}</h4>
                      <p className="text-sm text-purple-700 mt-1">Course Code: {course.code}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-8 w-8 text-purple-500" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Credits</p>
                            <p className="text-lg font-semibold">{course.credits}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-8 w-8 text-green-500" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Enrollment</p>
                            <p className="text-lg font-semibold">{course.currentEnrollment}/{course.enrollmentCapacity}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center">
                          <ClockIcon className="h-8 w-8 text-blue-500" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="text-lg font-semibold">
                              {course.schedule.reduce((total: number, slot: { duration: number }) => total + slot.duration, 0)} hrs/week
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Information */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          {course.description}
                        </p>
                      </div>

                      {/* Academic Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">School</h4>
                          <p className="text-sm text-gray-600">{course.school}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Department</h4>
                          <p className="text-sm text-gray-600">{course.department}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Instructor</h4>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>

                      {/* Schedule */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Schedule</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="space-y-2">
                            {course.schedule.map((slot: { day: string; time: string; duration: number }, index: number) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span>{slot.day}: {slot.time} ({slot.duration} hours)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Prerequisites */}
                      {course.prerequisites.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Prerequisites</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.prerequisites.map((prereq: string) => (
                              <span
                                key={prereq}
                                className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                              >
                                {prereq}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Course Dates */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Start Date</h4>
                          <p className="text-sm text-gray-600">{new Date(course.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">End Date</h4>
                          <p className="text-sm text-gray-600">{new Date(course.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
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

export default CourseDetailsModal; 