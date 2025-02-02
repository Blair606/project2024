import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Assignment {
  id: number;
  title: string;
  courseId: number;
  courseName: string;
  type: string;
  dueDate: string;
  description: string;
  totalPoints: number;
  status: 'Active' | 'Draft' | 'Closed';
  submissions: number;
  totalStudents: number;
}

interface AssignmentState {
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  loading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    createAssignment: (state, action: PayloadAction<Omit<Assignment, 'id'>>) => {
      const newAssignment = {
        ...action.payload,
        id: Date.now(),
        submissions: 0,
      };
      state.assignments.push(newAssignment);
    },
    updateAssignment: (state, action: PayloadAction<Partial<Assignment> & { id: number }>) => {
      const index = state.assignments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.assignments[index] = { ...state.assignments[index], ...action.payload };
      }
    },
    deleteAssignment: (state, action: PayloadAction<number>) => {
      state.assignments = state.assignments.filter(a => a.id !== action.payload);
    },
    updateSubmissionCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const assignment = state.assignments.find(a => a.id === action.payload.id);
      if (assignment) {
        assignment.submissions = action.payload.count;
      }
    },
  },
});

export const {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  updateSubmissionCount,
} = assignmentSlice.actions;

export default assignmentSlice.reducer; 