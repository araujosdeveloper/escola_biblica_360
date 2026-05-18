
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

export default function EstudosBiblicoPage() {
  const [posts, setPosts] = useState([]);
  const [catName, setCatName] = useState('Estudos Bíblicos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const category = await pb.collection('categories').getFirstListItem(`slug="estudos-biblicos"`, {
        $autoCancel: false
      }).catch(() => null);

      if (!category) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      setCatName(category.name);

      const res = await pb.collection('posts').getList(1, 12, {
        filter: `status="published" && category_id="${category.id}"`,
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
        title="Estudos Bíblicos - Escola Bíblica 360" 
        description="Aprofunde-se nas Escrituras com estudos detalhados sobre personagens, doutrinas e temas fundamentais." 
      />

      <Header />
      <TitleSection title="Estudos Bíblicos" description="Aprofunde-se nas Escrituras com estudos detalhados sobre personagens, doutrinas e temas fundamentais." />

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
                  category={catName} 
                  title={post.title} 
                  summary={post.excerpt} 
                  date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')} 
                  path={`/artigo/${post.slug}`} 
                  index={i} 
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Nenhum estudo encontrado" message="Ainda não temos estudos bíblicos publicados nesta seção." />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
