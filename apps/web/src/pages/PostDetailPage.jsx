
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { Calendar, User, Facebook, Twitter, MessageCircle, Clock, ChevronRight } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ErrorState } from '@/components/ErrorState.jsx';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function PostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [categoryRecord, setCategoryRecord] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(false);
      const record = await pb.collection('posts').getFirstListItem(`slug="${slug}"`, {
        $autoCancel: false
      });
      
      let cat = null;
      if (record.category_id) {
        cat = await pb.collection('categories').getOne(record.category_id, { $autoCancel: false }).catch(() => null);
        setCategoryRecord(cat);
      }
      
      setPost(record);
      
      if (record) {
        await pb.collection('posts').update(record.id, {
          views: (record.views || 0) + 1
        }, { $autoCancel: false }).catch(() => {});

        if (record.category_id) {
          const related = await pb.collection('posts').getList(1, 4, {
            filter: `status="published" && category_id="${record.category_id}" && id!="${record.id}"`,
            sort: '-published_at',
            $autoCancel: false
          });
          setRelatedPosts(related.items);
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-12">
          <div className="animate-pulse space-y-8 max-w-4xl">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-16 bg-muted rounded w-3/4"></div>
            <div className="h-96 bg-muted rounded-2xl w-full"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="container py-24">
          <ErrorState 
            title="Artigo não encontrado" 
            message="O artigo que você está procurando não existe ou foi removido."
            onRetry={fetchPost}
          />
        </div>
        <Footer />
      </>
    );
  }

  const categoryName = categoryRecord?.name || 'Artigo';
  const categorySlug = categoryRecord?.slug || '';
  const postUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = post.featured_image ? pb.files.getUrl(post, post.featured_image) : null;

  return (
    <>
      <SEO 
        title={`${post?.seo_title || post?.title} - Escola Bíblica 360`} 
        description={post?.seo_description || post?.excerpt} 
        image={imageUrl}
        type="article"
        publishedDate={post.published_at || post.created}
        modifiedDate={post.updated}
        author={post.author || 'Equipe Escola Bíblica 360'}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: categoryName, url: `/categoria/${categorySlug}` },
          { label: post.title, url: `/artigo/${post.slug}` }
        ]}
      />
      
      <Header />
      
      <TitleSection title={post.title} description={post.excerpt}>
        <nav className="flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70 mt-4 mb-4">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          {categorySlug ? (
            <Link to={`/categoria/${categorySlug}`} className="hover:text-accent transition-colors">
              {categoryName}
            </Link>
          ) : (
            <span>{categoryName}</span>
          )}
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-primary-foreground/80 mt-6">
          <Link to={categorySlug ? `/categoria/${categorySlug}` : '/'}>
            <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors border-none">
              {categoryName}
            </Badge>
          </Link>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author || 'Equipe Escola Bíblica 360'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.published_at || post.created}>
              {new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
            </time>
          </div>
          {post.reading_time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min de leitura</span>
            </div>
          )}
        </div>
      </TitleSection>

      <main className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
            <article className="lg:col-span-2">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-10 shadow-lg border border-border/50"
                />
              )}

              <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-headings:font-['Poppins'] prose-a:text-accent prose-strong:text-foreground">
                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
              </div>

              <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-semibold text-foreground">Compartilhe este estudo:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, '_blank')} aria-label="Share on Facebook">
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${postUrl}&text=${encodeURIComponent(post.title)}`, '_blank')} aria-label="Share on Twitter">
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + postUrl)}`, '_blank')} aria-label="Share on WhatsApp">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </Button>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-foreground mb-6 font-['Poppins']">Artigos Relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((related, index) => (
                      <ArticleCard 
                        key={related.id}
                        image={related.featured_image ? pb.files.getUrl(related, related.featured_image) : null}
                        category={categoryName}
                        title={related.title}
                        summary={related.excerpt}
                        date={new Date(related.published_at || related.created).toLocaleDateString('pt-BR')}
                        path={`/artigo/${related.slug}`}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </article>

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
