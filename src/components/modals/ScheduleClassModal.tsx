import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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

interface ScheduleClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (data: Omit<ScheduledClass, 'id' | 'status'>) => void;
  courses: { id: number; name: string; }[];
}

const ScheduleClassModal = ({ isOpen, onClose, onSchedule, courses }: ScheduleClassModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const classData = {
        title: formData.get('title') as string,
        course: formData.get('course') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        status: 'upcoming' as const,
        meetingLink: formData.get('meetingLink') as string || '',
        recording: ''
      };

      const response = await axios.post('http://localhost:3000/api/online-classes', classData);
      onSchedule(response.data);
      onClose();
      toast.success('Class scheduled successfully');
    } catch (error) {
      console.error('Failed to schedule class:', error);
      toast.error('Failed to schedule class');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Schedule New Class</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                required
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <select
                name="course"
                required
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                name="date"
                required
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                required
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meeting Link (Optional)</label>
              <input
                type="url"
                name="meetingLink"
                disabled={isLoading}
                placeholder="https://meet.google.com/..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isLoading ? 'Scheduling...' : 'Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClassModal;