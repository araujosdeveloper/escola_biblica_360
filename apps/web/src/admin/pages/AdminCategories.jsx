
import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Plus, Edit2, Trash2, Search, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import CategoryForm from '../components/CategoryForm.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';
import { usePermission } from '@/hooks/usePermission.js';
import PermissionGuard from '@/components/PermissionGuard.jsx';

export default function AdminCategories() {
  const { canRead, canCreate, canUpdate, canDelete } = usePermission('categories');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const records = await pb.collection('categories').getFullList({ 
        sort: 'order,name',
        $autoCancel: false 
      });
      setCategories(records);
    } catch (err) {
      toast.error('Erro ao buscar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchCategories(); 
  }, [canRead]);

  const handleDelete = async () => {
    if (!canDelete) return toast.error('Sem permissão para excluir.');
    if (!deleteId) return;
    try {
      await pb.collection('categories').delete(deleteId, { $autoCancel: false });
      toast.success('Categoria deletada com sucesso');
      fetchCategories();
    } catch (err) {
      toast.error('Erro ao excluir categoria');
    }
  };

  const toggleActive = async (category) => {
    if (!canUpdate) return toast.error('Sem permissão para atualizar.');
    try {
      await pb.collection('categories').update(category.id, { 
        active: !category.active 
      }, { $autoCancel: false });
      toast.success(`Categoria ${!category.active ? 'ativada' : 'desativada'} com sucesso`);
      fetchCategories();
    } catch (err) {
      toast.error('Erro ao alterar status da categoria');
    }
  };

  const openNewForm = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PermissionGuard permission="categories.read" showError>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Categorias</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie as categorias de conteúdo do site.</p>
          </div>
          {canCreate && (
            <Button onClick={openNewForm} className="bg-admin-gold hover:bg-admin-gold/90 text-admin-dark font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Nova Categoria
            </Button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-admin-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-admin-border flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar categorias..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-gray-900 bg-gray-50 border-transparent focus:bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-admin-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Nome</th>
                  <th className="px-6 py-4 font-medium">Descrição</th>
                  <th className="px-6 py-4 font-medium">Cor</th>
                  <th className="px-6 py-4 font-medium">Ordem</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-6 bg-gray-200 rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                      <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                      <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-8 ml-auto"></div></td>
                    </tr>
                  ))
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      Nenhuma categoria encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-admin-dark">{category.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">/{category.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 line-clamp-2 max-w-xs" title={category.description}>
                          {category.description || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" 
                            style={{ backgroundColor: category.color || '#3B82F6' }}
                          />
                          <span className="text-xs text-gray-500 uppercase">{category.color || '#3B82F6'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {category.order || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          category.active !== false 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {category.active !== false ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {category.active !== false ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            {canUpdate && (
                              <>
                                <DropdownMenuItem onClick={() => openEditForm(category)} className="cursor-pointer">
                                  <Edit2 className="w-4 h-4 mr-2 text-gray-500" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleActive(category)} className="cursor-pointer">
                                  {category.active !== false ? (
                                    <><XCircle className="w-4 h-4 mr-2 text-gray-500" /> Desativar</>
                                  ) : (
                                    <><CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> Ativar</>
                                  )}
                                </DropdownMenuItem>
                              </>
                            )}
                            {canDelete && (
                              <DropdownMenuItem onClick={() => setDeleteId(category.id)} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" /> Deletar
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <CategoryForm 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          category={editingCategory}
          onSuccess={fetchCategories}
        />

        <ConfirmDeleteDialog 
          isOpen={!!deleteId} 
          onClose={() => setDeleteId(null)} 
          onConfirm={handleDelete} 
          title="Deletar Categoria" 
          description="Tem certeza que deseja deletar esta categoria? Esta ação não pode ser desfeita." 
        />
      </div>
    </PermissionGuard>
  );
}
