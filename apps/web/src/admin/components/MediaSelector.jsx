
import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function MediaSelector({ isOpen, onClose, onSelect, type = 'image' }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, searchTerm]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      let filterParts = [`file_type="${type}"`];
      if (searchTerm) filterParts.push(`filename ~ "${searchTerm}"`);

      const records = await pb.collection('media_library').getList(1, 20, {
        sort: '-created',
        filter: filterParts.join(' && '),
        $autoCancel: false
      });
      setMedia(records.items);
    } catch (error) {
      toast.error('Erro ao carregar mídia');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 20971520) {
      return toast.error('O arquivo excede o limite de 20MB.');
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      formData.append('file_type', type);
      formData.append('file_size', file.size);
      formData.append('uploaded_by', pb.authStore.model?.id);

      const record = await pb.collection('media_library').create(formData, { $autoCancel: false });
      toast.success('Upload concluído!');
      fetchMedia();
      setSelectedItem(record);
    } catch (err) {
      toast.error('Falha no upload');
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedItem) {
      const url = pb.files.getUrl(selectedItem, selectedItem.file);
      onSelect({ url, id: selectedItem.id, filename: selectedItem.filename });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Selecionar Mídia</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="upload">Fazer Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="flex-1 flex flex-col overflow-hidden mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar arquivos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-admin-dark" />
                </div>
              ) : media.length === 0 ? (
                <div className="text-center py-12 text-gray-500">Nenhuma mídia encontrada.</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {media.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className={`relative aspect-square rounded-lg border-2 cursor-pointer overflow-hidden transition-all ${
                        selectedItem?.id === item.id ? 'border-admin-gold ring-2 ring-admin-gold/50' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={pb.files.getUrl(item, item.file)} 
                        alt={item.filename} 
                        className="w-full h-full object-cover"
                      />
                      {selectedItem?.id === item.id && (
                        <div className="absolute top-2 right-2 bg-admin-gold text-white rounded-full">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="flex-1 flex flex-col items-center justify-center mt-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Arraste arquivos ou clique para selecionar</h3>
              <p className="text-sm text-gray-500 mb-6">Tamanho máximo: 20MB</p>
              <div className="relative">
                <Input 
                  type="file" 
                  className="hidden" 
                  id="media-upload" 
                  onChange={handleUpload}
                  accept={type === 'image' ? 'image/*' : '*/*'}
                />
                <Button asChild disabled={uploading}>
                  <label htmlFor="media-upload" className="cursor-pointer">
                    {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    {uploading ? 'Enviando...' : 'Selecionar Arquivo'}
                  </label>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t flex justify-end gap-3 mt-auto">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleConfirm} disabled={!selectedItem} className="bg-admin-dark text-white">
            Confirmar Seleção
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
