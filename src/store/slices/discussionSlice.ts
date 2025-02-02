import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DiscussionGroup {
  id: number;
  title: string;
  courseId: number;
  courseName: string;
  description: string;
  dueDate: string;
  groupNumber: number;
  totalGroups: number;
  members: {
    id: number;
    name: string;
  }[];
  messages: {
    id: number;
    userId: number;
    userName: string;
    content: string;
    timestamp: string;
  }[];
  lastActive: string;
}

interface DiscussionState {
  groups: DiscussionGroup[];
  loading: boolean;
  error: string | null;
}

const initialState: DiscussionState = {
  groups: [],
  loading: false,
  error: null,
};

const discussionSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {
    createDiscussionGroups: (state, action: PayloadAction<{
      title: string;
      courseId: number;
      courseName: string;
      description: string;
      dueDate: string;
      numberOfGroups: number;
      students: { id: number; name: string; }[];
    }>) => {
      const { numberOfGroups, students, ...groupData } = action.payload;
      const studentsPerGroup = Math.ceil(students.length / numberOfGroups);
      
      // Distribute students across groups
      for (let i = 0; i < numberOfGroups; i++) {
        const groupMembers = students.slice(
          i * studentsPerGroup,
          Math.min((i + 1) * studentsPerGroup, students.length)
        );
        
        const newGroup: DiscussionGroup = {
          id: Date.now() + i,
          ...groupData,
          groupNumber: i + 1,
          totalGroups: numberOfGroups,
          members: groupMembers,
          messages: [],
          lastActive: new Date().toISOString(),
        };
        
        state.groups.push(newGroup);
      }
    },
    addMessage: (state, action: PayloadAction<{
      groupId: number;
      userId: number;
      userName: string;
      content: string;
    }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.messages.push({
          id: Date.now(),
          ...action.payload,
          timestamp: new Date().toISOString(),
        });
        group.lastActive = new Date().toISOString();
      }
    },
    updateGroupMembers: (state, action: PayloadAction<{
      groupId: number;
      members: { id: number; name: string; }[];
    }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.members = action.payload.members;
      }
    },
  },
});

export const {
  createDiscussionGroups,
  addMessage,
  updateGroupMembers,
} = discussionSlice.actions;

export default discussionSlice.reducer; 