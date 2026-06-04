import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Tags,
  Mail,
  Users,
  Settings,
  LogOut,
  BookOpen,
  X,
  ChevronRight,
} from 'lucide-react';

import { useAdminAuth } from '../context/AdminAuthContext.jsx';

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { currentAdmin, logout } = useAdminAuth();

  const navItems = [
    {
      section: 'GERAL',
      items: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },

    {
      section: 'CONTEÚDO',
      items: [
        {
          name: 'Posts',
          path: '/admin/posts',
          icon: FileText,
        },
        {
          name: 'Categorias',
          path: '/admin/categories',
          icon: Tags,
        },
      ],
    },

    {
      section: 'COMUNICAÇÃO',
      items: [
        {
          name: 'Mensagens',
          path: '/admin/messages',
          icon: Mail,
        },
        {
          name: 'Newsletter',
          path: '/admin/newsletter',
          icon: Users,
        },
      ],
    },

    {
      section: 'SISTEMA',
      items: [
        {
          name: 'Configurações',
          path: '/admin/settings',
          icon: Settings,
        },
      ],
    },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-[100dvh] w-[280px] flex-col
          border-r border-white/10
          bg-admin-sidebar
          text-admin-sidebar-foreground
          shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 bg-admin-dark px-6">
          <Link
            to="/admin/dashboard"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-admin-gold/10 transition-all duration-300 group-hover:scale-105">
              <BookOpen className="h-6 w-6 text-admin-gold" />
            </div>

            <div className="flex flex-col">
              <span className="font-['Poppins'] text-lg font-bold tracking-tight text-white">
                EB360 Admin
              </span>

              <span className="text-[11px] uppercase tracking-wider text-gray-400">
                Painel Administrativo
              </span>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-8">
            {navItems.map((group) => (
              <div key={group.section}>
                <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {group.section}
                </p>

                <div className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          group flex items-center justify-between rounded-xl px-4 py-3
                          transition-all duration-200
                          ${
                            active
                              ? 'bg-admin-gold/10 text-admin-gold shadow-lg shadow-admin-gold/5'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              flex h-9 w-9 items-center justify-center rounded-xl
                              transition-colors duration-200
                              ${
                                active
                                  ? 'bg-admin-gold/15'
                                  : 'bg-white/[0.03] group-hover:bg-white/[0.06]'
                              }
                            `}
                          >
                            <Icon
                              className={`
                                h-4.5 w-4.5
                                ${
                                  active
                                    ? 'text-admin-gold'
                                    : 'text-gray-400 group-hover:text-white'
                                }
                              `}
                            />
                          </div>

                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>

                        <ChevronRight
                          className={`
                            h-4 w-4 transition-all duration-200
                            ${
                              active
                                ? 'translate-x-0 text-admin-gold opacity-100'
                                : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                            }
                          `}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-admin-dark/40 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-admin-gold text-sm font-bold text-admin-dark">
              {currentAdmin?.name?.charAt(0) ||
                currentAdmin?.email?.charAt(0) ||
                'A'}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {currentAdmin?.name || 'Administrador'}
              </p>

              <p className="truncate text-xs text-gray-400">
                {currentAdmin?.email}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="
              flex w-full items-center gap-3 rounded-xl
              px-4 py-3 text-sm font-medium text-red-400
              transition-all duration-200
              hover:bg-red-500/10 hover:text-red-300
            "
          >
            <LogOut className="h-4 w-4" />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>
    </>
  );
}