
import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO.jsx';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Mic, Users, Baby, Map, Download, Cloud, Folder, ArrowRight } from 'lucide-react';
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
  cloud: Cloud,
  mic: Mic,
  users: Users,
  baby: Baby,
  map: Map,
  download: Download,
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
          $autoCancel: false,
        });

        setCategories(catsReq.slice(0, 6));

        const map = Object.fromEntries(catsReq.map((category) => [category.id, category.name]));
        setCatMap(map);

        const posts = await pb.collection('posts').getList(1, 6, {
          filter: 'status="published"',
          sort: '-published_at',
          expand: 'category_id',
          $autoCancel: false,
        });

        setRecentPosts(posts.items);

        const featured = await pb.collection('posts').getList(1, 1, {
          filter: 'status="published" && is_featured=true',
          sort: '-published_at',
          expand: 'category_id',
          $autoCancel: false,
        });

        if (featured.items.length > 0) {
          setFeaturedPost(featured.items[0]);
        }
      } catch {
        setRecentPosts([]);
        setFeaturedPost(null);
        setCategories([]);
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

      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop"
            alt="Bíblia aberta"
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.15),transparent_30%)]" />
        </div>

        <div className="container relative z-10 min-h-[88vh] flex items-center py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/10 text-accent text-sm font-medium mb-8">
                <BookOpen className="w-4 h-4" />
                Plataforma cristã de estudos bíblicos
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-primary-foreground tracking-tight mb-8">
                Conhecimento bíblico para transformar vidas
              </h1>

              <p className="text-lg md:text-xl text-primary-foreground/75 leading-relaxed mb-10 max-w-xl">
                Estudos bíblicos, EBD, teologia pentecostal, sermões e materiais organizados em uma plataforma moderna e acessível.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold rounded-xl shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link to="/estudos-biblicos">Explorar Estudos</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 border-primary-foreground/20 bg-white/5 backdrop-blur-sm text-primary-foreground hover:bg-white/10 rounded-xl text-base font-semibold transition-all duration-300"
                >
                  <Link to="/downloads">Ver Materiais</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/10 blur-3xl rounded-full" />

                <div className="relative overflow-hidden rounded-[32px] shadow-2xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1974&auto=format&fit=crop"
                    alt="Estudo bíblico"
                    className="w-full h-[620px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                      <p className="text-primary-foreground text-sm mb-2 opacity-80">
                        Destaque da plataforma
                      </p>

                      <h3 className="text-2xl font-bold text-white leading-tight">
                        Estudos profundos para crescimento espiritual e ministerial
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Navegue por áreas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore nossas categorias
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              Encontre estudos, lições e materiais organizados por temas para facilitar sua jornada de aprendizado.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-48 w-full rounded-2xl" />
              ))}
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
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Nenhuma categoria disponível"
              message="Não há categorias cadastradas no momento."
            />
          )}
        </div>
      </section>

      {featuredPost && (
        <section className="relative py-24 overflow-hidden bg-muted/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_30%)]" />

          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 flex"
              >
                <div className="w-full rounded-3xl bg-primary p-8 md:p-10 text-primary-foreground shadow-xl">
                  <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-6">
                    Artigo em Destaque
                  </span>

                  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                    {featuredPost.title}
                  </h2>

                  <p className="text-primary-foreground/75 leading-8 mb-8 line-clamp-5">
                    {featuredPost.excerpt}
                  </p>

                  <Button
                    asChild
                    className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Link to={`/artigo/${featuredPost.slug}`} className="inline-flex items-center gap-2">
                      Ler artigo completo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <Link
                  to={`/artigo/${featuredPost.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
                >
                  <div className="relative h-[360px] md:h-[460px] lg:h-full min-h-[420px] overflow-hidden">
                    <img
                      src={
                        featuredPost.featured_image
                          ? pb.files.getUrl(featuredPost, featuredPost.featured_image)
                          : 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop'
                      }
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-5">
                        <div>
                          <p className="text-white/70 text-sm mb-1">Leitura recomendada</p>
                          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight line-clamp-2">
                            {featuredPost.title}
                          </h3>
                        </div>

                        <span className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              Novos conteúdos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Artigos Recentes
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              Acompanhe os estudos mais recentes publicados na plataforma.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-[400px] w-full rounded-2xl" />
              ))}
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
            <EmptyState
              title="Nenhum artigo publicado"
              message="Não há artigos publicados no momento."
            />
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Receba conteúdos bíblicos exclusivos
            </h2>

            <p className="text-primary-foreground/80 mb-8 text-lg">
              Inscreva-se para receber atualizações, devocionais e novos materiais de estudo diretamente na sua caixa de entrada.
            </p>

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