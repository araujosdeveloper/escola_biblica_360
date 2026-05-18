
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { Plus, Search, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { loggerService } from '@/services/loggerService.js';
import { usePermission } from '@/hooks/usePermission.js';
import PermissionGuard from '@/components/PermissionGuard.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';

export default function AdminUsersPage() {
  const { currentAdmin } = useAdminAuth();
  const { canRead, canCreate, canUpdate, canDelete } = usePermission('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'editor', active: true });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const records = await pb.collection('admin_users').getList(1, 50, {
        filter: searchTerm ? `name ~ "${searchTerm}" || email ~ "${searchTerm}"` : '',
        sort: '-created',
        $autoCancel: false
      });
      setUsers(records.items);
    } catch (err) {
      toast.error('Erro ao carregar usuários.');
      loggerService.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    const delay = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, canRead]);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: '', role: user.role, active: user.active !== false });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '', role: 'editor', active: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        if (!canUpdate) return toast.error('Sem permissão para atualizar.');
        if (editingUser.id === currentAdmin.id && formData.role !== currentAdmin.role) {
          return toast.error('Você não pode alterar seu próprio nível de acesso.');
        }
        
        const data = { ...formData };
        if (!data.password) delete data.password;

        await pb.collection('admin_users').update(editingUser.id, data, { $autoCancel: false });
        loggerService.logAudit('update', 'admin_users', editingUser.id, { email: formData.email });
        toast.success('Usuário atualizado com sucesso.');
      } else {
        if (!canCreate) return toast.error('Sem permissão para criar.');
        if (!formData.password) return toast.error('A senha é obrigatória para novos usuários.');
        await pb.collection('admin_users').create({
          ...formData,
          passwordConfirm: formData.password
        }, { $autoCancel: false });
        loggerService.logAudit('create', 'admin_users', null, { email: formData.email });
        toast.success('Usuário criado com sucesso.');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Erro ao salvar usuário.');
      loggerService.error('Failed to save user', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!canDelete) return toast.error('Sem permissão para excluir.');
    if (!deleteUser) return;
    
    try {
      await pb.collection('admin_users').delete(deleteUser.id, { $autoCancel: false });
      loggerService.logAudit('delete', 'admin_users', deleteUser.id, { name: deleteUser.name });
      toast.success('Usuário excluído com sucesso.');
      fetchUsers();
    } catch (error) {
      toast.error('Erro ao excluir usuário.');
    } finally {
      setDeleteUser(null);
    }
  };

  return (
    <PermissionGuard permission="users.read" showError>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Usuários do Sistema</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie acessos e permissões administrativas.</p>
          </div>
          {canCreate && (
            <Button onClick={() => handleOpenModal()} className="bg-admin-dark text-white hover:bg-admin-dark/90">
              <Plus className="w-4 h-4 mr-2" /> Novo Usuário
            </Button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-admin-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-admin-border bg-gray-50/50">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar por nome ou email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-admin-border">
                <tr>
                  <th className="px-6 py-4">Usuário</th>
                  <th className="px-6 py-4">Função</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Último Login</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Carregando usuários...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">Nenhum usuário encontrado.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-admin-gold/20 text-admin-gold rounded-full flex items-center justify-center font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-admin-dark">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                          user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'editor' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${user.active !== false ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {user.active !== false ? 'Ativo' : 'Inativo'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {user.last_login ? new Date(user.last_login).toLocaleDateString('pt-BR') : 'Nunca'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {canUpdate && (
                          <Button variant="ghost" size="icon" onClick={() => handleOpenModal(user)}>
                            <Edit2 className="w-4 h-4 text-gray-500" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button variant="ghost" size="icon" onClick={() => setDeleteUser(user)} disabled={user.id === currentAdmin.id}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{editingUser ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}</Label>
                <Input id="password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required={!editingUser} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Nível de Acesso</Label>
                <Select value={formData.role} onValueChange={v => setFormData({...formData, role: v})} disabled={editingUser?.id === currentAdmin.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="active" className="cursor-pointer">Conta Ativa</Label>
                <Switch id="active" checked={formData.active} onCheckedChange={c => setFormData({...formData, active: c})} disabled={editingUser?.id === currentAdmin.id} />
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-admin-dark text-white">Salvar Usuário</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <ConfirmDeleteDialog 
          isOpen={!!deleteUser} 
          onClose={() => setDeleteUser(null)} 
          onConfirm={handleDeleteConfirm} 
          title="Excluir Usuário" 
          description={`Tem certeza que deseja excluir o usuário ${deleteUser?.name}? Esta ação não pode ser desfeita.`} 
        />
      </div>
    </PermissionGuard>
  );
}
