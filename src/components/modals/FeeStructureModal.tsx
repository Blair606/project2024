import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FeeItem {
  id: string;
  name: string;
  amount: number;
  description: string;
  category: 'tuition' | 'library' | 'hostel' | 'other';
  isRequired: boolean;
  academicYear: string;
  semester: string;
  program: string;
  yearOfStudy: number;
}

interface FeeStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeeStructureModal = ({ isOpen, onClose }: FeeStructureModalProps) => {
  // Sample fee structure data
  const feeStructure: FeeItem[] = [
    {
      id: '1',
      name: 'Tuition Fee',
      amount: 50000,
      description: 'Regular semester tuition fee',
      category: 'tuition',
      isRequired: true,
      academicYear: '2023/2024',
      semester: '1',
      program: 'BSc Computer Science',
      yearOfStudy: 1
    },
    {
      id: '2',
      name: 'Library Fee',
      amount: 5000,
      description: 'Library and resource access fee',
      category: 'library',
      isRequired: true,
      academicYear: '2023/2024',
      semester: '1',
      program: 'BSc Computer Science',
      yearOfStudy: 1
    },
    {
      id: '3',
      name: 'Hostel Fee',
      amount: 25000,
      description: 'Student accommodation fee',
      category: 'hostel',
      isRequired: false,
      academicYear: '2023/2024',
      semester: '1',
      program: 'BSc Computer Science',
      yearOfStudy: 1
    }
  ];

  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString('en-KE')}`;
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center border-b pb-3"
                >
                  Fee Structure - Academic Year 2023/2024
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <div className="mt-4">
                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                      <option value="">All Programs</option>
                      <option value="bsc-cs">BSc Computer Science</option>
                      <option value="bsc-it">BSc Information Technology</option>
                    </select>
                    <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                      <option value="">All Years</option>
                      <option value="1">Year 1</option>
                      <option value="2">Year 2</option>
                      <option value="3">Year 3</option>
                      <option value="4">Year 4</option>
                    </select>
                    <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                      <option value="">All Semesters</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                    </select>
                  </div>

                  {/* Fee Structure Table */}
                  <div className="mt-4 border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Item</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {feeStructure.map((fee) => (
                          <tr key={fee.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{fee.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatCurrency(fee.amount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                fee.category === 'tuition' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : fee.category === 'library'
                                  ? 'bg-green-100 text-green-800'
                                  : fee.category === 'hostel'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {fee.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                fee.isRequired ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {fee.isRequired ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500">{fee.description}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Required Fees</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(
                              feeStructure
                                .filter(fee => fee.isRequired)
                                .reduce((sum, fee) => sum + fee.amount, 0)
                            )}
                          </td>
                          <td colSpan={3}></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Optional Fees</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(
                              feeStructure
                                .filter(fee => !fee.isRequired)
                                .reduce((sum, fee) => sum + fee.amount, 0)
                            )}
                          </td>
                          <td colSpan={3}></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      onClick={() => {
                        // Add download functionality
                        window.print();
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FeeStructureModal; 