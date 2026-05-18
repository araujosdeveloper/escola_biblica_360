
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';
import RichTextEditor from '../components/RichTextEditor.jsx';
import FileUpload from '../components/FileUpload.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function AdminPostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '', slug: '', category_id: '', status: 'draft', excerpt: '', content: '', seo_title: '', seo_description: ''
  });

  useEffect(() => {
    Promise.all([
      pb.collection('categories').getFullList({ $autoCancel: false }),
      pb.collection('posts').getOne(id, { $autoCancel: false })
    ]).then(([cats, post]) => {
      setCategories(cats);
      setFormData({
        title: post.title, slug: post.slug, category_id: post.category_id, status: post.status,
        excerpt: post.excerpt || '', content: post.content || '', seo_title: post.seo_title || '', seo_description: post.seo_description || ''
      });
      if (post.featured_image) {
        setCurrentImage(pb.files.getUrl(post, post.featured_image));
      }
    }).catch(() => {
      toast.error('Erro ao carregar post');
      navigate('/admin/posts');
    }).finally(() => setInitialLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (file) data.append('featured_image', file);

      await pb.collection('posts').update(id, data, { $autoCancel: false });
      toast.success('Post atualizado com sucesso!');
      navigate('/admin/posts');
    } catch (err) {
      toast.error('Erro ao atualizar post');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-admin-dark" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/posts')} className="text-gray-500 hover:text-admin-dark">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Editar Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <div className="space-y-2">
              <Label>Título do Post</Label>
              <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all text-lg py-6" />
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
              Salvar Alterações
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-admin-border p-6 space-y-6">
            <h3 className="font-semibold text-admin-dark border-b border-admin-border pb-2">Imagem Destacada</h3>
            <FileUpload onFileSelect={setFile} accept="image/*" currentFileUrl={currentImage} />
          </div>
        </div>
      </form>
    </div>
  );
}
