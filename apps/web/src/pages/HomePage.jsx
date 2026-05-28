import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO.jsx';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Baby,
  BookOpen,
  CheckCircle2,
  Cloud,
  Download,
  Folder,
  GraduationCap,
  HeartHandshake,
  Lamp,
  Map,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
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

const highlightCards = [
  {
    icon: BookOpen,
    title: 'Estudos Bíblicos',
    description: 'Conteúdos organizados para aprofundar seu conhecimento da Palavra.',
    path: '/estudos-biblicos',
  },
  {
    icon: GraduationCap,
    title: 'Lições para EBD',
    description: 'Materiais úteis para professores, alunos e líderes cristãos.',
    path: '/licoes-ebd',
  },
  {
    icon: Download,
    title: 'Downloads',
    description: 'Apostilas, arquivos e recursos para apoiar seus estudos.',
    path: '/downloads',
  },
];

const platformSteps = [
  {
    icon: Search,
    title: 'Escolha um tema',
    description: 'Navegue por estudos, EBD, sermões, escatologia, infantil e materiais para professores.',
  },
  {
    icon: BookOpen,
    title: 'Estude com clareza',
    description: 'Leia conteúdos organizados para edificação espiritual, ensino cristão e crescimento na fé.',
  },
  {
    icon: Download,
    title: 'Baixe materiais',
    description: 'Use apostilas e arquivos de apoio para aulas, reuniões, discipulado e estudos em grupo.',
  },
  {
    icon: HeartHandshake,
    title: 'Compartilhe a Palavra',
    description: 'Leve conhecimento bíblico para sua família, classe, igreja e comunidade.',
  },
];

