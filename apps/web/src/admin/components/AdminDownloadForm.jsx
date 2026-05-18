
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';
import FileUpload from './FileUpload.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save, Loader2, ArrowLeft } from 'lucide-react';

export default function AdminDownloadForm({ downloadId = null }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!downloadId);
  const [categories, setCategories] = useState([]);
  
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  
  const [currentFileUrl, setCurrentFileUrl] = useState('');
  const [currentCoverUrl, setCurrentCoverUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    status: 'draft'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await pb.collection('categories').getFullList({ $autoCancel: false });
        setCategories(cats);

        if (downloadId) {
          const dl = await pb.collection('downloads').getOne(downloadId, { $autoCancel: false });
          setFormData({
            title: dl.title || '',
            slug: dl.slug || '',
            description: dl.description || '',
            category: dl.category || '',
            status: dl.status || 'draft'
          });
          if (dl.file) setCurrentFileUrl(pb.files.getUrl(dl, dl.file));
          if (dl.cover_image) setCurrentCoverUrl(pb.files.getUrl(dl, dl.cover_image));
        }
      } catch (err) {
        toast.error('Erro ao carregar dados do formulário');
        if (downloadId) navigate('/admin/downloads');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [downloadId, navigate]);

  const generateSlug = (text) => {
    return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !downloadId ? generateSlug(title) : prev.slug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('O título é obrigatório');
      return;
    }
    if (!downloadId && !file) {
      toast.error('O arquivo para download é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      if (file) data.append('file', file);
      if (coverImage) data.append('cover_image', coverImage);

      if (downloadId) {
        await pb.collection('downloads').update(downloadId, data, { $autoCancel: false });
        toast.success('Download atualizado com sucesso');
      } else {
        await pb.collection('downloads').create(data, { $autoCancel: false });
        toast.success('Download criado com sucesso');
      }
      
      navigate('/admin/downloads');
    } catch (err) {
      toast.error('Erro ao salvar. Verifique se o slug já existe.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-admin-dark" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/downloads')} className="text-gray-500 hover:text-admin-dark">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">
          {downloadId ? 'Editar Download' : 'Novo Download'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Download *</Label>
              <Input 
                id="title" 
                required 
                value={formData.title} 
                onChange={handleTitleChange} 
                className="focus-visible:ring-2 focus-visible:ring-admin-gold outline-none transition-all text-lg py-6" 
                placeholder="Ex: Apostila de Escatologia" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="focus-visible:ring-2 focus-visible:ring-admin-gold outline-none transition-all min-h-[120px]" 
                placeholder="Descreva o conteúdo do material..." 
              />
            </div>

            <div className="space-y-2">
              <Label>Arquivo (PDF, ZIP, etc) {downloadId ? '' : '*'}</Label>
              <FileUpload 
                onFileSelect={setFile} 
                currentFileUrl={currentFileUrl} 
                accept=".pdf,.zip,.rar,.doc,.docx,.ppt,.pptx,.xls,.xlsx" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <h3 className="font-semibold text-admin-dark border-b border-admin-border pb-2">Configurações</h3>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-admin-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Categoria do Material</Label>
              <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-admin-gold">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem categoria</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Slug (URL) *</Label>
              <Input 
                required 
                value={formData.slug} 
                onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                className="focus-visible:ring-2 focus-visible:ring-admin-gold text-sm" 
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-admin-dark hover:bg-admin-dark/90 text-white">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar Download
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <h3 className="font-semibold text-admin-dark border-b border-admin-border pb-2">Capa do Material</h3>
            <div className="space-y-2">
              <Label>Imagem de Capa (Opcional)</Label>
              <FileUpload 
                onFileSelect={setCoverImage} 
                accept="image/*" 
                currentFileUrl={currentCoverUrl} 
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
