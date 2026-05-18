
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Upload, FileText, FileBox, Trash2, Search, Link as LinkIcon, Loader2, PlaySquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { loggerService } from '@/services/loggerService.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePermission } from '@/hooks/usePermission.js';
import PermissionGuard from '@/components/PermissionGuard.jsx';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.jsx';

export default function MediaLibraryPage() {
  const { canRead, canCreate, canDelete } = usePermission('media');
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deleteItem, setDeleteItem] = useState(null);

  const fetchMedia = async () => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      let filterParts = [];
      if (searchTerm) filterParts.push(`filename ~ "${searchTerm}"`);
      if (typeFilter !== 'all') filterParts.push(`file_type="${typeFilter}"`);

      const records = await pb.collection('media_library').getList(1, 40, {
        sort: '-created',
        filter: filterParts.join(' && '),
        $autoCancel: false
      });
      setMedia(records.items);
    } catch (error) {
      toast.error('Erro ao carregar mídia');
      loggerService.error('Failed to fetch media', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchMedia, 500);
    return () => clearTimeout(delay);
  }, [searchTerm, typeFilter, canRead]);

  const handleFileUpload = async (e) => {
    if (!canCreate) return toast.error('Sem permissão para upload.');
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    for (const file of files) {
      if (file.size > 20971520) {
        toast.error(`O arquivo ${file.name} excede o limite de 20MB.`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', file.name);
        
        let type = 'document';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'pdf';
        
        formData.append('file_type', type);
        formData.append('file_size', file.size);
        formData.append('uploaded_by', pb.authStore.model.id);

        const record = await pb.collection('media_library').create(formData, { $autoCancel: false });
        loggerService.logAudit('upload', 'media_library', record.id, { filename: file.name, type });
        toast.success(`Upload de ${file.name} concluído!`);
      } catch (err) {
        toast.error(`Falha no upload do arquivo ${file.name}`);
        loggerService.error(`Upload failed for ${file.name}`, err);
      }
    }
    setUploading(false);
    fetchMedia();
  };

  const handleDeleteConfirm = async () => {
    if (!canDelete) return toast.error('Sem permissão para excluir.');
    if (!deleteItem) return;
    
    try {
      await pb.collection('media_library').delete(deleteItem.id, { $autoCancel: false });
      loggerService.logAudit('delete', 'media_library', deleteItem.id, { filename: deleteItem.filename });
      toast.success('Arquivo excluído com sucesso');
      fetchMedia();
    } catch (error) {
      toast.error('Erro ao excluir arquivo');
    } finally {
      setDeleteItem(null);
    }
  };

  const copyUrl = (record) => {
    const url = pb.files.getUrl(record, record.file);
    navigator.clipboard.writeText(url);
    toast.success('URL copiada para a área de transferência');
  };

  return (
    <PermissionGuard permission="media.read" showError>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Gerenciador de Mídia</h1>
            <p className="text-sm text-gray-500 mt-1">Faça upload e gerencie imagens, PDFs e vídeos.</p>
          </div>
          
          {canCreate && (
            <div className="relative">
              <Input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                multiple 
                onChange={handleFileUpload} 
                accept="image/*,application/pdf,video/*,.doc,.docx,.xls,.xlsx" 
              />
              <Button asChild disabled={uploading} className="bg-admin-dark hover:bg-admin-dark/90 text-white cursor-pointer px-6">
                <label htmlFor="file-upload">
                  {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  {uploading ? 'Enviando...' : 'Fazer Upload'}
                </label>
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-admin-border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar por nome do arquivo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de arquivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="image">Imagens</SelectItem>
                <SelectItem value="pdf">PDFs</SelectItem>
                <SelectItem value="video">Vídeos</SelectItem>
                <SelectItem value="document">Documentos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-admin-dark mb-4" />
            <p>Carregando biblioteca...</p>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-admin-border shadow-sm border-dashed">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileBox className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-admin-dark mb-2">Nenhuma mídia cadastrada</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">Arraste arquivos para cá ou use o botão de upload para adicionar mídias.</p>
            {canCreate && (
              <Button asChild variant="outline" className="cursor-pointer">
                <label htmlFor="file-upload">Selecionar Arquivos</label>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {media.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-admin-border overflow-hidden group shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="aspect-square bg-gray-50/50 flex items-center justify-center relative overflow-hidden">
                  {item.file_type === 'image' ? (
                    <img 
                      src={pb.files.getUrl(item, item.file)} 
                      alt={item.filename} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : item.file_type === 'video' ? (
                    <PlaySquare className="w-12 h-12 text-gray-400" />
                  ) : item.file_type === 'pdf' ? (
                    <FileText className="w-12 h-12 text-red-400" />
                  ) : (
                    <FileBox className="w-12 h-12 text-blue-400" />
                  )}
                  
                  <div className="absolute inset-0 bg-admin-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button size="icon" variant="secondary" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 border-0 text-white" onClick={() => copyUrl(item)} title="Copiar URL">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    {canDelete && (
                      <Button size="icon" variant="destructive" className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 border-0 text-white" onClick={() => setDeleteItem(item)} title="Excluir permanentemente">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-3 border-t border-admin-border flex-1 flex flex-col justify-between">
                  <p className="text-sm font-semibold text-admin-dark truncate" title={item.filename}>{item.filename}</p>
                  <div className="flex justify-between items-center mt-2 text-[11px] text-gray-500 font-medium">
                    <span className="uppercase tracking-wider px-2 py-0.5 bg-gray-100 rounded">{item.file_type}</span>
                    <span>{(item.file_size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmDeleteDialog 
          isOpen={!!deleteItem} 
          onClose={() => setDeleteItem(null)} 
          onConfirm={handleDeleteConfirm} 
          title="Excluir Mídia" 
          description={`Tem certeza que deseja excluir "${deleteItem?.filename}"? Esta ação não pode ser desfeita.`} 
        />
      </div>
    </PermissionGuard>
  );
}
