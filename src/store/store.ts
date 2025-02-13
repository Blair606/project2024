import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import assignmentReducer from './slices/assignmentSlice'
import discussionReducer from './slices/discussionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assignments: assignmentReducer,
    discussions: discussionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 