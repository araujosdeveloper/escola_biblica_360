
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  FileText,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const fetchPosts = async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const catsReq = await pb.collection('categories').getFullList({
        sort: 'name',
        $autoCancel: false,
      });

      const map = Object.fromEntries(catsReq.map((category) => [category.id, category.name]));
      setCatMap(map);

      const filters = [];

      if (search.trim()) {
        const safeSearch = search.trim().replaceAll('"', '\\"');
        filters.push(`title ~ "${safeSearch}"`);
      }

      if (statusFilter !== 'all') {
        filters.push(`status="${statusFilter}"`);
      }

      const filterStr = filters.join(' && ');

      const records = await pb.collection('posts').getFullList({
        sort: '-created',
        filter: filterStr,
        expand: 'category_id',
        $autoCancel: false,
      });

      setPosts(records);
    } catch {
      toast.error('Erro ao buscar posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPosts();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, statusFilter, canRead]);

  const handleDelete = async () => {
    if (!canDelete) {
      toast.error('Sem permissão para excluir.');
      return;
    }

    if (!deleteId) return;

    try {
      await pb.collection('posts').delete(deleteId, { $autoCancel: false });
      toast.success('Post excluído com sucesso');
      fetchPosts();
    } catch {
      toast.error('Erro ao excluir post');
    } finally {
      setDeleteId(null);
    }
  };

  const selectedPost = useMemo(() => {
    return posts.find((post) => post.id === deleteId);
  }, [posts, deleteId]);

  const stats = useMemo(() => {
    const published = posts.filter((post) => post.status === 'published').length;
    const draft = posts.filter((post) => post.status !== 'published').length;

    return {
      total: posts.length,
      published,
      draft,
    };
  }, [posts]);

  const columns = [
    {
      header: 'Título',
      accessorKey: 'title',
      cell: (row) => (
        <div>
          <p className="font-semibold text-admin-dark line-clamp-1">
            {row.title}
          </p>
          <p className="mt-1 text-xs text-gray-500 line-clamp-1">
            /artigo/{row.slug}
          </p>
        </div>
      ),
    },
    {
      header: 'Categoria',
      accessorKey: 'category',
      cell: (row) => (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {row.expand?.category_id?.name || catMap[row.category_id] || 'Sem categoria'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            row.status === 'published'
              ? 'bg-admin-success/10 text-admin-success'
              : 'bg-admin-warning/10 text-admin-warning'
          }`}
        >
          {row.status === 'published' ? 'Publicado' : 'Rascunho'}
        </span>
      ),
    },
    {
      header: 'Data',
      accessorKey: 'created',
      cell: (row) => (
        <span className="text-sm text-gray-500">
          {new Date(row.created).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      header: 'Ações',
      accessorKey: 'actions',
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild title="Visualizar">
            <Link to={`/artigo/${row.slug}`} target="_blank">
              <Eye className="h-4 w-4 text-gray-500" />
            </Link>
          </Button>

          {canUpdate && (
            <Button variant="ghost" size="sm" asChild title="Editar">
              <Link to={`/admin/posts/edit/${row.id}`}>
                <Edit2 className="h-4 w-4 text-admin-dark" />
              </Link>
            </Button>
          )}

          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteId(row.id)}
              title="Excluir"
            >
              <Trash2 className="h-4 w-4 text-admin-danger" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PermissionGuard permission="posts.read" showError>
      <div className="space-y-6">
        <div className="rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-admin-gold/10 text-admin-gold">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h1 className="font-['Poppins'] text-2xl font-bold text-admin-dark">
                  Gerenciar Posts
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Crie, edite, publique e organize os artigos do portal.
                </p>
              </div>
            </div>

            {canCreate && (
              <Button
                asChild
                className="bg-admin-gold font-semibold text-admin-dark hover:bg-admin-gold/90"
              >
                <Link to="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Post
                </Link>
              </Button>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-admin-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Total
              </p>
              <p className="mt-1 text-2xl font-bold text-admin-dark">
                {stats.total}
              </p>
            </div>

            <div className="rounded-2xl bg-admin-success/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-admin-success">
                Publicados
              </p>
              <p className="mt-1 text-2xl font-bold text-admin-dark">
                {stats.published}
              </p>
            </div>

            <div className="rounded-2xl bg-admin-warning/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-admin-warning">
                Rascunhos
              </p>
              <p className="mt-1 text-2xl font-bold text-admin-dark">
                {stats.draft}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-admin-border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar posts por título..."
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'bg-admin-dark text-white hover:bg-admin-dark/90' : ''}
              >
                <Filter className="mr-2 h-4 w-4" />
                Todos
              </Button>

              <Button
                variant={statusFilter === 'published' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('published')}
                className={statusFilter === 'published' ? 'bg-admin-success text-white hover:bg-admin-success/90' : ''}
              >
                Publicados
              </Button>

              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('draft')}
                className={statusFilter === 'draft' ? 'bg-admin-warning text-white hover:bg-admin-warning/90' : ''}
              >
                Rascunhos
              </Button>

              <Button variant="outline" onClick={fetchPosts} disabled={loading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>
          </div>
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
          description={
            selectedPost
              ? `Tem certeza que deseja excluir o post "${selectedPost.title}"? Esta ação não pode ser desfeita.`
              : 'Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.'
          }
        />
      </div>
    </PermissionGuard>
  );
}