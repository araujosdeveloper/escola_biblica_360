
import React, { useEffect, useState } from 'react';
import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { EmptyState } from '@/components/EmptyState.jsx';
import { ErrorState } from '@/components/ErrorState.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { HeartHandshake, Puzzle, BookMarked } from 'lucide-react';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function InfantilPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await pb.collection('infantil').getList(1, 50, {
        filter: 'status="published"',
        sort: '-published_at',
        $autoCancel: false,
      });

      setPosts(response.items);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const description =
    'Atividades, histórias bíblicas, dinâmicas e materiais para ensinar crianças sobre a Palavra de Deus de forma simples, criativa e edificante.';

  return (
    <>
      <SEO
        title="Conteúdo Infantil - Escola Bíblica 360"
        description={description}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Infantil', url: '/infantil' },
        ]}
      />

      <Header />

      <TitleSection title="Conteúdo Infantil" description={description}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent">
            Crianças
          </div>

          <div className="rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Histórias Bíblicas
          </div>

          <div className="rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Dinâmicas
          </div>
        </div>
      </TitleSection>

      <main className="min-h-[50vh] bg-background py-16">
        <div className="container">
          {!loading && !error && (
            <section className="mb-10 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex items-start gap-4 rounded-2xl bg-muted/50 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <BookMarked className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-base font-bold text-foreground">
                      Ensino bíblico infantil
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Conteúdos preparados para comunicar a Palavra de Deus às crianças.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-muted/50 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Puzzle className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-base font-bold text-foreground">
                      Atividades e dinâmicas
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Recursos criativos para facilitar o aprendizado e a participação.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-muted/50 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <HeartHandshake className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-base font-bold text-foreground">
                      Formação cristã
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Materiais para ensinar valores bíblicos desde a infância.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3 bg-accent/10 text-accent hover:bg-accent/10">
                Infantil
              </Badge>

              <h2 className="font-['Poppins'] text-3xl font-bold text-foreground">
                Conteúdos disponíveis
              </h2>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {posts.length > 0
                  ? `${posts.length} conteúdo${posts.length > 1 ? 's' : ''} publicado${posts.length > 1 ? 's' : ''} para o ministério infantil.`
                  : 'Confira os conteúdos publicados nesta seção.'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-[420px] w-full rounded-3xl" />
              ))}
            </div>
          ) : error ? (
            <ErrorState
              title="Erro ao carregar conteúdos"
              message="Não foi possível carregar os conteúdos infantis no momento."
              onRetry={fetchPosts}
            />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  image={post.featured_image ? pb.files.getUrl(post, post.featured_image) : null}
                  category="Infantil"
                  title={post.title}
                  summary={post.excerpt}
                  date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                  path={`/infantil/${post.slug}`}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nenhum conteúdo encontrado"
              message="Ainda não temos conteúdos publicados para o Ministério Infantil."
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}