
import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO.jsx';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Mic, Users, Baby, Map, Download, Cloud, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CategoryCard from '@/components/CategoryCard.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import NewsletterForm from '@/components/NewsletterForm.jsx';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState.jsx';
import pb from '@/lib/pocketbaseProductionClient.js';

const iconMap = {
  'graduation-cap': GraduationCap,
  'book-open': BookOpen,
  'cloud': Cloud,
  'mic': Mic,
  'users': Users,
  'baby': Baby,
  'map': Map,
  'download': Download
};

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catMap, setCatMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const catsReq = await pb.collection('categories').getFullList({
          filter: 'active=true',
          sort: 'order,name',
          $autoCancel: false
        });
        setCategories(catsReq.slice(0, 6)); 
        
        const map = Object.fromEntries(catsReq.map(c => [c.id, c.name]));
        setCatMap(map);

        const posts = await pb.collection('posts').getList(1, 6, {
          filter: 'status="published"',
          sort: '-published_at',
          expand: 'category_id',
          $autoCancel: false
        });
        setRecentPosts(posts.items);

        const featured = await pb.collection('posts').getList(1, 1, {
          filter: 'status="published" && is_featured=true',
          sort: '-published_at',
          expand: 'category_id',
          $autoCancel: false
        });
        if (featured.items.length > 0) {
          setFeaturedPost(featured.items[0]);
        }
      } catch (error) {
        // Silent failure for production
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <SEO 
        title="Escola Bíblica 360 - Conhecimento Bíblico em Todas as Dimensões" 
        description="Plataforma completa de estudos bíblicos, materiais para EBD, escatologia, sermões e recursos para professores." 
      />

      <Header />

      <section className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1593485589800-579b43749b15" alt="Bíblia aberta e óculos" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
        
        <div className="container relative z-10 text-center py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
              Conhecimento Bíblico em<br />Todas as Dimensões
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Estudos bíblicos, materiais para EBD, escatologia, sermões e recursos para professores e alunos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg transition-all duration-200 active:scale-[0.98]">
                <Link to="/estudos-biblicos">Explorar Estudos</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 font-semibold text-lg transition-all duration-200 active:scale-[0.98]">
                <Link to="/licoes-ebd">Lições EBD</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore nossas categorias</h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-2xl" />)}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || Folder;
                return (
                  <CategoryCard 
                    key={category.id} 
                    icon={IconComponent} 
                    title={category.name} 
                    description={category.description} 
                    path={`/categoria/${category.slug}`} 
                    index={index} 
                  />
                )
              })}
            </div>
          ) : (
            <EmptyState title="Nenhuma categoria disponível" message="Não há categorias cadastradas no momento." />
          )}
        </div>
      </section>

      {featuredPost && (
        <section className="py-24 bg-accent/5">
          <div className="container">
            <div className="bg-gradient-to-br from-accent to-accent/80 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-accent-foreground/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Artigo em Destaque
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">{featuredPost.title}</h2>
                  <p className="text-accent-foreground/90 leading-relaxed mb-6 line-clamp-4">{featuredPost.excerpt}</p>
                  <Button asChild className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 font-semibold transition-all duration-200 active:scale-[0.98]">
                    <Link to={`/artigo/${featuredPost.slug}`}>Ler Artigo Completo</Link>
                  </Button>
                </div>
                <div className="relative h-64 lg:h-full min-h-[300px]">
                  <img src={featuredPost.featured_image ? pb.files.getUrl(featuredPost, featuredPost.featured_image) : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"} alt={featuredPost.title} className="w-full h-full object-cover rounded-2xl shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Artigos Recentes</h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />)}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <ArticleCard 
                  key={post.id} 
                  image={post.featured_image ? pb.files.getUrl(post, post.featured_image) : null}
                  category={post.expand?.category_id?.name || catMap[post.category_id] || 'Artigo'}
                  title={post.title}
                  summary={post.excerpt}
                  date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                  path={`/artigo/${post.slug}`}
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Nenhum artigo publicado" message="Não há artigos publicados no momento." />
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Receba conteúdos bíblicos exclusivos
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">Inscreva-se para receber atualizações, devocionais e novos materiais de estudo diretamente na sua caixa de entrada.</p>
            <div className="bg-card p-8 rounded-2xl mt-8 text-left border border-border/20 shadow-xl max-w-lg mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
