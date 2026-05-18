
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Plus, Trash2, Edit2, Download as DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataTable from '../components/DataTable.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';
import { usePermission } from '@/hooks/usePermission.js';
import PermissionGuard from '@/components/PermissionGuard.jsx';

export default function AdminDownloads() {
  const { canRead, canCreate, canUpdate, canDelete } = usePermission('downloads');
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  
  const fetchDownloads = async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const filterStr = search ? `title ~ "${search}"` : '';
      const records = await pb.collection('downloads').getFullList({ 
        sort: '-created', 
        filter: filterStr,
        $autoCancel: false 
      });
      setDownloads(records);
    } catch (err) {
      toast.error('Erro ao buscar downloads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchDownloads(); }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, canRead]);

  const handleDelete = async () => {
    if (!canDelete) return toast.error('Sem permissão para excluir.');
    if (!deleteId) return;
    try {
      await pb.collection('downloads').delete(deleteId, { $autoCancel: false });
      toast.success('Excluído com sucesso');
      fetchDownloads();
    } catch (err) {
      toast.error('Erro ao excluir');
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    { header: 'Título', accessorKey: 'title', cell: (row) => <span className="font-medium text-admin-dark">{row.title}</span> },
    { header: 'Categoria', accessorKey: 'category', cell: (row) => row.category || '-' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'published' ? 'bg-admin-success/10 text-admin-success' : 'bg-admin-warning/10 text-admin-warning'}`}>
        {row.status === 'published' ? 'Publicado' : 'Rascunho'}
      </span>
    )},
    { header: 'Ações', accessorKey: 'actions', cell: (row) => {
      const fileUrl = row.file ? pb.files.getUrl(row, row.file) : '#';
      
      return (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" asChild>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <DownloadIcon className="w-4 h-4 text-gray-500" />
            </a>
          </Button>
          {canUpdate && (
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/admin/downloads/edit/${row.id}`}>
                <Edit2 className="w-4 h-4 text-admin-dark" />
              </Link>
            </Button>
          )}
          {canDelete && (
            <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}>
              <Trash2 className="w-4 h-4 text-admin-danger" />
            </Button>
          )}
        </div>
      );
    }}
  ];

  return (
    <PermissionGuard permission="downloads.read" showError>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Downloads</h1>
          {canCreate && (
            <Button asChild className="bg-admin-gold hover:bg-admin-gold/90 text-admin-dark font-semibold">
              <Link to="/admin/downloads/new">
                <Plus className="w-4 h-4 mr-2" /> Novo Download
              </Link>
            </Button>
          )}
        </div>

        <DataTable 
          columns={columns} 
          data={downloads} 
          loading={loading}
          searchValue={search} 
          onSearchChange={setSearch} 
          searchPlaceholder="Buscar por título..." 
        />

        <ConfirmDeleteDialog 
          isOpen={!!deleteId} 
          onClose={() => setDeleteId(null)} 
          onConfirm={handleDelete} 
          title="Excluir Download" 
          description="Tem certeza que deseja excluir este arquivo permanentemente?" 
        />
      </div>
    </PermissionGuard>
  );
}
