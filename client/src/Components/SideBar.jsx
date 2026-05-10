import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Code2, 
  CheckSquare, 
  BookMarked, 
  LogOut,
  Terminal 
} from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Snippets', path: '/snippets', icon: Code2 },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Resources', path: '/resources', icon: BookMarked },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col sticky top-0">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Terminal size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">DevShelf</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((Item) => (
          <Link
            key={Item.path}
            to={Item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === Item.path 
                ? 'bg-indigo-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Item.icon size={20} />
            <span className="font-medium">{Item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-4 mt-4 border-t border-slate-800">
        <div className="px-3 mb-4">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">User</p>
          <p className="text-sm text-slate-300 truncate">{user?.userName || 'Developer'}</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;