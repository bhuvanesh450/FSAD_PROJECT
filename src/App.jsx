import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DBProvider }      from './context/DBContext';
import { ToastProvider }   from './context/ToastContext';
import BackgroundCanvas    from './components/shared/BackgroundCanvas';
import HomePage            from './pages/home/HomePage';
import AuthPage            from './pages/auth/AuthPage';
import StudentDashboard    from './pages/student/StudentDashboard';
import AdminDashboard      from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <DBProvider>
      <ToastProvider>
        <BrowserRouter>
          <BackgroundCanvas />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/"              element={<HomePage />}         />
              <Route path="/auth/:role"    element={<AuthPage />}         />
              <Route path="/student"       element={<StudentDashboard />} />
              <Route path="/admin"         element={<AdminDashboard />}   />
              <Route path="*"              element={<Navigate to="/" />}  />
            </Routes>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </DBProvider>
  );
}
