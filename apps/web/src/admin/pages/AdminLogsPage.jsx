
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { Search, ShieldAlert, FileJson, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PermissionGuard from '@/components/PermissionGuard.jsx';
import { loggerService } from '@/services/loggerService.js';

export default function AdminLogsPage() {
  const { hasPermission } = useAdminAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    if (!hasPermission('audit.read')) {
      setLoading(false);
      return;
    }

    const fetchLogs = async () => {
      try {
        setLoading(true);
        let filterParts = [];
        if (levelFilter !== 'all') filterParts.push(`level="${levelFilter}"`);
        if (search) filterParts.push(`message ~ "${search}"`);
        
        const records = await pb.collection('logs').getList(1, 50, {
          sort: '-created',
          filter: filterParts.join(' && '),
          $autoCancel: false
        });
        setLogs(records.items);
      } catch (err) {
        loggerService.error('Error fetching logs', err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchLogs, 300);
    return () => clearTimeout(delay);
  }, [levelFilter, search, hasPermission]);

  const getLevelColor = (level) => {
    switch(level) {
      case 'error': return 'bg-red-100 text-red-700';
      case 'warn': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      case 'debug': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PermissionGuard permission="audit.read" showError>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Registros do Sistema (Logs)</h1>
          <p className="text-sm text-gray-500 mt-1">Monitore atividades, erros e eventos de segurança.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-admin-border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar na mensagem..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="info">Informação</SelectItem>
                <SelectItem value="warn">Aviso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-admin-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-admin-border">
                <tr>
                  <th className="px-6 py-4">Data/Hora</th>
                  <th className="px-6 py-4">Nível</th>
                  <th className="px-6 py-4">Mensagem</th>
                  <th className="px-6 py-4">Usuário ID</th>
                  <th className="px-6 py-4 text-right">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Carregando logs...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">Nenhum log registrado.</td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-gray-500">
                        {new Date(log.created).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-admin-dark truncate max-w-[300px]">
                        {log.message}
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-400">
                        {log.user_id || 'Sistema'}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                          <FileJson className="w-4 h-4 text-admin-gold" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-admin-dark" />
                Detalhes do Log
              </DialogTitle>
            </DialogHeader>
            {selectedLog && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-500 block">ID do Log</span>
                    <span className="text-admin-dark">{selectedLog.id}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-500 block">Nível</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${getLevelColor(selectedLog.level)}`}>
                      {selectedLog.level}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-500 block">Mensagem</span>
                    <span className="text-admin-dark">{selectedLog.message}</span>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-500 block mb-2 text-sm">Contexto (JSON)</span>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                    <pre>{JSON.stringify(selectedLog.context || {}, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PermissionGuard>
  );
}
