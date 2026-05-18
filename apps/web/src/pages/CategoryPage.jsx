
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { ChevronRight, BookOpen } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ErrorState.jsx';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategoryAndPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      const categoryRecord = await pb.collection('categories').getFirstListItem(`slug="${slug}"`, {
        $autoCancel: false
      });
      setCategory(categoryRecord);

      const postsData = await pb.collection('posts').getList(page, 12, {
        filter: `status="published" && category_id="${categoryRecord.id}"`,
        sort: '-published_at',
        $autoCancel: false
      });
      
      setPosts(postsData.items);
      setTotalPages(postsData.totalPages);
    } catch (err) {
      setCategory(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchCategoryAndPosts();
  }, [slug, page]);

  return (
    <>
      <SEO 
        title={category ? `${category.name} - Escola Bíblica 360` : 'Categoria - Escola Bíblica 360'} 
        description={category?.description || 'Explore nossos artigos nesta categoria.'} 
      />

      <Header />
      <TitleSection 
        title={category ? category.name : 'Carregando...'} 
        description={category?.description || ''}
      >
        <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mt-4">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-foreground font-medium">{category?.name || slug}</span>
        </nav>
      </TitleSection>

      <main className="py-16 bg-background min-h-[50vh]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />)}
                </div>
              ) : error ? (
                <ErrorState onRetry={fetchCategoryAndPosts} />
              ) : posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {posts.map((post, index) => (
                      <ArticleCard 
                        key={post.id} 
                        image={post.featured_image ? pb.files.getUrl(post, post.featured_image) : null}
                        category={category.name}
                        title={post.title}
                        summary={post.excerpt}
                        date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                        path={`/artigo/${post.slug}`}
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
              ) : (
                <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                  <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 font-['Poppins']">Nenhum artigo encontrado</h3>
                  <p className="text-muted-foreground">Ainda não há publicações nesta categoria.</p>
                </div>
              )}
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
