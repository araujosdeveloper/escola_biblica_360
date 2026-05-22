
import React, { useEffect, useMemo, useState } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Download, Trash2, Mail, Users, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

      const filters = [];

      if (search.trim()) {
        const safeSearch = search.trim().replaceAll('"', '\\"');
        filters.push(`email ~ "${safeSearch}"`);
      }

      const records = await pb.collection('newsletter_subscribers').getFullList({
        sort: '-created',
        filter: filters.join(' && '),
        $autoCancel: false,
      });

      setSubs(records);
    } catch {
      toast.error('Erro ao buscar assinantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSubs();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const selectedSub = useMemo(() => {
    return subs.find((sub) => sub.id === deleteId);
  }, [subs, deleteId]);

  const stats = useMemo(() => {
    const active = subs.filter((sub) => sub.status === 'active').length;
    const inactive = subs.filter((sub) => sub.status && sub.status !== 'active').length;

    return {
      total: subs.length,
      active,
      inactive,
    };
  }, [subs]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await pb.collection('newsletter_subscribers').delete(deleteId, {
        $autoCancel: false,
      });

      toast.success('Assinante removido');
      fetchSubs();
    } catch {
      toast.error('Erro ao remover assinante');
    } finally {
      setDeleteId(null);
    }
  };

  const exportCSV = () => {
    if (subs.length === 0) {
      toast.error('Não há assinantes para exportar');
      return;
    }

    const rows = [
      ['Email', 'Data de Inscrição', 'Status'],
      ...subs.map((item) => [
        item.email || '',
        new Date(item.created).toLocaleDateString('pt-BR'),
        item.status || '',
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((field) => `"${String(field).replaceAll('"', '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'assinantes_newsletter.csv';
    link.click();

    URL.revokeObjectURL(url);

    toast.success('CSV exportado com sucesso');
  };

  const columns = [
    {
      header: 'E-mail',
      accessorKey: 'email',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-admin-gold/10 text-admin-gold">
            <Mail className="h-4 w-4" />
          </div>

          <span className="font-semibold text-admin-dark">
            {row.email}
          </span>
        </div>
      ),
    },
    {
      header: 'Data de Inscrição',
      accessorKey: 'created',
      cell: (row) => (
        <span className="text-sm text-gray-500">
          {new Date(row.created).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            row.status === 'active'
              ? 'bg-admin-success/10 text-admin-success'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {row.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      ),
    },
    {
      header: 'Ações',
      accessorKey: 'actions',
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDeleteId(row.id)}
          title="Remover assinante"
        >
          <Trash2 className="h-4 w-4 text-admin-danger" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-admin-gold/10 text-admin-gold">
              <Users className="h-6 w-6" />
            </div>

            <div>
              <h1 className="font-['Poppins'] text-2xl font-bold text-admin-dark">
                Newsletter
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Gerencie assinantes e exporte sua lista de contatos.
              </p>
            </div>
          </div>

          <Button
            onClick={exportCSV}
            className="bg-admin-dark text-white hover:bg-admin-dark/90"
            disabled={subs.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
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
              Ativos
            </p>
            <p className="mt-1 text-2xl font-bold text-admin-dark">
              {stats.active}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Inativos
            </p>
            <p className="mt-1 text-2xl font-bold text-admin-dark">
              {stats.inactive}
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
              placeholder="Buscar assinante por e-mail..."
              className="pl-10"
            />
          </div>

          <Button variant="outline" onClick={fetchSubs} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
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
        description={
          selectedSub
            ? `Tem certeza que deseja remover "${selectedSub.email}" da lista de newsletter?`
            : 'Tem certeza que deseja remover este e-mail da lista de newsletter?'
        }
      />
    </div>
  );
}