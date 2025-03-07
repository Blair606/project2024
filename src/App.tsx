import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

import StudentDashboard from './pages/dashboards/StudentDashboard'
import InstructorDashboard from './pages/dashboards/InstructorDashboard'
import GuardianDashboard from './pages/dashboards/GuardianDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import SignUpPage from './pages/SignUpPage'
import { AuthProvider } from './contexts/AuthContext'
import UnitView from './pages/units/UnitView'

function App() {
  return (
    // <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/dashboard/student" 
              element={
                // <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/instructor" 
              element={
                // <ProtectedRoute requiredRole="instructor">
                  <InstructorDashboard />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/guardian" 
              element={
                // <ProtectedRoute requiredRole="guardian">
                  <GuardianDashboard />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                // <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                // </ProtectedRoute>
              } 
            />
            <Route path='/signin' element={<Login /> } />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path="/unit/:unitId/topic/:topicId" element={<UnitView />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    // </AuthProvider>
  )
}

export default App
