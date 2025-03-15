import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Assignment } from '../../store/slices/assignmentSlice';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Array<{ id: number; name: string }>;
  onSubmit: (assignmentData: Assignment) => void;
}

const CreateAssignmentModal = ({ isOpen, onClose, courses, onSubmit }: CreateAssignmentModalProps) => {
  const [formData, setFormData] = useState<Assignment>({
    id: 0,
    title: '',
    courseId: 0,
    courseName: '',
    type: 'Assignment',
    dueDate: '',
    description: '',
    totalPoints: 100,
    status: 'Draft',
    submissions: 0,
    totalStudents: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare the data to match the schema
      const payload = {
        title: formData.title,
        courseId: formData.courseId,
        courseName: formData.courseName,
        type: formData.type,
        dueDate: new Date(formData.dueDate).toISOString(), // Convert to ISO string
        description: formData.description,
        totalPoints: formData.totalPoints,
      };

      // Send the data to the endpoint
      const response = await fetch('http://localhost:3000/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment');
      }

      const result = await response.json();

      // Display success toast
      toast.success('Assignment created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Call the onSubmit prop (if needed)
      onSubmit(result);

      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error creating assignment:', error);

      // Display error toast
      toast.error('Failed to create assignment. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add this to enable toasts globally */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-medium">
                      Create New Assignment
                    </Dialog.Title>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Course</label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        value={formData.courseId.toString()}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            courseId: Number(e.target.value),
                            courseName: courses.find((c) => c.id === Number(e.target.value))?.name || '',
                          })
                        }
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="Assignment">Assignment</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Project">Project</option>
                        <option value="Lab Report">Lab Report</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <input
                        type="datetime-local"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Points</label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        value={formData.totalPoints}
                        onChange={(e) => setFormData({ ...formData, totalPoints: Number(e.target.value) })}
                      />
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
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
                        Create Assignment
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateAssignmentModal;