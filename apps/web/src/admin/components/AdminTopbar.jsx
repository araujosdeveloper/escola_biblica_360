
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, User, LogOut, Settings, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const titleMap = {
  dashboard: 'Dashboard',
  posts: 'Posts',
  categories: 'Categorias',
  downloads: 'Downloads',
  messages: 'Mensagens',
  newsletter: 'Newsletter',
  settings: 'Configurações',
};

export default function AdminTopbar({ toggleSidebar }) {
  const { currentAdmin, currentUser, logout, role } = useAdminAuth();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((item) => item && item !== 'admin');
  const sectionKey = pathnames[0] || 'dashboard';
  const title = titleMap[sectionKey] || sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);

  const admin = currentAdmin || currentUser;

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const initials =
    admin?.name?.charAt(0) ||
    admin?.email?.charAt(0) ||
    'A';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-admin-border bg-white/95 px-4 shadow-sm backdrop-blur-xl lg:px-8">
      <div className="flex min-w-0 items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-xl p-2 text-admin-dark transition-colors hover:bg-gray-100 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate font-['Poppins'] text-lg font-bold leading-tight text-admin-dark md:text-xl">
            {title}
          </h1>

          <span className="hidden text-xs capitalize text-gray-500 md:block">
            {currentDate}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button
          className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-admin-dark"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-admin-danger" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-2xl border border-transparent p-1.5 outline-none transition-colors hover:border-admin-border hover:bg-gray-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-admin-dark text-sm font-bold uppercase text-white shadow-sm">
              {initials}
            </div>

            <div className="hidden min-w-0 pr-2 text-left md:block">
              <p className="max-w-[160px] truncate text-sm font-semibold text-gray-700">
                {admin?.name || 'Administrador'}
              </p>

              <p className="max-w-[160px] truncate text-xs text-gray-500">
                {admin?.email || 'admin'}
              </p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 rounded-2xl">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-admin-dark text-sm font-bold uppercase text-white">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {admin?.name || 'Administrador'}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {admin?.email || 'admin'}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-admin-gold">
                {role || 'admin'}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="gap-2 cursor-pointer">
              <Link to="/admin/settings">
                <Settings className="h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer gap-2 text-admin-danger focus:bg-admin-danger/10 focus:text-admin-danger"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}