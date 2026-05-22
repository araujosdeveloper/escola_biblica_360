
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { Search, FolderOpen, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { searchAcrossAll } from '@/services/searchService.js';
import pb from '@/lib/pocketbaseProductionClient.js';

const ITEMS_PER_PAGE = 10;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(Boolean(query));
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearchInput(query);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setHasSearched(false);
        setError(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);
        setHasSearched(true);

        const data = await searchAcrossAll(query);
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();

    const normalizedQuery = searchInput.trim();

    if (!normalizedQuery) return;

    setSearchParams({ q: normalizedQuery });
    setPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(results.length / ITEMS_PER_PAGE));

  const paginatedResults = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return results.slice(start, start + ITEMS_PER_PAGE);
  }, [results, page]);

  const getImageUrl = (item) => {
    if (item.featured_image) return pb.files.getUrl(item, item.featured_image);
    if (item.cover_image) return pb.files.getUrl(item, item.cover_image);
    if (item.photo) return pb.files.getUrl(item, item.photo);
    return null;
  };

  const getItemPath = (item) => {
    if (item._type === 'posts') return `/artigo/${item.slug}`;
    if (item._type === 'categories') return `/categoria/${item.slug}`;
    if (item._type === 'downloads') return '/downloads';
    if (item.slug) return `/${item._type}/${item.slug}`;
    return '/';
  };

  return (
    <>
      <SEO
        title={query ? `Resultados para "${query}" - Escola Bíblica 360` : 'Busca - Escola Bíblica 360'}
        description="Busque por estudos bíblicos, lições da Escola Bíblica Dominical, sermões, escatologia e materiais cristãos."
      />

      <Header />

      <TitleSection
        title="Busca no Portal"
        description={
          query
            ? `Resultados encontrados para: "${query}"`
            : 'Pesquise estudos, lições, sermões, categorias e materiais disponíveis na plataforma.'
        }
        customBreadcrumbTitle="Busca"
      >
        <form onSubmit={handleSearch} className="relative mt-8 max-w-3xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            placeholder="Pesquisar por estudos, doutrinas, sermões, EBD..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="h-14 rounded-2xl border-0 bg-card pl-12 pr-32 text-base text-foreground shadow-xl placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent md:text-lg"
          />

          <Button
            type="submit"
            className="absolute right-2 top-2 h-10 rounded-xl bg-accent px-6 font-semibold text-accent-foreground transition-all hover:bg-accent/90"
          >
            Buscar
          </Button>
        </form>
      </TitleSection>

      <main className="min-h-[50vh] bg-background py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <section className="lg:col-span-2">
              {hasSearched && !loading && !error && (
                <div className="mb-10 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <Badge className="mb-3 bg-accent/10 text-accent hover:bg-accent/10">
                        Resultado da busca
                      </Badge>

                      <h2 className="font-['Poppins'] text-2xl font-bold text-foreground">
                        {results.length > 0
                          ? `${results.length} resultado${results.length > 1 ? 's' : ''} encontrado${results.length > 1 ? 's' : ''}`
                          : 'Nenhum resultado encontrado'}
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Busca realizada por: <span className="font-semibold text-foreground">"{query}"</span>
                      </p>
                    </div>

                    <Button asChild variant="outline" className="gap-2">
                      <Link to="/estudos-biblicos">
                        <Sparkles className="h-4 w-4" />
                        Explorar estudos
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-[420px] w-full rounded-3xl" />
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-3xl border border-border bg-card px-6 py-20 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                    <Search className="h-10 w-10 text-red-500" />
                  </div>

                  <h3 className="mb-3 font-['Poppins'] text-2xl font-bold text-foreground">
                    Não foi possível realizar a busca
                  </h3>

                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    Ocorreu um erro ao consultar os conteúdos. Tente novamente em instantes.
                  </p>

                  <Button onClick={() => setSearchParams({ q: query })} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Tentar novamente
                  </Button>
                </div>
              ) : query && results.length > 0 ? (
                <>
                  <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {paginatedResults.map((item, index) => (
                      <ArticleCard
                        key={`${item._type}-${item.id}`}
                        image={getImageUrl(item)}
                        category={item._typeLabel || 'Resultado'}
                        title={item.title || item.name}
                        summary={item.excerpt || item.description || item.bio}
                        date={new Date(item.published_at || item.created).toLocaleDateString('pt-BR')}
                        path={getItemPath(item)}
                        index={index}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm sm:flex-row">
                      <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                        className="gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Anterior
                      </Button>

                      <span className="text-sm font-medium text-muted-foreground">
                        Página {page} de {totalPages}
                      </span>

                      <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                        className="gap-2"
                      >
                        Próxima
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : hasSearched ? (
                <div className="rounded-3xl border border-border bg-card px-6 py-20 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/60">
                    <FolderOpen className="h-10 w-10 text-muted-foreground" />
                  </div>

                  <h3 className="mb-3 font-['Poppins'] text-2xl font-bold text-foreground">
                    Nenhum resultado encontrado
                  </h3>

                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    Não encontramos conteúdos que correspondam à sua busca. Tente usar termos mais simples ou palavras relacionadas.
                  </p>

                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/estudos-biblicos">Ver estudos disponíveis</Link>
                  </Button>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-card px-6 py-20 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                    <Search className="h-10 w-10 text-accent" />
                  </div>

                  <h3 className="mb-3 font-['Poppins'] text-2xl font-bold text-foreground">
                    Pesquise no acervo bíblico
                  </h3>

                  <p className="mx-auto max-w-md text-muted-foreground">
                    Digite no campo acima o tema que deseja estudar, como “fé”, “escatologia”, “oração”, “EBD” ou “Espírito Santo”.
                  </p>
                </div>
              )}
            </section>

            <aside className="lg:col-span-1">
              <Sidebar />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

