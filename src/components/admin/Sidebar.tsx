import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Plus, Users, LogOut, ChevronRight,
  Home, Car, Monitor, ShoppingBag, Menu, X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Ajouter un bien', icon: Plus, path: '/admin/add' },
  { label: 'Administrateurs', icon: Users, path: '/admin/admins' },
];

const categories = [
  { label: 'Immobilier', icon: Home, path: '/admin/category/real-estate' },
  { label: 'Véhicules', icon: Car, path: '/admin/category/vehicle' },
  { label: 'IT & Réseaux', icon: Monitor, path: '/admin/category/it' },
  { label: 'Électronique', icon: ShoppingBag, path: '/admin/category/electronics' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-dark-800 text-white w-72">
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-400/20">
            <span className="text-dark-800 font-extrabold text-lg">CM</span>
          </div>
          <div>
            <p className="font-bold text-white text-lg leading-tight">CM Group</p>
            <p className="text-gold-400 text-xs font-medium">Administration</p>
          </div>
        </Link>
      </div>

      {/* Navigation principale */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="text-muted-400 text-xs font-semibold uppercase tracking-wider mb-3 px-2">Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
              location.pathname === item.path
                ? 'bg-gold-400 text-dark-800 shadow-lg shadow-gold-400/20'
                : 'text-gray-300 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}

        <p className="text-muted-400 text-xs font-semibold uppercase tracking-wider mb-3 mt-8 px-2">Catégories</p>
        {categories.map((cat) => (
          <a
            key={cat.path}
            href={cat.path}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => isMobile && setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-dark-700 hover:text-white transition-all"
          >
            <cat.icon size={20} />
            {cat.label}
            <ChevronRight size={14} className="ml-auto text-muted-400" />
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700 space-y-3">
        <div className="flex items-center gap-3 px-2 py-2 bg-dark-700/50 rounded-xl">
          <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center text-dark-800 font-bold text-sm">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.email}</p>
            <p className="text-xs text-gold-400">Admin</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Toggle mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-dark-800 text-white p-3 rounded-xl shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar desktop (toujours visible) */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-40">
        <SidebarContent />
      </div>

      {/* Sidebar mobile (slide) */}
      {isOpen && isMobile && (
        <div className="fixed left-0 top-0 h-screen z-50 lg:hidden animate-in slide-in-from-left">
          <SidebarContent />
        </div>
      )}
    </>
  );
}