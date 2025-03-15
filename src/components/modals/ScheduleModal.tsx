import React from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import {
 
    CalendarIcon,

    PlusIcon,
 
    
 
  } from '@heroicons/react/24/outline';

export default function ScheduleModal() {
  return (
    <div>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Online Classes</h2>
              <button
                onClick={() => setIsScheduleClassModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Schedule Class
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scheduledClasses.map((class_) => (
                <div key={class_.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{class_.title}</h3>
                      <p className="text-gray-600">{class_.course}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      class_.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800'
                        : class_.status === 'live'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {class_.status.charAt(0).toUpperCase() + class_.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{class_.date}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{class_.time}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    {class_.status === 'upcoming' ? (
                      <>
                        <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Start Class
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100">
                          Cancel
                        </button>
                      </>
                    ) : class_.status === 'live' ? (
                      <button className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                        Join Class
                      </button>
                    ) : (
                      <button className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                        View Recording
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}
