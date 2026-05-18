
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { Search, FolderOpen } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { searchAcrossAll } from '@/services/searchService.js';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      
      try {
        setLoading(true);
        const data = await searchAcrossAll(query);
        setResults(data);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput });
      setPage(1);
    }
  };

  const paginatedResults = results.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const getImageUrl = (item) => {
    if (item.featured_image) return pb.files.getUrl(item, item.featured_image);
    if (item.cover_image) return pb.files.getUrl(item, item.cover_image);
    if (item.photo) return pb.files.getUrl(item, item.photo);
    return null;
  };

  return (
    <>
      <SEO 
        title={query ? `Resultados para "${query}" - Escola Bíblica 360` : 'Busca - Escola Bíblica 360'} 
        description="Busque por estudos, lições e sermões em nossa plataforma." 
      />

      <Header />
      <TitleSection 
        title="Resultados de Busca" 
        description={query ? `Mostrando resultados para: "${query}"` : 'Digite um termo para pesquisar em nossos conteúdos.'}
        customBreadcrumbTitle="Busca"
      >
        <form onSubmit={handleSearch} className="relative max-w-2xl mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar artigos, estudos, lições..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-12 pr-28 h-14 text-lg bg-card text-foreground placeholder:text-muted-foreground shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-accent"
          />
          <Button type="submit" className="absolute right-2 top-2 h-10 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold transition-all">
            Buscar
          </Button>
        </form>
      </TitleSection>

      <main className="py-16 bg-background min-h-[50vh]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />)}
                </div>
              ) : query && results.length > 0 ? (
                <>
                  <div className="mb-6 text-sm text-muted-foreground">
                    Encontrados {results.length} resultados
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {paginatedResults.map((item, index) => (
                      <ArticleCard 
                        key={`${item._type}-${item.id}`} 
                        image={getImageUrl(item)}
                        category={item._typeLabel}
                        title={item.title || item.name}
                        summary={item.excerpt || item.description || item.bio}
                        date={new Date(item.published_at || item.created).toLocaleDateString('pt-BR')}
                        path={item._type === 'posts' ? `/artigo/${item.slug}` : item._type === 'categories' ? `/categoria/${item.slug}` : `/${item._type}/${item.slug || item.id}`}
                        index={index} 
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</Button>
                      <span className="flex items-center text-sm font-medium">Página {page} de {totalPages}</span>
                      <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Próxima</Button>
                    </div>
                  )}
                </>
              ) : query && results.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                  <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FolderOpen className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 font-['Poppins']">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground">Não encontramos conteúdos que correspondam à sua busca. Tente palavras diferentes.</p>
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
