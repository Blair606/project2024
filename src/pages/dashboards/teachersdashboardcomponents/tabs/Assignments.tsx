import { useState } from 'react';
import { Assignment } from '../../../../types';
import AssignmentModal from '../modals/AssignmentModal';

const Assignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          Create Assignment
        </button>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>

      {showModal && (
        <AssignmentModal 
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            setAssignments([...assignments, data]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Assignments;