
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';
import RichTextEditor from '../components/RichTextEditor.jsx';
import FileUpload from '../components/FileUpload.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { loggerService } from '@/services/loggerService.js';

export default function AdminPostNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', category_id: '', status: 'draft', excerpt: '', content: '', seo_title: '', seo_description: ''
  });

  useEffect(() => {
    pb.collection('categories').getFullList({ $autoCancel: false })
      .then(setCategories)
      .catch(err => loggerService.error('Failed to fetch categories', err));
  }, []);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('author', pb.authStore.model.id);
      if (file) data.append('featured_image', file);

      await pb.collection('posts').create(data, { $autoCancel: false });
      toast.success('Post criado com sucesso!');
      navigate('/admin/posts');
    } catch (err) {
      toast.error('Erro ao criar post');
      loggerService.error('Failed to create post', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/posts')} className="text-gray-500 hover:text-admin-dark">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Criar Novo Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <div className="space-y-2">
              <Label>Título do Post</Label>
              <Input required value={formData.title} onChange={handleTitleChange} className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all text-lg py-6" placeholder="Digite o título..." />
            </div>
            <div className="space-y-2">
              <Label>Conteúdo</Label>
              <RichTextEditor value={formData.content} onChange={(html) => setFormData({...formData, content: html})} />
            </div>
            <div className="space-y-2">
              <Label>Resumo (Excerpt)</Label>
              <Input value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <h3 className="font-semibold text-admin-dark border-b border-admin-border pb-2">SEO</h3>
            <div className="space-y-2">
              <Label>SEO Title</Label>
              <Input value={formData.seo_title} onChange={(e) => setFormData({...formData, seo_title: e.target.value})} className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <Label>SEO Description</Label>
              <Input value={formData.seo_description} onChange={(e) => setFormData({...formData, seo_description: e.target.value})} className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <h3 className="font-semibold text-admin-dark border-b border-admin-border pb-2">Publicação</h3>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select required value={formData.category_id} onValueChange={(val) => setFormData({...formData, category_id: val})}>
                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all text-sm" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-admin-dark hover:bg-admin-dark/90 text-white">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Salvar Post
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <h3 className="font-semibold text-admin-dark border-b border-admin-border pb-2">Imagem Destacada</h3>
            <FileUpload onFileSelect={setFile} accept="image/*" />
          </div>
        </div>
      </form>
    </div>
  );
}
