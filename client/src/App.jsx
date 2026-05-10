import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Components & Guard
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RefisterPage';
import DashboardPage from './pages/DashboardPage';
import SnippetsPage from './pages/SnippetsPage';
import TasksPage from './pages/TasksPage';
import ResourcesPage from './pages/ResourcesPage';

// A small sub-layout to keep the Main UI logic separate
const AppLayout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 bg-gray-50 min-h-screen">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Application Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>
          } />
          <Route path="/snippets" element={
            <ProtectedRoute><AppLayout><SnippetsPage /></AppLayout></ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute><AppLayout><TasksPage /></AppLayout></ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute><AppLayout><ResourcesPage /></AppLayout></ProtectedRoute>
          } />

          {/* Root/Default Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;