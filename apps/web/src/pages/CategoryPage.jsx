
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { ChevronRight, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ErrorState } from '@/components/ErrorState.jsx';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function CategoryPage() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCategoryAndPosts = async () => {
    try {
      setLoading(true);
      setError(false);

      const categoryRecord = await pb.collection('categories').getFirstListItem(`slug="${slug}"`, {
        $autoCancel: false,
      });

      setCategory(categoryRecord);

      const postsData = await pb.collection('posts').getList(page, 12, {
        filter: `status="published" && category_id="${categoryRecord.id}"`,
        sort: '-published_at',
        expand: 'category_id',
        $autoCancel: false,
      });

      setPosts(postsData.items);
      setTotalPages(postsData.totalPages || 1);
      setTotalItems(postsData.totalItems || 0);
    } catch {
      setCategory(null);
      setPosts([]);
      setError(true);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndPosts();
    }
  }, [slug, page]);

  const categoryName = category?.name || 'Categoria';
  const categoryDescription =
    category?.description ||
    'Explore estudos, artigos e materiais publicados nesta categoria.';

  return (
    <>
      <SEO
        title={`${categoryName} - Escola Bíblica 360`}
        description={categoryDescription}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: categoryName, url: `/categoria/${slug}` },
        ]}
      />

      <Header />

      <TitleSection title={initialLoading ? 'Carregando categoria...' : categoryName} description={categoryDescription}>
        <nav className="mt-4 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-foreground font-medium">
            {initialLoading ? 'Categoria' : categoryName}
          </span>
        </nav>
      </TitleSection>

      <main className="bg-background py-16 min-h-[50vh]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <section className="lg:col-span-2">
              {!error && (
                <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                  <div>
                    <Badge className="mb-3 bg-accent/10 text-accent hover:bg-accent/10">
                      Categoria
                    </Badge>

                    <h2 className="font-['Poppins'] text-2xl font-bold text-foreground">
                      {categoryName}
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {categoryDescription}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-muted px-5 py-4 text-center">
                    <strong className="block text-2xl font-bold text-accent">
                      {totalItems}
                    </strong>
                    <span className="text-xs text-muted-foreground">
                      {totalItems === 1 ? 'artigo publicado' : 'artigos publicados'}
                    </span>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-[420px] w-full rounded-3xl" />
                  ))}
                </div>
              ) : error ? (
                <ErrorState
                  title="Categoria não encontrada"
                  message="Não foi possível carregar esta categoria. Ela pode ter sido removida ou ainda não está disponível."
                  onRetry={fetchCategoryAndPosts}
                />
              ) : posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {posts.map((post, index) => (
                      <ArticleCard
                        key={post.id}
                        image={post.featured_image ? pb.files.getUrl(post, post.featured_image) : null}
                        category={post.expand?.category_id?.name || categoryName}
                        title={post.title}
                        summary={post.excerpt}
                        date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                        path={`/artigo/${post.slug}`}
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
                        <ArrowLeft className="w-4 h-4" />
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
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-3xl border border-border bg-card px-6 py-20 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted/60">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>

                  <h3 className="mb-3 font-['Poppins'] text-2xl font-bold text-foreground">
                    Nenhum artigo encontrado
                  </h3>

                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    Ainda não há publicações nesta categoria. Assim que novos conteúdos forem publicados, eles aparecerão aqui.
                  </p>

                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/estudos-biblicos">Ver outros estudos</Link>
                  </Button>
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