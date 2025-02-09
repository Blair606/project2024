import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon, CreditCardIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

interface PaymentModalProps {
  isOpen: boolean
  closeModal: () => void
  amount: number
  feeDetails?: {
    type: string
    dueDate: string
    mandatory: boolean
  }
  isMultipleFees?: boolean
}

const PaymentModal = ({ isOpen, closeModal, amount, feeDetails, isMultipleFees }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('mpesa')

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4">
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
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                    Payment Details
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Fee Details */}
                <div className="mb-6">
                  {isMultipleFees ? (
                    <p className="text-gray-600">Multiple mandatory fees selected</p>
                  ) : feeDetails && (
                    <>
                      <p className="text-gray-600">{feeDetails.type}</p>
                      <p className="text-sm text-gray-500">Due: {feeDetails.dueDate}</p>
                    </>
                  )}
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">KSh {amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                        paymentMethod === 'mpesa'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <DevicePhoneMobileIcon className="h-6 w-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium">M-PESA</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                        paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCardIcon className="h-6 w-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                      paymentMethod === 'mpesa'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    onClick={closeModal}
                  >
                    Pay KSh {amount.toLocaleString()}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PaymentModal 