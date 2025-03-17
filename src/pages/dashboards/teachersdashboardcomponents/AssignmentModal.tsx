import { useState } from 'react';
import { Assignment } from '../../../../types';

interface AssignmentModalProps {
  onClose: () => void;
  onSubmit: (data: Assignment) => void;
}

const AssignmentModal = ({ onClose, onSubmit }: AssignmentModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: 0
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Create Assignment</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData as Assignment);
        }}>
          {/* Form fields */}
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;