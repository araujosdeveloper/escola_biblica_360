
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
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
          sort: 'name',
          $autoCancel: false
        });
        setCategories(cats);

        const posts = await pb.collection('posts').getList(1, 5, {
          filter: 'status="published"',
          sort: '-published_at',
          $autoCancel: false
        });
        setRecentPosts(posts.items);
      } catch (error) {
      }
    };

    fetchSidebarData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <aside className="space-y-8">
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 font-['Poppins']">Buscar</h3>
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            placeholder="Pesquisar artigos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-input text-foreground placeholder:text-muted-foreground"
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-accent">
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 font-['Poppins']">Categorias</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/categoria/${category.slug}`}
                className="flex items-center justify-between text-muted-foreground hover:text-accent transition-colors duration-200 py-1"
              >
                <span>{category.name}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 font-['Poppins']">Artigos Recentes</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={post.id} to={`/artigo/${post.slug}`} className="group flex gap-3 items-start">
              {post.featured_image ? (
                <img
                  src={pb.files.getUrl(post, post.featured_image)}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Sem imagem</span>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-card-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 font-['Poppins']">Newsletter</h3>
        <p className="text-sm text-primary-foreground/80 mb-4">Receba nossos últimos estudos e novidades em seu e-mail.</p>
        <NewsletterForm />
      </div>
    </aside>
  );
}
