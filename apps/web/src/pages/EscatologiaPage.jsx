
import React, { useState, useEffect } from 'react';
import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { EmptyState } from '@/components/EmptyState.jsx';
import { ErrorState } from '@/components/ErrorState.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function EscatologiaPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await pb.collection('escatologia').getList(1, 50, {
        filter: `status="published"`,
        sort: '-published_at',
        $autoCancel: false
      });
      setPosts(res.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <SEO 
        title="Escatologia - Escola Bíblica 360" 
        description="Compreenda os eventos do fim dos tempos segundo as profecias bíblicas." 
      />

      <Header />
      <TitleSection title="Escatologia Bíblica" description="Compreenda os eventos do fim dos tempos segundo as profecias bíblicas: arrebatamento, tribulação, milênio e juízo final." />

      <main className="py-16 bg-background min-h-[50vh]">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />)}
            </div>
          ) : error ? (
            <ErrorState onRetry={fetchPosts} />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <ArticleCard 
                  key={post.id} 
                  image={post.featured_image ? pb.files.getUrl(post, post.featured_image) : null} 
                  category="Escatologia" 
                  title={post.title} 
                  summary={post.excerpt} 
                  date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')} 
                  path={`/escatologia/${post.slug}`} 
                  index={i} 
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Nenhum artigo encontrado" message="Ainda não temos artigos publicados sobre Escatologia." />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
