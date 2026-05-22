
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  BookOpen,
  Mail,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NewsletterForm from './NewsletterForm.jsx';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const cats = await pb.collection('categories').getFullList({
          filter: 'active=true',
          sort: 'order,name',
          $autoCancel: false,
        });

        setCategories(cats.slice(0, 8));

        const posts = await pb.collection('posts').getList(1, 5, {
          filter: 'status="published"',
          sort: '-published_at',
          expand: 'category_id',
          $autoCancel: false,
        });

        setRecentPosts(posts.items);
      } catch {
        setCategories([]);
        setRecentPosts([]);
      }
    };

    fetchSidebarData();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/busca?q=${encodeURIComponent(query)}`);
  };

  return (
    <aside className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div className="border-b border-border/70 bg-muted/40 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Search className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-['Poppins'] text-lg font-bold text-card-foreground">
                Buscar
              </h3>
              <p className="text-xs text-muted-foreground">
                Encontre estudos e materiais
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Pesquisar artigos..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-11 rounded-2xl bg-input pr-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent"
            />

            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-9 w-9 rounded-xl text-muted-foreground hover:text-accent"
              aria-label="Pesquisar"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div className="border-b border-border/70 bg-muted/40 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-['Poppins'] text-lg font-bold text-card-foreground">
                Categorias
              </h3>
              <p className="text-xs text-muted-foreground">
                Navegue por temas
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {categories.length > 0 ? (
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/categoria/${category.slug}`}
                    className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                  >
                    <span className="font-medium">{category.name}</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-2 py-4 text-sm text-muted-foreground">
              Nenhuma categoria disponível no momento.
            </p>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div className="border-b border-border/70 bg-muted/40 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-['Poppins'] text-lg font-bold text-card-foreground">
                Artigos Recentes
              </h3>
              <p className="text-xs text-muted-foreground">
                Últimas publicações
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {recentPosts.length > 0 ? (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/artigo/${post.slug}`}
                  className="group flex gap-3 rounded-2xl p-2 transition-all hover:bg-muted"
                >
                  {post.featured_image ? (
                    <img
                      src={pb.files.getUrl(post, post.featured_image)}
                      alt={post.title}
                      loading="lazy"
                      className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-muted">
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-card-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h4>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-2 py-4 text-sm text-muted-foreground">
              Nenhum artigo publicado ainda.
            </p>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%)]" />

        <div className="relative z-10">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Mail className="h-5 w-5" />
          </div>

          <h3 className="mb-2 font-['Poppins'] text-xl font-bold">
            Receba novos estudos
          </h3>

          <p className="mb-5 text-sm leading-7 text-primary-foreground/75">
            Cadastre seu e-mail para receber atualizações e materiais bíblicos.
          </p>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </aside>
  );
}