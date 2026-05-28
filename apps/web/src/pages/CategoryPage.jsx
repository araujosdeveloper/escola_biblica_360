import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FolderOpen,
  Home,
  Layers,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
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

      <section className="relative overflow-hidden bg-[#050b12] text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(212,175,55,0.18),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(40,115,155,0.18),transparent_28%),linear-gradient(135deg,#050b12_0%,#07131f_40%,#12324a_100%)]" />
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] bg-[size:76px_76px]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 py-20 md:py-24">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/72">
            <Link to="/" className="inline-flex items-center gap-1.5 text-[#f6d66b] transition-colors hover:text-white">
              <Home className="h-4 w-4" />
              Home
            </Link>

            <ChevronRight className="h-4 w-4 text-white/35" />

            <span className="text-white/72">Categoria</span>

            <ChevronRight className="h-4 w-4 text-white/35" />

            <span className="text-white">
              {initialLoading ? 'Carregando...' : categoryName}
            </span>
          </nav>

          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#f6d66b]">
                <FolderOpen className="h-4 w-4" />
                Categoria
              </div>

              <h1 className="max-w-4xl font-['Poppins'] text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                {initialLoading ? 'Carregando categoria...' : categoryName}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
                {categoryDescription}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#f6d66b]">
                  <Layers className="h-7 w-7" />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f6d66b]">
                  Publicações
                </p>

                <p className="mt-2 text-4xl font-extrabold text-white">
                  {initialLoading ? '...' : totalItems}
                </p>

                <p className="mt-1 text-sm text-white/62">
                  {totalItems === 1 ? 'artigo publicado' : 'artigos publicados'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="min-h-[50vh] bg-background py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <section className="lg:col-span-2">
              {!error && (
                <div className="mb-10 overflow-hidden rounded-[28px] border border-border/70 bg-white shadow-lg shadow-[#0f2f45]/5">
                  <div className="relative p-6 md:p-7">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-2xl" />

                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div>
                        <Badge className="mb-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#b38d22] hover:bg-[#d4af37]/10">
                          Categoria
                        </Badge>

                        <h2 className="font-['Poppins'] text-2xl font-extrabold text-[#0f2f45]">
                          {categoryName}
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {categoryDescription}
                        </p>
                      </div>

                      <div className="min-w-[140px] rounded-2xl border border-[#d4af37]/20 bg-[#f8f4e7] px-5 py-4 text-center">
                        <strong className="block text-3xl font-extrabold text-[#b38d22]">
                          {totalItems}
                        </strong>

                        <span className="text-xs font-semibold text-muted-foreground">
                          {totalItems === 1 ? 'artigo publicado' : 'artigos publicados'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-[420px] w-full rounded-[28px]" />
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
                  <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
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
                    <div className="flex flex-col items-center justify-between gap-4 rounded-[28px] border border-border bg-white p-5 shadow-lg shadow-[#0f2f45]/5 sm:flex-row">
                      <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                        className="gap-2 rounded-xl border-[#d4af37]/30 font-bold text-[#0f2f45] hover:bg-[#d4af37]/10"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Anterior
                      </Button>

                      <span className="text-sm font-bold text-muted-foreground">
                        Página {page} de {totalPages}
                      </span>

                      <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                        className="gap-2 rounded-xl border-[#d4af37]/30 font-bold text-[#0f2f45] hover:bg-[#d4af37]/10"
                      >
                        Próxima
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-[28px] border border-border bg-white px-6 py-20 text-center shadow-lg shadow-[#0f2f45]/5">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#b38d22]">
                    <BookOpen className="h-10 w-10" />
                  </div>

                  <h3 className="mb-3 font-['Poppins'] text-2xl font-extrabold text-[#0f2f45]">
                    Nenhum artigo encontrado
                  </h3>

                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    Ainda não há publicações nesta categoria. Assim que novos conteúdos forem publicados, eles aparecerão aqui.
                  </p>

                  <Button asChild className="rounded-xl bg-[#d4af37] font-bold text-[#07131f] hover:bg-[#e4c45a]">
                    <Link to="/estudos-biblicos">Ver outros estudos</Link>
                  </Button>
                </div>
              )}
            </section>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <Sidebar />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}