
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

export default function SermoesPage() {
  const [posts, setPosts] = useState([]);
  const [catName, setCatName] = useState('Sermões');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const category = await pb.collection('categories').getFirstListItem(`slug="sermoes"`, {
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
        title="Sermões - Escola Bíblica 360" 
        description="Mensagens bíblicas para edificação espiritual: sermões expositivos, temáticos, sobre missões e avivamento." 
      />

      <Header />
      <TitleSection title="Sermões" description="Mensagens bíblicas para edificação espiritual: sermões expositivos, temáticos, sobre missões e avivamento." />

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
            <EmptyState title="Nenhum sermão encontrado" message="Ainda não temos sermões publicados nesta seção." />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
