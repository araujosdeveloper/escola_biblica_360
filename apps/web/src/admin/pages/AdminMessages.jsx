
import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Eye, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataTable from '../components/DataTable.jsx';
import AdminMessageModal from '../components/AdminMessageModal.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [viewMessage, setViewMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const filterStr = search ? `name ~ "${search}" || email ~ "${search}"` : '';
      const records = await pb.collection('contact_messages').getFullList({ sort: '-created', filter: filterStr, $autoCancel: false });
      setMessages(records);
    } catch (err) {
      toast.error('Erro ao buscar mensagens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchMessages(), 500);
    return () => clearTimeout(delay);
  }, [search]);

  const markAsRead = async (id) => {
    try {
      await pb.collection('contact_messages').update(id, { status: 'read' }, { $autoCancel: false });
      toast.success('Mensagem marcada como lida');
      fetchMessages();
    } catch (err) {
      toast.error('Erro ao atualizar status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await pb.collection('contact_messages').delete(deleteId, { $autoCancel: false });
      toast.success('Mensagem excluída com sucesso');
      fetchMessages();
    } catch (err) {
      toast.error('Erro ao excluir mensagem');
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    { header: 'Nome', accessorKey: 'name', cell: (row) => <span className={`font-medium ${row.status === 'new' ? 'text-admin-dark font-bold' : 'text-gray-700'}`}>{row.name}</span> },
    { header: 'E-mail', accessorKey: 'email' },
    { header: 'Assunto', accessorKey: 'subject' },
    { header: 'Data', accessorKey: 'created', cell: (row) => new Date(row.created).toLocaleDateString('pt-BR') },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'new' ? 'bg-admin-danger/10 text-admin-danger' : 'bg-gray-100 text-gray-600'}`}>
        {row.status === 'new' ? 'Nova' : 'Lida'}
      </span>
    )},
    { header: 'Ações', accessorKey: 'actions', cell: (row) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => setViewMessage(row)}>
          <Eye className="w-4 h-4 text-admin-dark" />
        </Button>
        {row.status === 'new' && (
          <Button variant="ghost" size="sm" onClick={() => markAsRead(row.id)}>
            <CheckCircle className="w-4 h-4 text-admin-success" />
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}>
          <Trash2 className="w-4 h-4 text-admin-danger" />
        </Button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Mensagens de Contato</h1>
      <DataTable 
        columns={columns} 
        data={messages} 
        loading={loading} 
        searchValue={search} 
        onSearchChange={setSearch} 
        searchPlaceholder="Buscar por nome ou e-mail..." 
      />

      <AdminMessageModal 
        isOpen={!!viewMessage} 
        onClose={() => setViewMessage(null)} 
        message={viewMessage} 
      />

      <ConfirmDeleteDialog 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        title="Excluir Mensagem" 
        description="Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita." 
      />
    </div>
  );
}
