import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface DepartmentFormData {
  id?: string;
  name: string;
  code: string;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  head: string;
  description: string;
  status: 'active' | 'inactive';
}

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  editData?: DepartmentFormData;
}

const CreateDepartmentModal = ({ isOpen, onClose, onSubmit, editData }: CreateDepartmentModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: DepartmentFormData = {
      name: formData.get('name') as string,
      code: formData.get('code') as string,
      school: formData.get('school') as DepartmentFormData['school'],
      head: formData.get('head') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as 'active' | 'inactive',
    };

    if (editData?.id) {
      data.id = editData.id;
    }

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
                  {editData ? 'Edit Department' : 'Create New Department'}
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Department Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={editData?.name}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter department name"
                    />
                  </div>

                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                      Department Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      defaultValue={editData?.code}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter department code"
                    />
                  </div>

                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                      School
                    </label>
                    <select
                      name="school"
                      id="school"
                      defaultValue={editData?.school}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    >
                      <option value="">Select a school</option>
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
                    <label htmlFor="head" className="block text-sm font-medium text-gray-700">
                      Department Head
                    </label>
                    <input
                      type="text"
                      name="head"
                      id="head"
                      defaultValue={editData?.head}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter department head name"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      defaultValue={editData?.description}
                      required
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="Enter department description"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      defaultValue={editData?.status}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                      {editData ? 'Update' : 'Create'}
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

export default CreateDepartmentModal; 