
import React, { useEffect, useMemo, useState } from 'react';
import {
  Download as DownloadIcon,
  FileText,
  FileImage,
  Presentation,
  Search,
  Sparkles,
  Grid2X2,
} from 'lucide-react';

import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';

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

      <TitleSection
        title="Biblioteca de Downloads"
        description="Mapas mentais, PDFs, slides, estudos e materiais didáticos organizados para fortalecer seu aprendizado bíblico."
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent">
            Materiais Premium
          </div>

          <div className="rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Estudos Bíblicos
          </div>

          <div className="rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Escola Bíblica Dominical
          </div>
        </div>
      </TitleSection>

      <section className="min-h-[50vh] bg-background py-16">
        <div className="container">
          {!loading && !error && (
            <div className="mb-10 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <Badge className="mb-3 bg-accent/10 text-accent hover:bg-accent/10">
                    Biblioteca de materiais
                  </Badge>

                  <h2 className="font-['Poppins'] text-3xl font-bold text-foreground">
                    Recursos disponíveis
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Explore materiais preparados para enriquecer estudos, aulas e ministrações.
                  </p>
                </div>

                <div className="rounded-2xl bg-muted px-5 py-4 text-center">
                  <strong className="block text-2xl font-bold text-accent">
                    {filteredDownloads.length}
                  </strong>

                  <span className="text-xs text-muted-foreground">
                    {filteredDownloads.length === 1
                      ? 'material disponível'
                      : 'materiais disponíveis'}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    type="search"
                    placeholder="Pesquisar materiais..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-12 rounded-2xl bg-background pl-11"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className={`rounded-2xl ${
                        selectedCategory === category
                          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                          : ''
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
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
                    className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {coverUrl ? (
                      <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                          src={coverUrl}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        {item.category && (
                          <div className="absolute left-4 top-4">
                            <Badge className="border-none bg-accent text-accent-foreground hover:bg-accent/90">
                              {item.category}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-gradient-to-br from-primary to-secondary">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    )}

                    <div className="flex h-full flex-col p-6">
                      <div className="mb-5 flex items-start gap-4">
                        {!coverUrl && (
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                            <IconComponent className="h-6 w-6" />
                          </div>
                        )}

                        <div>
                          <h3 className="font-['Poppins'] text-xl font-bold leading-7 text-foreground transition-colors group-hover:text-accent">
                            {item.title}
                          </h3>

                          {item.category && (
                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-accent">
                              {item.category}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="mb-6 flex-grow text-sm leading-7 text-muted-foreground">
                        {item.description || 'Material disponível para download.'}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Grid2X2 className="h-3.5 w-3.5" />
                          <span>Material didático</span>
                        </div>

                        <Button
                          className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
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
            <EmptyState
              title="Nenhum material encontrado"
              message="Não encontramos materiais compatíveis com sua pesquisa ou filtro selecionado."
            />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}