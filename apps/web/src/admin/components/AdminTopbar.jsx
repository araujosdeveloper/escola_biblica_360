
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminTopbar({ toggleSidebar }) {
  const { currentUser, logout } = useAdminAuth();
  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter(x => x && x !== 'admin');
  const title = pathnames.length > 0 
    ? pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1) 
    : 'Dashboard';

  const currentDate = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <header className="h-16 bg-white border-b border-admin-border flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden text-admin-dark"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex flex-col">
          <h1 className="text-lg font-semibold text-admin-dark font-['Poppins'] leading-tight">
            {title}
          </h1>
          <span className="text-xs text-gray-500 capitalize">{currentDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-admin-danger rounded-full border border-white"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 outline-none transition-colors border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full bg-admin-dark flex items-center justify-center text-white shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 pr-2">
              {currentUser?.name || currentUser?.email}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-admin-danger focus:bg-admin-danger/10 focus:text-admin-danger cursor-pointer">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
