import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LearnerDashboard from './pages/dashboards/LearnerDashboard'
import TutorDashboard from './pages/dashboards/TutorDashboard'
import GuardianDashboard from './pages/dashboards/GuardianDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import UnitView from './pages/units/UnitView'
import LearnerLoginPage from './pages/learner/LearnerLoginPage'
import TutorLoginPage from './pages/tutor/TutorLoginPage'
import LearnerRegisterPage from './pages/learner/LearnerRegisterPage'
import TutorRegisterPage from './pages/tutor/TutorRegisterPage'

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/learner/login" element={<LearnerLoginPage />} />
            <Route path="/learner/register" element={<LearnerRegisterPage />} />
            <Route path="/tutor/login" element={<TutorLoginPage />} />
            <Route path="/tutor/register" element={<TutorRegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard/learner" element={
              <ProtectedRoute>
                <LearnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/tutor" element={
              <ProtectedRoute>
                <TutorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/guardian" element={
              <ProtectedRoute>
                <GuardianDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/unit/:unitId" element={
              <ProtectedRoute>
                <UnitView />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}

export default App
