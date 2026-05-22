import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pb from '@/lib/pocketbaseProductionClient.js';

import RichTextEditor from '../components/RichTextEditor.jsx';
import FileUpload from '../components/FileUpload.jsx';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  Globe,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

import { toast } from 'sonner';

const initialState = {
  title: '',
  slug: '',
  category_id: '',
  excerpt: '',
  content: '',
  status: 'draft',
  seo_title: '',
  seo_description: '',
  is_featured: false,
};

export default function AdminPostForm({ mode = 'create' }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  const [featuredImage, setFeaturedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  const generateSlug = (text) => {
    return String(text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await pb
          .collection('categories')
          .getFullList({
            sort: 'name',
            $autoCancel: false,
          });

        setCategories(categoriesData);

        if (isEditMode && id) {
          const post = await pb.collection('posts').getOne(id, {
            $autoCancel: false,
          });

          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            category_id: post.category_id || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            status: post.status || 'draft',
            seo_title: post.seo_title || '',
            seo_description: post.seo_description || '',
            is_featured: Boolean(post.is_featured),
          });

          if (post.featured_image) {
            setCurrentImage(
              pb.files.getUrl(post, post.featured_image)
            );
          }
        }
      } catch (error) {
        toast.error('Erro ao carregar formulário');
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id, isEditMode]);

  const seoTitleCount = useMemo(
    () => formData.seo_title.length,
    [formData.seo_title]
  );

  const seoDescriptionCount = useMemo(
    () => formData.seo_description.length,
    [formData.seo_description]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Informe o título');
      return;
    }

    if (!formData.category_id) {
      toast.error('Selecione uma categoria');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (featuredImage) {
        data.append('featured_image', featuredImage);
      }

      if (isEditMode && id) {
        await pb.collection('posts').update(id, data, {
          $autoCancel: false,
        });

        toast.success('Post atualizado com sucesso');
      } else {
        await pb.collection('posts').create(data, {
          $autoCancel: false,
        });

        toast.success('Post criado com sucesso');
      }

      navigate('/admin/posts');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar post');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-admin-dark" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/posts')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div>
            <h1 className="font-['Poppins'] text-3xl font-bold text-admin-dark">
              {isEditMode ? 'Editar Post' : 'Novo Post'}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Gerencie conteúdo, SEO e publicação.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {isEditMode && formData.slug && (
            <Button asChild variant="outline">
              <a
                href={`/artigo/${formData.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </a>
            </Button>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-admin-dark text-white hover:bg-admin-dark/90"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}

            Salvar Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-admin-gold/10 text-admin-gold">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-['Poppins'] text-lg font-bold text-admin-dark">
                  Conteúdo
                </h2>

                <p className="text-sm text-gray-500">
                  Informações principais do artigo.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Título</Label>

                <Input
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      title: event.target.value,
                      slug:
                        formData.slug ||
                        generateSlug(event.target.value),
                    })
                  }
                  placeholder="Digite o título"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Slug</Label>

                <Input
                  value={formData.slug}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      slug: generateSlug(event.target.value),
                    })
                  }
                  placeholder="url-do-post"
                />
              </div>

              <div className="space-y-2">
                <Label>Resumo</Label>

                <textarea
                  rows={4}
                  value={formData.excerpt}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      excerpt: event.target.value,
                    })
                  }
                  placeholder="Breve descrição do artigo"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Conteúdo</Label>

                <RichTextEditor
                  value={formData.content}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      content: value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-admin-gold/10 text-admin-gold">
                <Globe className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-['Poppins'] text-lg font-bold text-admin-dark">
                  SEO
                </h2>

                <p className="text-sm text-gray-500">
                  Configurações para Google e redes sociais.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>SEO Title</Label>

                  <span
                    className={`text-xs ${
                      seoTitleCount > 60
                        ? 'text-admin-danger'
                        : 'text-gray-500'
                    }`}
                  >
                    {seoTitleCount}/60
                  </span>
                </div>

                <Input
                  value={formData.seo_title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      seo_title: event.target.value,
                    })
                  }
                  placeholder="Título para Google"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>SEO Description</Label>

                  <span
                    className={`text-xs ${
                      seoDescriptionCount > 160
                        ? 'text-admin-danger'
                        : 'text-gray-500'
                    }`}
                  >
                    {seoDescriptionCount}/160
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={formData.seo_description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      seo_description: event.target.value,
                    })
                  }
                  placeholder="Descrição para mecanismos de busca"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-admin-gold focus:ring-2 focus:ring-admin-gold/20"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
            <h3 className="mb-5 border-b border-admin-border pb-3 font-['Poppins'] text-lg font-bold text-admin-dark">
              Publicação
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="draft">
                      Rascunho
                    </SelectItem>

                    <SelectItem value="published">
                      Publicado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>

                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category_id: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-admin-border bg-gray-50 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      is_featured: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-admin-gold"
                />

                <span className="font-medium text-admin-dark">
                  Marcar como destaque
                </span>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-admin-gold/10 text-admin-gold">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-['Poppins'] text-lg font-bold text-admin-dark">
                  Imagem Destacada
                </h3>

                <p className="text-sm text-gray-500">
                  Upload da capa do artigo.
                </p>
              </div>
            </div>

            <FileUpload
              onFileSelect={setFeaturedImage}
              accept="image/*"
              currentFileUrl={currentImage}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}