import { Routes, Route, Navigate } from 'react-router-dom'
import Login         from './features/auth/Login'
import Signup        from './features/auth/Signup'
import PrivateRoute  from './routes/PrivateRoute'
import Dashboard     from './pages/Dashboard'
import Projects      from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'

function App() {
  return (
    <Routes>
      <Route path="/"             element={<Navigate to="/login" />} />
      <Route path="/login"        element={<Login />} />
      <Route path="/signup"       element={<Signup />} />
      <Route path="/dashboard"    element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/projects"     element={<PrivateRoute><Projects /></PrivateRoute>} />
      <Route path="/projects/:id" element={<PrivateRoute><ProjectDetail /></PrivateRoute>} />
      <Route path="*"             element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App