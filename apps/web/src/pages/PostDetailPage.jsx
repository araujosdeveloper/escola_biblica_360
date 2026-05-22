import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import {
  Calendar,
  User,
  Facebook,
  Twitter,
  MessageCircle,
  Clock,
  ChevronRight,
  Link as LinkIcon,
  Eye,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Sidebar from '@/components/Sidebar.jsx';
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

  const getAuthorName = (record) => {
    return (
      record?.expand?.author?.name ||
      record?.expand?.author?.full_name ||
      record?.expand?.author?.email ||
      record?.author_name ||
      'Equipe Escola Bíblica 360'
    );
  };

  const escapeHtml = (value = '') => {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const renderPlainText = (content = '') => {
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    let html = '';
    let listOpen = false;

    lines.forEach((line) => {
      const isBullet = line.startsWith('•') || line.startsWith('- ');

      if (isBullet) {
        if (!listOpen) {
          html += '<ul>';
          listOpen = true;
        }

        html += `<li>${escapeHtml(line.replace(/^•\s?|- /, ''))}</li>`;
        return;
      }

      if (listOpen) {
        html += '</ul>';
        listOpen = false;
      }

      if (line.startsWith('## ')) {
        html += `<h2>${escapeHtml(line.replace('## ', ''))}</h2>`;
      } else if (line.startsWith('### ')) {
        html += `<h3>${escapeHtml(line.replace('### ', ''))}</h3>`;
      } else {
        html += `<p>${escapeHtml(line)}</p>`;
      }
    });

    if (listOpen) {
      html += '</ul>';
    }

    return html;
  };

  const renderContent = (content = '') => {
    const hasHtml = /<\/?[a-z][\s\S]*>/i.test(content);

    return {
      __html: hasHtml ? content : renderPlainText(content),
    };
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(false);

      const record = await pb.collection('posts').getFirstListItem(`slug="${slug}"`, {
        expand: 'author',
        $autoCancel: false,
      });

      let category = null;

      if (record.category_id) {
        category = await pb
          .collection('categories')
          .getOne(record.category_id, { $autoCancel: false })
          .catch(() => null);
      }

      setPost(record);
      setCategoryRecord(category);

      pb.collection('posts')
        .update(
          record.id,
          { views: (record.views || 0) + 1 },
          { $autoCancel: false }
        )
        .catch(() => {});

      if (record.category_id) {
        const related = await pb.collection('posts').getList(1, 4, {
          filter: `status="published" && category_id="${record.category_id}" && id!="${record.id}"`,
          sort: '-published_at',
          expand: 'author',
          $autoCancel: false,
        });

        setRelatedPosts(related.items);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const categoryName = categoryRecord?.name || 'Artigo';
  const categorySlug = categoryRecord?.slug || '';
  const imageUrl = post?.featured_image ? pb.files.getUrl(post, post.featured_image) : null;
  const authorName = post ? getAuthorName(post) : 'Equipe Escola Bíblica 360';
  const postUrl = typeof window !== 'undefined' ? window.location.href : '';

  const formattedDate = useMemo(() => {
    if (!post) return '';
    return new Date(post.published_at || post.created).toLocaleDateString('pt-BR');
  }, [post]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success('Link copiado com sucesso.');
    } catch {
      toast.error('Não foi possível copiar o link.');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl animate-pulse space-y-8">
              <div className="h-8 w-40 rounded-full bg-muted" />
              <div className="h-16 w-4/5 rounded bg-muted" />
              <div className="h-[420px] w-full rounded-3xl bg-muted" />
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                  <div className="h-4 w-3/4 rounded bg-muted" />
                </div>
                <div className="h-60 rounded-3xl bg-muted" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="container py-24">
          <ErrorState
            title="Artigo não encontrado"
            message="O artigo que você está procurando não existe ou foi removido."
            onRetry={fetchPost}
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${post.seo_title || post.title} - Escola Bíblica 360`}
        description={post.seo_description || post.excerpt}
        image={imageUrl}
        type="article"
        publishedDate={post.published_at || post.created}
        modifiedDate={post.updated}
        author={authorName}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: categoryName, url: `/categoria/${categorySlug}` },
          { label: post.title, url: `/artigo/${post.slug}` },
        ]}
      />

      <Header />

      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover opacity-20"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_32%)]" />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>

              <ChevronRight className="h-4 w-4" />

              {categorySlug ? (
                <Link
                  to={`/categoria/${categorySlug}`}
                  className="hover:text-accent transition-colors"
                >
                  {categoryName}
                </Link>
              ) : (
                <span>{categoryName}</span>
              )}

              <ChevronRight className="h-4 w-4" />

              <span className="max-w-[240px] truncate font-medium text-primary-foreground sm:max-w-md">
                {post.title}
              </span>
            </nav>

            <Badge className="mb-6 border-none bg-accent text-accent-foreground hover:bg-accent/90">
              {categoryName}
            </Badge>

            <h1 className="mb-6 max-w-4xl font-['Poppins'] text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mb-8 max-w-3xl text-lg leading-8 text-primary-foreground/78 md:text-xl">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                <User className="h-4 w-4 text-accent" />
                <span>{authorName}</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-accent" />
                <time dateTime={post.published_at || post.created}>{formattedDate}</time>
              </div>

              {post.reading_time && (
                <div className="flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{post.reading_time} min de leitura</span>
                </div>
              )}

              {typeof post.views === 'number' && (
                <div className="flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                  <Eye className="h-4 w-4 text-accent" />
                  <span>{post.views} visualizações</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="bg-background py-14 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <article className="lg:col-span-8">
              {imageUrl && (
                <figure className="mb-10 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl">
                  <img
                    src={imageUrl}
                    alt={post.title}
                    loading="lazy"
                    className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[460px]"
                  />
                </figure>
              )}

              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm md:p-10">
                <div
                  className="
                    prose
                    prose-lg
                    max-w-none
                    text-foreground
                    leading-8
                    prose-p:text-foreground
                    prose-p:leading-8
                    prose-p:mb-6
                    prose-headings:font-['Poppins']
                    prose-headings:text-foreground
                    prose-headings:font-bold
                    prose-h2:text-3xl
                    prose-h2:mt-12
                    prose-h2:mb-6
                    prose-h3:text-2xl
                    prose-h3:mt-10
                    prose-h3:mb-4
                    prose-strong:text-foreground
                    prose-strong:font-semibold
                    prose-a:text-accent
                    prose-ul:my-6
                    prose-ul:pl-6
                    prose-li:mb-3
                    prose-blockquote:rounded-2xl
                    prose-blockquote:border-l-4
                    prose-blockquote:border-accent
                    prose-blockquote:bg-muted/50
                    prose-blockquote:py-4
                    prose-blockquote:pl-5
                    prose-blockquote:pr-4
                    prose-blockquote:italic
                  "
                  dangerouslySetInnerHTML={renderContent(post.content)}
                />

                <div className="mt-12 border-t border-border pt-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-foreground">Compartilhe este estudo</p>
                      <p className="text-sm text-muted-foreground">
                        Ajude outras pessoas a crescerem na Palavra.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="gap-2 rounded-xl"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
                          '_blank'
                        )
                      }
                      aria-label="Compartilhar no Facebook"
                    >
                      <Facebook className="h-4 w-4 text-[#1877F2]" />
                      Facebook
                    </Button>

                    <Button
                      variant="outline"
                      className="gap-2 rounded-xl"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`,
                          '_blank'
                        )
                      }
                      aria-label="Compartilhar no Twitter"
                    >
                      <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                      Twitter
                    </Button>

                    <Button
                      variant="outline"
                      className="gap-2 rounded-xl"
                      onClick={() =>
                        window.open(
                          `https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`,
                          '_blank'
                        )
                      }
                      aria-label="Compartilhar no WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                      WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="gap-2 rounded-xl"
                      onClick={copyLink}
                      aria-label="Copiar link"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <section className="mt-16">
                  <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        Continue estudando
                      </span>

                      <h2 className="font-['Poppins'] text-3xl font-bold text-foreground">
                        Artigos Relacionados
                      </h2>
                    </div>

                    {categorySlug && (
                      <Link
                        to={`/categoria/${categorySlug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80"
                      >
                        Ver categoria
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                </section>
              )}
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
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