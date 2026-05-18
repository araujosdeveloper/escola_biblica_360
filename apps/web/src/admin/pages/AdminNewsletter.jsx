
import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataTable from '../components/DataTable.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  
  const fetchSubs = async () => {
    try {
      setLoading(true);
      const filterStr = search ? `email ~ "${search}"` : '';
      const records = await pb.collection('newsletter_subscribers').getFullList({ sort: '-created', filter: filterStr, $autoCancel: false });
      setSubs(records);
    } catch (err) {
      toast.error('Erro ao buscar assinantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchSubs(), 500);
    return () => clearTimeout(delay);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await pb.collection('newsletter_subscribers').delete(deleteId, { $autoCancel: false });
      toast.success('Assinante removido');
      fetchSubs();
    } catch (err) {
      toast.error('Erro ao remover');
    } finally {
      setDeleteId(null);
    }
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Data de Inscrição,Status\n"
      + subs.map(e => `${e.email},${new Date(e.created).toLocaleDateString('pt-BR')},${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assinantes_newsletter.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { header: 'E-mail', accessorKey: 'email', cell: (row) => <span className="font-medium text-admin-dark">{row.email}</span> },
    { header: 'Data de Inscrição', accessorKey: 'created', cell: (row) => new Date(row.created).toLocaleDateString('pt-BR') },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'active' ? 'bg-admin-success/10 text-admin-success' : 'bg-gray-100 text-gray-600'}`}>
        {row.status === 'active' ? 'Ativo' : 'Inativo'}
      </span>
    )},
    { header: 'Ações', accessorKey: 'actions', cell: (row) => (
      <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 className="w-4 h-4 text-admin-danger" /></Button>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Newsletter</h1>
          <p className="text-sm text-gray-500 mt-1">Total de {subs.length} assinantes</p>
        </div>
        <Button onClick={exportCSV} className="bg-admin-dark hover:bg-admin-dark/90 text-white">
          <Download className="w-4 h-4 mr-2" /> Exportar CSV
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={subs} 
        loading={loading} 
        searchValue={search} 
        onSearchChange={setSearch} 
        searchPlaceholder="Buscar por e-mail..." 
      />

      <ConfirmDeleteDialog 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        title="Remover Assinante" 
        description="Tem certeza que deseja remover este e-mail da lista de newsletter?" 
      />
    </div>
  );
}
