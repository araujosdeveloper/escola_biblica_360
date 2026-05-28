import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Download as DownloadIcon,
  FileImage,
  FileText,
  Grid2X2,
  Home,
  Library,
  Presentation,
  Search,
  Sparkles,
} from 'lucide-react';

import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { DownloadCardSkeleton } from '@/components/LoadingSkeletons.jsx';
import { ErrorState } from '@/components/ErrorState.jsx';
import { EmptyState } from '@/components/EmptyState.jsx';

import { motion } from 'framer-motion';

import pb from '@/lib/pocketbaseProductionClient.js';

const getCategoryIcon = (category = '') => {
  const normalized = category.toLowerCase();

  if (
    normalized.includes('pdf') ||
    normalized.includes('apostila') ||
    normalized.includes('estudo')
  ) {
    return FileText;
  }

  if (
    normalized.includes('slide') ||
    normalized.includes('powerpoint')
  ) {
    return Presentation;
  }

  if (
    normalized.includes('mapa') ||
    normalized.includes('imagem')
  ) {
    return FileImage;
  }

  return FileText;
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      setError(false);

      const records = await pb.collection('downloads').getFullList({
        filter: 'status="published"',
        sort: '-created',
        $autoCancel: false,
      });

      setDownloads(records);
      setFilteredDownloads(records);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        downloads
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return ['Todos', ...uniqueCategories];
  }, [downloads]);

  useEffect(() => {
    let filtered = [...downloads];

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter((item) => {
        return (
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query)
        );
      });
    }

    setFilteredDownloads(filtered);
  }, [downloads, selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Downloads e Materiais - Escola Bíblica 360"
        description="Baixe mapas mentais, PDFs, slides, estudos bíblicos e materiais didáticos para Escola Bíblica Dominical."
      />

      <Header />

      <section className="relative overflow-hidden bg-[#050b12] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(212,175,55,0.20),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(40,115,155,0.20),transparent_30%),linear-gradient(135deg,#050b12_0%,#07131f_42%,#12324a_100%)]" />
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:76px_76px]" />
          <div className="absolute left-[-12%] top-[-30%] h-[520px] w-[520px] rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute bottom-[-35%] right-[-10%] h-[620px] w-[620px] rounded-full bg-[#1b5b7d]/16 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 py-20 md:py-24">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/72">
            <a href="/" className="inline-flex items-center gap-1.5 text-[#f6d66b] transition-colors hover:text-white">
              <Home className="h-4 w-4" />
              Home
            </a>

            <ChevronRight className="h-4 w-4 text-white/35" />

            <span className="text-white">Downloads</span>
          </nav>

          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#f6d66b]">
                <Sparkles className="h-4 w-4" />
                Biblioteca de materiais
              </div>

              <h1 className="max-w-4xl font-['Poppins'] text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                Downloads e Recursos para Estudo Bíblico
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
                Mapas mentais, PDFs, slides, estudos e materiais didáticos organizados
                para fortalecer seu aprendizado e apoiar o ensino da Palavra.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#f6d66b]">
                  Materiais Premium
                </div>

                <div className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/82">
                  Estudos Bíblicos
                </div>

                <div className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/82">
                  Escola Bíblica Dominical
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f6d66b]">
                  <Library className="h-7 w-7" />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f6d66b]">
                  Acervo
                </p>

                <p className="mt-2 text-4xl font-extrabold text-white">
                  {loading ? '...' : downloads.length}
                </p>

                <p className="mt-1 text-sm text-white/62">
                  {downloads.length === 1 ? 'material publicado' : 'materiais publicados'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[50vh] bg-background py-16">
        <div className="container">
          {!loading && !error && (
            <div className="mb-10 overflow-hidden rounded-[28px] border border-border/70 bg-white shadow-lg shadow-[#0f2f45]/5">
              <div className="relative p-6 md:p-7">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-2xl" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <Badge className="mb-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#b38d22] hover:bg-[#d4af37]/10">
                      Recursos disponíveis
                    </Badge>

                    <h2 className="font-['Poppins'] text-3xl font-extrabold text-[#0f2f45]">
                      Biblioteca de materiais
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Pesquise, filtre e baixe recursos preparados para enriquecer estudos, aulas e ministrações.
                    </p>
                  </div>

                  <div className="min-w-[160px] rounded-2xl border border-[#d4af37]/20 bg-[#f8f4e7] px-5 py-4 text-center">
                    <strong className="block text-3xl font-extrabold text-[#b38d22]">
                      {filteredDownloads.length}
                    </strong>

                    <span className="text-xs font-semibold text-muted-foreground">
                      {filteredDownloads.length === 1
                        ? 'material disponível'
                        : 'materiais disponíveis'}
                    </span>
                  </div>
                </div>

                <div className="relative mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      type="search"
                      placeholder="Pesquisar materiais..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="h-12 rounded-2xl border-border/70 bg-background pl-11 font-medium focus-visible:ring-[#d4af37]/30"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        className={`rounded-2xl font-bold ${
                          selectedCategory === category
                            ? 'bg-[#d4af37] text-[#07131f] hover:bg-[#e4c45a]'
                            : 'border-[#d4af37]/25 text-[#0f2f45] hover:bg-[#d4af37]/10'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <DownloadCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <ErrorState
              title="Erro ao carregar downloads"
              message="Não foi possível carregar os materiais disponíveis."
              onRetry={fetchDownloads}
            />
          ) : filteredDownloads.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredDownloads.map((item, index) => {
                const fileUrl = item.file
                  ? pb.files.getUrl(item, item.file)
                  : '#';

                const coverUrl = item.cover_image
                  ? pb.files.getUrl(item, item.cover_image)
                  : null;

                const IconComponent = getCategoryIcon(item.category);

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                    }}
                    className="group overflow-hidden rounded-[28px] border border-border/70 bg-white shadow-lg shadow-[#0f2f45]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:shadow-2xl hover:shadow-[#0f2f45]/12"
                  >
                    {coverUrl ? (
                      <div className="relative h-56 overflow-hidden bg-[#08131f]">
                        <img
                          src={coverUrl}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b12]/90 via-[#0f2f45]/24 to-transparent" />
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.18),transparent_34%)]" />

                        {item.category && (
                          <div className="absolute left-4 top-4">
                            <Badge className="rounded-full border border-[#d4af37]/40 bg-[#07131f]/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#f6d66b] shadow-lg backdrop-blur-md hover:bg-[#07131f]/80">
                              {item.category}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#050b12]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22),transparent_34%),linear-gradient(135deg,#050b12,#12324a)]" />
                        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:52px_52px]" />

                        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f6d66b] shadow-2xl shadow-[#d4af37]/10 backdrop-blur-sm">
                          <IconComponent className="h-10 w-10" />
                        </div>
                      </div>
                    )}

                    <div className="flex h-full flex-col p-6">
                      <div className="mb-5 flex items-start gap-4">
                        {!coverUrl && (
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#b38d22]">
                            <IconComponent className="h-6 w-6" />
                          </div>
                        )}

                        <div>
                          <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />

                          <h3 className="font-['Poppins'] text-xl font-extrabold leading-7 text-[#0f2f45] transition-colors group-hover:text-[#b38d22]">
                            {item.title}
                          </h3>

                          {item.category && (
                            <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-[#b38d22]">
                              {item.category}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="mb-6 flex-grow text-sm leading-7 text-muted-foreground">
                        {item.description || 'Material disponível para download.'}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <Grid2X2 className="h-3.5 w-3.5 text-[#b38d22]" />
                          <span>Material didático</span>
                        </div>

                        <Button
                          className="rounded-2xl bg-[#0f2f45] font-bold text-white hover:bg-[#143d59]"
                          onClick={() => {
                            if (fileUrl !== '#') {
                              window.open(fileUrl, '_blank');
                            }
                          }}
                          disabled={fileUrl === '#'}
                        >
                          <DownloadIcon className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-border bg-white px-6 py-20 shadow-lg shadow-[#0f2f45]/5">
              <EmptyState
                title="Nenhum material encontrado"
                message="Não encontramos materiais compatíveis com sua pesquisa ou filtro selecionado."
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#050b12] py-20 text-white">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 rounded-[32px] border border-[#d4af37]/20 bg-white/[0.05] p-8 shadow-2xl shadow-black/20 md:grid-cols-12 md:p-10">
            <div className="md:col-span-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f6d66b]">
                <BookOpen className="h-4 w-4" />
                Apoio ao ensino cristão
              </div>

              <h2 className="font-['Poppins'] text-3xl font-extrabold leading-tight md:text-4xl">
                Use os materiais para aulas, estudos em grupo, discipulado e devocionais.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/72">
                A biblioteca foi pensada para facilitar o acesso a recursos cristãos práticos,
                organizados e úteis para a edificação da igreja.
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
              <Button
                asChild
                className="h-12 rounded-xl bg-gradient-to-r from-[#f6d66b] to-[#c89525] px-7 font-extrabold text-[#07131f] hover:from-[#ffe184] hover:to-[#d4af37]"
              >
                <a href="#top" onClick={(event) => {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  Voltar ao topo
                  <ArrowRight className="ml-2 h-4 w-4 -rotate-90" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}