const stats = [
  {
    value: '360°',
    label: 'Visão completa',
  },
  {
    value: 'EBD',
    label: 'Ensino bíblico',
  },
  {
    value: 'Fé',
    label: 'Edificação diária',
  },
];

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

      <section className="relative overflow-hidden bg-[#070d14] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(135deg,#05080d_0%,#0a1724_32%,#102f45_68%,#05080d_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,transparent_20%,transparent_72%,rgba(212,175,55,0.12)_100%)]" />
          <div className="absolute left-[-12%] top-[-22%] h-[560px] w-[560px] rounded-full bg-[#d4af37]/12 blur-3xl" />
          <div className="absolute bottom-[-24%] right-[-10%] h-[620px] w-[620px] rounded-full bg-[#3d789e]/16 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:76px_76px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 min-h-[780px] py-24 lg:py-28">
          <div className="grid min-h-[620px] grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-3xl lg:col-span-7"
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-sm font-semibold text-[#f6d66b] shadow-lg shadow-black/10 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Plataforma cristã para estudo, ensino e edificação
              </div>

              <h1 className="mb-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                Conhecimento Bíblico para uma Vida Transformada
              </h1>

              <p className="mb-10 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-md md:text-xl">
                Estudos bíblicos, lições de EBD, sermões, downloads e materiais cristãos
                organizados para fortalecer sua fé e apoiar o ensino da Palavra.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  className="h-14 rounded-xl bg-[#d4af37] px-8 text-base font-bold text-[#08131d] shadow-xl shadow-[#d4af37]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#e7c65b]"
                >
                  <Link to="/estudos-biblicos">
                    Começar Estudos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-xl border-white/20 bg-white/[0.08] px-8 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/[0.14]"
                >
                  <Link to="/downloads">Ver Materiais</Link>
                </Button>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.value}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur"
                  >
                    <p className="text-3xl font-extrabold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-white/75">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="hidden lg:col-span-5 lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-[#d4af37]/10 blur-3xl" />

                <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">
                  <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-[#d4af37]/30" />
                  <div className="absolute right-14 top-14 h-16 w-16 rounded-full border border-white/20" />

                  <div className="relative rounded-[28px] border border-white/12 bg-gradient-to-br from-white/[0.12] to-white/[0.04] p-8">
                    <div className="mb-10 flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d4af37] text-[#08131d] shadow-xl shadow-[#d4af37]/20">
                        <BookOpen className="h-8 w-8" />
                      </div>

                      <span className="rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white/80">
                        EB360
                      </span>
                    </div>

                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#f6d66b]">
                      Palavra que ilumina
                    </p>

                    <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white">
                      Cresça na graça e no conhecimento.
                    </h2>

                    <p className="mb-8 leading-8 text-white/78">
                      Uma plataforma para estudar, ensinar e compartilhar conteúdos bíblicos
                      com beleza, organização e propósito.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#f6d66b]">
                          <Lamp className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-bold text-white">Ensino com clareza</p>
                          <p className="text-sm text-white/60">Conteúdo bíblico organizado por tema.</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#f6d66b]">
                          <ShieldCheck className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-bold text-white">Base cristã sólida</p>
                          <p className="text-sm text-white/60">Estudos para edificação e serviço.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 rounded-3xl border border-white/12 bg-white p-5 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2f45] text-[#d4af37]">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Conteúdo com propósito</p>
                      <p className="text-lg font-extrabold text-[#0f2f45]">Fé, ensino e prática</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative z-20 -mb-40 mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {highlightCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 + index * 0.08 }}
                >
                  <Link
                    to={card.path}
                    className="group block h-full rounded-2xl border border-border/60 bg-white p-6 shadow-2xl shadow-[#0f2f45]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2f45] text-[#d4af37] transition-colors duration-300 group-hover:bg-[#d4af37] group-hover:text-[#0f2f45]">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="mb-2 text-xl font-extrabold text-[#0f2f45]">
                      {card.title}
                    </h3>

                    <p className="mb-5 leading-7 text-muted-foreground">
                      {card.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#b38d22]">
                      Acessar conteúdo
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background pb-24 pt-56">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.22em] text-[#b38d22]">
              Áreas de estudo
            </span>

            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Explore conteúdos para crescer na Palavra
            </h2>

            <p className="text-lg leading-8 text-muted-foreground">
              Encontre estudos, lições e materiais organizados por temas para facilitar
              sua jornada de aprendizado bíblico.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-48 w-full rounded-2xl" />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <section className="relative overflow-hidden bg-[#f4f7fb] py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_28%)]" />

          <div className="container relative">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="flex lg:col-span-5"
              >
                <div className="w-full rounded-[28px] bg-[#0f2f45] p-8 text-white shadow-xl md:p-10">
                  <span className="mb-6 inline-flex items-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#f2d675]">
                    Artigo em Destaque
                  </span>

                  <h2 className="mb-5 text-3xl font-extrabold leading-tight md:text-4xl">
                    {featuredPost.title}
                  </h2>

                  <p className="mb-8 line-clamp-5 leading-8 text-white/80">
                    {featuredPost.excerpt}
                  </p>

                  <Button
                    asChild
                    className="h-12 rounded-xl bg-[#d4af37] px-6 font-bold text-[#0f2f45] transition-all duration-300 hover:scale-[1.02] hover:bg-[#e4c45a]"
                  >
                    <Link to={`/artigo/${featuredPost.slug}`} className="inline-flex items-center gap-2">
                      Ler artigo completo
                      <ArrowRight className="h-4 w-4" />
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
                  className="group block h-full overflow-hidden rounded-[28px] border border-border bg-card shadow-xl"
                >
                  <div className="relative h-[360px] min-h-[420px] overflow-hidden md:h-[460px] lg:h-full">
                    <img
                      src={
                        featuredPost.featured_image
                          ? pb.files.getUrl(featuredPost, featuredPost.featured_image)
                          : 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop'
                      }
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2638]/80 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/12 bg-white/12 p-5 backdrop-blur-xl">
                        <div>
                          <p className="mb-1 text-sm text-white/75">Leitura recomendada</p>
                          <h3 className="line-clamp-2 text-xl font-extrabold leading-tight text-white md:text-2xl">
                            {featuredPost.title}
                          </h3>
                        </div>

                        <span className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-[#0f2f45] transition-transform duration-300 group-hover:translate-x-1 sm:flex">
                          <ArrowRight className="h-5 w-5" />
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

      <section className="bg-background py-24">
        <div className="container">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.22em] text-[#b38d22]">
                Novos conteúdos
              </span>

              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Estudos recentes para sua edificação
              </h2>

              <p className="text-lg leading-8 text-muted-foreground">
                Acompanhe os materiais mais recentes publicados na plataforma.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-[#d4af37]/40 px-6 font-bold text-[#0f2f45] hover:bg-[#d4af37]/10"
            >
              <Link to="/estudos-biblicos">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-[400px] w-full rounded-2xl" />
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="bg-[#f4f7fb] py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.22em] text-[#b38d22]">
                Como aproveitar
              </span>

              <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                Uma jornada simples para estudar melhor
              </h2>

              <p className="mb-8 text-lg leading-8 text-muted-foreground">
                A plataforma foi pensada para ajudar você a encontrar, estudar,
                baixar e compartilhar conteúdos cristãos com praticidade.
              </p>

              <Button
                asChild
                className="h-12 rounded-xl bg-[#0f2f45] px-7 font-bold text-white hover:bg-[#143d59]"
              >
                <Link to="/downloads">
                  Acessar materiais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {platformSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="rounded-3xl border border-border/70 bg-white p-6 shadow-lg shadow-[#0f2f45]/5"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2f45] text-[#d4af37]">
                        <Icon className="h-7 w-7" />
                      </div>

                      <h3 className="mb-2 text-xl font-extrabold text-[#0f2f45]">
                        {step.title}
                      </h3>

                      <p className="leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#070d14] via-[#0f2f45] to-[#153f5c] py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d4af37] text-[#0f2f45] shadow-xl shadow-[#d4af37]/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Receba conteúdos bíblicos exclusivos
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-white/85">
              Inscreva-se para receber atualizações, devocionais e novos materiais
              de estudo diretamente na sua caixa de entrada.
            </p>

            <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white p-8 text-left shadow-2xl">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}