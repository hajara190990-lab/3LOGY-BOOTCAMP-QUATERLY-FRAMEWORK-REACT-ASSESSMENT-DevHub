import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SnippetsPage from './pages/SnippetsPage';
import SnippetDetailPage from './pages/SnippetDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import TasksPage from './pages/TasksPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-[#0f0e1a]">
          <Navbar />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/snippets" element={<ProtectedRoute><SnippetsPage /></ProtectedRoute>} />
            <Route path="/snippets/:id" element={<ProtectedRoute><SnippetDetailPage /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;