import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface PaymentFormData {
  studentId: string;
  studentName: string;
  type: 'tuition' | 'library' | 'hostel' | 'other';
  amount: number;
  description: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'mpesa' | 'card';
  paymentDate: string;
  academicYear: string;
  semester: string;
  receiptNumber?: string;
}

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

const RecordPaymentModal = ({ isOpen, onClose, onSubmit }: RecordPaymentModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: PaymentFormData = {
      studentId: formData.get('studentId') as string,
      studentName: formData.get('studentName') as string,
      type: formData.get('type') as PaymentFormData['type'],
      amount: Number(formData.get('amount')),
      description: formData.get('description') as string,
      paymentMethod: formData.get('paymentMethod') as PaymentFormData['paymentMethod'],
      paymentDate: formData.get('paymentDate') as string,
      academicYear: formData.get('academicYear') as string,
      semester: formData.get('semester') as string,
      receiptNumber: formData.get('receiptNumber') as string,
    };

    onSubmit(data);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  Record Payment
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                        Student ID
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        id="studentId"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                        placeholder="Enter student ID"
                      />
                    </div>

                    <div>
                      <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                        Student Name
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        id="studentName"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                        placeholder="Enter student name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Payment Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    >
                      <option value="">Select payment type</option>
                      <option value="tuition">Tuition Fee</option>
                      <option value="library">Library Fee</option>
                      <option value="hostel">Hostel Fee</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount (KSh)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      id="paymentMethod"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    >
                      <option value="">Select payment method</option>
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="mpesa">M-PESA</option>
                      <option value="card">Debit/Credit Card</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        name="academicYear"
                        id="academicYear"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                        placeholder="e.g., 2023/2024"
                      />
                    </div>

                    <div>
                      <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                        Semester
                      </label>
                      <select
                        name="semester"
                        id="semester"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      >
                        <option value="">Select semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      name="paymentDate"
                      id="paymentDate"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="receiptNumber" className="block text-sm font-medium text-gray-700">
                      Receipt Number
                    </label>
                    <input
                      type="text"
                      name="receiptNumber"
                      id="receiptNumber"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter receipt number (optional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      required
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter payment description"
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Record Payment
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RecordPaymentModal; 