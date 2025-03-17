import { useState } from 'react';
import Calendar from '../Calendar';
import ScheduleModal from '../modals/ScheduleModal';
import { Class } from '../../../../types';

const OnlineClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Online Classes</h2>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="btn-primary"
        >
          Schedule Class
        </button>
      </div>

      <Calendar 
        events={classes}
        onEventClick={(classId) => {
          // Handle class click
        }}
      />

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={(classData) => {
            setClasses([...classes, classData]);
            setShowScheduleModal(false);
          }}
        />
      )}
    </div>
  );
};

export default OnlineClasses;