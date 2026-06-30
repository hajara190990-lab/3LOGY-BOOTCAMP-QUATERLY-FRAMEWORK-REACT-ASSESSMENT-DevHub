import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white bg-white/10 px-3 py-1.5 rounded-lg font-medium text-sm'
      : 'text-gray-400 hover:text-white px-3 py-1.5 text-sm transition-colors';

  return (
    <nav className="bg-[#171625] border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-2 font-bold text-white text-lg"
        >
          DevShelf <span className="text-xl">📁</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/snippets" className={navLinkClass}>Snippets</NavLink>
            <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
            <NavLink to="/tasks" className={navLinkClass}>Tasks</NavLink>

            <div className="flex items-center gap-3 pl-4 ml-2 border-l border-white/10">
              <span className="text-sm text-gray-300">
                {user.userName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm border border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;