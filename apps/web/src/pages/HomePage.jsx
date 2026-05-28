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
  Map,
  Mic,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
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
    description: 'Estudos completos e profundos para crescer na Palavra.',
    path: '/estudos-biblicos',
    cta: 'Explorar estudos',
  },
  {
    icon: Users,
    title: 'Lições EBD',
    description: 'Lições práticas e objetivas para todas as faixas etárias.',
    path: '/licoes-ebd',
    cta: 'Ver lições',
  },
  {
    icon: Download,
    title: 'Downloads Cristãos',
    description: 'Materiais gratuitos para apoiar seu estudo e ensino.',
    path: '/downloads',
    cta: 'Acessar downloads',
  },
];

const floatingCards = [
  {
    icon: BookOpen,
    title: 'Estudos Bíblicos',
    description: 'Aprofunde seu conhecimento da Palavra.',
    className: 'left-4 top-8',
  },
  {
    icon: Users,
    title: 'Lições EBD',
    description: 'Conteúdo prático para classes e idades.',
    className: 'right-4 top-12',
  },
  {
    icon: Mic,
    title: 'Sermões',
    description: 'Mensagens que edificam e transformam.',
    className: 'left-2 bottom-24',
  },
  {
    icon: Download,
    title: 'Downloads',
    description: 'Materiais para estudo e ensino.',
    className: 'right-2 bottom-20',
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
    label: 'Conteúdo cristão organizado',
  },
  {
    value: 'EBD',
    label: 'Materiais para ensino bíblico',
  },
  {
    value: 'Fé',
    label: 'Edificação para todos os dias',
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

      <section className="relative overflow-hidden bg-[#050b12] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_78%_28%,rgba(40,115,155,0.22),transparent_30%),linear-gradient(135deg,#04070c_0%,#07131f_34%,#0e2b41_68%,#04070c_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,transparent_22%,transparent_72%,rgba(212,175,55,0.12)_100%)]" />
          <div className="absolute left-[-12%] top-[-18%] h-[520px] w-[520px] rounded-full bg-[#d4af37]/12 blur-3xl" />
          <div className="absolute bottom-[-26%] right-[-10%] h-[620px] w-[620px] rounded-full bg-[#1b5b7d]/18 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:76px_76px]" />
        </div>

        <div className="container relative z-10 pb-16 pt-20 lg:pb-20 lg:pt-24">
          <div className="grid min-h-[540px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="max-w-4xl lg:col-span-6"
            >
              <div className="mb-7 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.32em] text-[#f6d66b]">
                  Aprenda. Ensine. Transforme.
                </span>
                <span className="hidden h-px w-28 bg-gradient-to-r from-[#d4af37] to-transparent sm:block" />
              </div>

              <h1 className="mb-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                Conhecimento Bíblico para uma{' '}
                <span className="bg-gradient-to-r from-[#f6d66b] via-[#d4af37] to-[#a9791e] bg-clip-text text-transparent">
                  Vida Transformada
                </span>
              </h1>

              <p className="mb-9 max-w-2xl text-lg leading-8 text-white/88 drop-shadow-md md:text-xl">
                Estudos, lições, sermões e materiais cristãos organizados para fortalecer sua fé
                e apoiar o ensino da Palavra.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  className="h-14 rounded-xl bg-gradient-to-r from-[#f6d66b] to-[#c89525] px-8 text-base font-bold text-[#07131f] shadow-xl shadow-[#d4af37]/20 transition-all duration-300 hover:scale-[1.02] hover:from-[#ffe184] hover:to-[#d4af37]"
                >
                  <Link to="/estudos-biblicos">
                    Começar Estudos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-xl border-[#d4af37]/35 bg-white/[0.04] px-8 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/[0.10]"
                >
                  <Link to="/downloads">
                    Ver Materiais
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.value}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                  >
                    <p className="text-3xl font-extrabold text-white">{item.value}</p>
                    <p className="mt-1 text-sm text-white/72">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="hidden lg:col-span-6 lg:block"
            >
              <div className="relative h-[500px]">
                <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/25" />
                <div className="absolute left-1/2 top-1/2 h-[255px] w-[255px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
                <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-3xl" />

                <div className="absolute left-1/2 top-[43%] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/35 bg-black/25 text-[#f6d66b] shadow-2xl shadow-[#d4af37]/20 backdrop-blur-xl">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold">360°</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                      Palavra
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-[58px] left-1/2 w-[450px] -translate-x-1/2">
                  <div className="relative mx-auto flex h-36 w-[390px] items-end justify-center rounded-[50%] border border-[#d4af37]/25 bg-black/20 shadow-2xl shadow-[#d4af37]/10">
                    <div className="absolute bottom-12 h-24 w-52 rounded-t-full bg-gradient-to-t from-[#d4af37]/25 via-[#f6d66b]/18 to-transparent blur-2xl" />

                    <div className="relative mb-11 flex items-end gap-2">
                      <div className="h-24 w-28 origin-bottom-right -skew-y-6 rounded-l-2xl border border-[#d4af37]/50 bg-gradient-to-br from-[#f7e7a3] via-[#e7cf76] to-[#9a6d18] shadow-xl" />
                      <div className="h-24 w-28 origin-bottom-left skew-y-6 rounded-r-2xl border border-[#d4af37]/50 bg-gradient-to-bl from-[#f7e7a3] via-[#e7cf76] to-[#9a6d18] shadow-xl" />
                      <div className="absolute left-1/2 top-0 h-28 w-px -translate-x-1/2 bg-[#8b6218]" />
                    </div>
                  </div>
                </div>

                {floatingCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className={`absolute ${card.className} w-52 rounded-2xl border border-[#d4af37]/30 bg-white/[0.07] p-4 shadow-2xl shadow-black/25 backdrop-blur-xl`}
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/12 text-[#f6d66b]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mb-1 text-sm font-extrabold text-white">
                        {card.title}
                      </h3>

                      <p className="text-xs leading-5 text-white/72">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="relative z-20 mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
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
                    className="group block h-full rounded-3xl border border-[#d4af37]/35 bg-[#08131f]/90 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#f6d66b]/60 hover:bg-[#0d2032]"
                  >
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/45 bg-[#d4af37]/10 text-[#f6d66b] transition-all duration-300 group-hover:bg-[#d4af37] group-hover:text-[#07131f]">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="mb-2 text-2xl font-extrabold text-white">
                      {card.title}
                    </h3>

                    <p className="mb-5 leading-7 text-white/68">
                      {card.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#f6d66b]">
                      {card.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#050b12] py-20 text-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.28em] text-[#f6d66b]">
                Conteúdos selecionados
              </span>

              <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Explore conteúdos para crescer na Palavra
              </h2>

              <div className="mb-6 h-px w-36 bg-gradient-to-r from-[#d4af37] to-transparent" />

              <p className="mb-6 text-base leading-7 text-white/70">
                Uma seleção de estudos, mensagens e materiais para fortalecer sua caminhada com Deus.
              </p>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-[#d4af37]/45 bg-transparent px-6 font-bold text-[#f6d66b] hover:bg-[#d4af37]/10"
              >
                <Link to="/estudos-biblicos">
                  Ver todos os conteúdos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-8">
              {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} className="h-48 w-full rounded-2xl bg-white/10" />
                  ))}
                </div>
              ) : categories.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {categories.map((category, index) => {
                    const IconComponent = iconMap[category.icon] || Folder;

                    return (
                      <Link
                        key={category.id}
                        to={`/categoria/${category.slug}`}
                        className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:bg-white/[0.09]"
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f6d66b]">
                            <IconComponent className="h-7 w-7" />
                          </div>

                          <span className="text-sm font-bold text-white/30">
                            0{index + 1}
                          </span>
                        </div>

                        <h3 className="mb-3 text-xl font-extrabold text-white">
                          {category.name}
                        </h3>

                        <p className="line-clamp-3 leading-7 text-white/64">
                          {category.description || 'Conteúdo bíblico organizado para apoiar seus estudos.'}
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f6d66b]">
                          Acessar
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8">
                  <EmptyState
                    title="Nenhuma categoria disponível"
                    message="Não há categorias cadastradas no momento."
                  />
                </div>
              )}
            </div>
          </div>
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

      <section className="bg-gradient-to-br from-[#050b12] via-[#0f2f45] to-[#153f5c] py-24">
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