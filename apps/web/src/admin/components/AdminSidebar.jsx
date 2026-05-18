
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Tags, Download, 
  Mail, Users, Settings, LogOut, BookOpen, X 
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { currentAdmin, logout } = useAdminAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Categorias', path: '/admin/categories', icon: Tags },
    { name: 'Downloads', path: '/admin/downloads', icon: Download },
    { name: 'Mensagens', path: '/admin/messages', icon: Mail },
    { name: 'Newsletter', path: '/admin/newsletter', icon: Users },
    { name: 'Configurações', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[250px] bg-admin-sidebar text-admin-sidebar-foreground
        transform transition-transform duration-300 ease-in-out
        flex flex-col h-[100dvh] shadow-xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 bg-admin-dark border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-3 font-bold text-lg">
            <BookOpen className="w-6 h-6 text-admin-gold" />
            <span className="font-['Poppins'] tracking-tight">EB360 Admin</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white hover:text-admin-gold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${active 
                    ? 'bg-admin-gold/10 text-admin-gold font-medium' 
                    : 'hover:bg-white/5 text-gray-300 hover:text-white'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-admin-gold' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-admin-dark/50">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-admin-gold flex items-center justify-center text-admin-dark font-bold text-sm">
              {currentAdmin?.name?.charAt(0) || currentAdmin?.email?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentAdmin?.name || 'Administrador'}</p>
              <p className="text-xs text-gray-400 truncate">{currentAdmin?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>
    </>
  );
}
