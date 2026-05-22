
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
import { CloudSun, ScrollText, Crown } from 'lucide-react';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function EscatologiaPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await pb.collection('escatologia').getList(1, 50, {
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
    'Compreenda os eventos do fim dos tempos segundo as profecias bíblicas: arrebatamento, tribulação, milênio, juízo final e esperança cristã.';

  return (
    <>
      <SEO
        title="Escatologia Bíblica - Escola Bíblica 360"
        description={description}
        breadcrumbs={[
          { label: 'Home', url: '/' },
          { label: 'Escatologia', url: '/escatologia' },
        ]}
      />

      <Header />

      <TitleSection title="Escatologia Bíblica" description={description}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent">
            Profecias Bíblicas
          </div>

          <div className="rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Arrebatamento
          </div>

          <div className="rounded-full border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            Esperança Cristã
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
                    <CloudSun className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-base font-bold text-foreground">
                      Esperança futura
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Estudos sobre a consumação do plano de Deus e a esperança da igreja.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-muted/50 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <ScrollText className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-base font-bold text-foreground">
                      Profecias bíblicas
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Conteúdos organizados sobre os eventos proféticos das Escrituras.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-muted/50 p-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Crown className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] text-base font-bold text-foreground">
                      Reino e eternidade
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Reflexões sobre milênio, juízo, restauração e eternidade com Deus.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3 bg-accent/10 text-accent hover:bg-accent/10">
                Escatologia
              </Badge>

              <h2 className="font-['Poppins'] text-3xl font-bold text-foreground">
                Estudos disponíveis
              </h2>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {posts.length > 0
                  ? `${posts.length} estudo${posts.length > 1 ? 's' : ''} publicado${posts.length > 1 ? 's' : ''} sobre escatologia.`
                  : 'Confira os estudos publicados nesta seção.'}
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
              title="Erro ao carregar estudos"
              message="Não foi possível carregar os estudos de escatologia no momento."
              onRetry={fetchPosts}
            />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  image={post.featured_image ? pb.files.getUrl(post, post.featured_image) : null}
                  category="Escatologia"
                  title={post.title}
                  summary={post.excerpt}
                  date={new Date(post.published_at || post.created).toLocaleDateString('pt-BR')}
                  path={`/escatologia/${post.slug}`}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nenhum artigo encontrado"
              message="Ainda não temos artigos publicados sobre Escatologia."
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}