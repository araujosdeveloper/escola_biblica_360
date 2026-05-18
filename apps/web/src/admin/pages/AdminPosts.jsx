
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataTable from '../components/DataTable.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';
import { usePermission } from '@/hooks/usePermission.js';
import PermissionGuard from '@/components/PermissionGuard.jsx';

export default function AdminPosts() {
  const { canRead, canCreate, canUpdate, canDelete } = usePermission('posts');
  const [posts, setPosts] = useState([]);
  const [catMap, setCatMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchPosts = async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      
      const catsReq = await pb.collection('categories').getFullList({ $autoCancel: false });
      const map = Object.fromEntries(catsReq.map(c => [c.id, c.name]));
      setCatMap(map);

      const filterStr = search ? `title ~ "${search}"` : '';
      const records = await pb.collection('posts').getFullList({
        sort: '-created',
        filter: filterStr,
        $autoCancel: false,
      });
      setPosts(records);
    } catch (err) {
      toast.error('Erro ao buscar posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchPosts(); }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, canRead]);

  const handleDelete = async () => {
    if (!canDelete) return toast.error('Sem permissão para excluir.');
    if (!deleteId) return;
    try {
      await pb.collection('posts').delete(deleteId, { $autoCancel: false });
      toast.success('Post excluído com sucesso');
      fetchPosts();
    } catch (err) {
      toast.error('Erro ao excluir post');
    } finally {
      setDeleteId(null);
    }
  };

  const columns = [
    { header: 'Título', accessorKey: 'title', cell: (row) => <span className="font-medium text-admin-dark">{row.title}</span> },
    { header: 'Categoria', accessorKey: 'category', cell: (row) => catMap[row.category_id] || '-' },
    { header: 'Data', accessorKey: 'created', cell: (row) => new Date(row.created).toLocaleDateString('pt-BR') },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'published' ? 'bg-admin-success/10 text-admin-success' : 'bg-admin-warning/10 text-admin-warning'}`}>
        {row.status === 'published' ? 'Publicado' : 'Rascunho'}
      </span>
    )},
    { header: 'Ações', accessorKey: 'actions', cell: (row) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" asChild><Link to={`/artigo/${row.slug}`} target="_blank"><Eye className="w-4 h-4 text-gray-500" /></Link></Button>
        {canUpdate && <Button variant="ghost" size="sm" asChild><Link to={`/admin/posts/edit/${row.id}`}><Edit2 className="w-4 h-4 text-admin-dark" /></Link></Button>}
        {canDelete && <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}><Trash2 className="w-4 h-4 text-admin-danger" /></Button>}
      </div>
    )}
  ];

  return (
    <PermissionGuard permission="posts.read" showError>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Gerenciar Posts</h1>
          {canCreate && (
            <Link to="/admin/posts/new">
              <Button className="bg-admin-gold hover:bg-admin-gold/90 text-admin-dark font-semibold">
                <Plus className="w-4 h-4 mr-2" /> Novo Post
              </Button>
            </Link>
          )}
        </div>

        <DataTable 
          columns={columns} 
          data={posts} 
          loading={loading} 
          searchValue={search} 
          onSearchChange={setSearch} 
          searchPlaceholder="Buscar posts por título..." 
        />

        <ConfirmDeleteDialog 
          isOpen={!!deleteId} 
          onClose={() => setDeleteId(null)} 
          onConfirm={handleDelete} 
          title="Excluir Post" 
          description="Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita." 
        />
      </div>
    </PermissionGuard>
  );
}
