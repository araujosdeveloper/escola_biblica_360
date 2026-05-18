
import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { useHealthCheck } from '@/services/healthCheck.js';
import { Shield, Server, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseProductionClient.js';
import { useNavigate } from 'react-router-dom';

export default function AdminSettings() {
  const { currentAdmin, logout } = useAdminAuth();
  const { status, latency, isChecking } = useHealthCheck();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getStatusColor = () => {
    if (status === 'Online') return 'bg-green-500';
    if (status === 'Conexão instável') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Configurações do Sistema</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie informações do seu painel administrativo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Info */}
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold font-['Poppins']">Informações do Servidor</h2>
          </div>
          <div className="space-y-4 flex-grow">
            <div>
              <p className="text-sm text-muted-foreground">URL do PocketBase</p>
              <p className="font-medium truncate">{pb.baseUrl}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status da Conexão</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} ${isChecking ? 'animate-pulse' : ''}`}></span>
                <span className="font-medium text-foreground">{status}</span>
                {latency > 0 && <span className="text-xs text-muted-foreground ml-2">({latency}ms)</span>}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Versão do Sistema</p>
              <p className="font-medium">v1.2.0</p>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold font-['Poppins']">Perfil do Administrador</h2>
          </div>
          <div className="space-y-4 flex-grow">
            <div>
              <p className="text-sm text-muted-foreground">Nome Completo</p>
              <p className="font-medium">{currentAdmin?.name || 'Administrador'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">E-mail</p>
              <p className="font-medium">{currentAdmin?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nível de Acesso</p>
              <span className="inline-block mt-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold uppercase tracking-wider">
                {currentAdmin?.role || 'Admin'}
              </span>
            </div>
          </div>
          <div className="pt-6 mt-6 border-t border-border">
            <Button variant="destructive" onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <LogOut className="w-4 h-4 mr-2" /> Encerrar Sessão
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
