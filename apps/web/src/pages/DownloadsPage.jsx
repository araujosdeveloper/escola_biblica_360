
import React, { useEffect, useState } from 'react';
import { Download as DownloadIcon, FileText } from 'lucide-react';
import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import { Button } from '@/components/ui/button';
import { DownloadCardSkeleton } from '@/components/LoadingSkeletons.jsx';
import { ErrorState } from '@/components/ErrorState.jsx';
import { EmptyState } from '@/components/EmptyState.jsx';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      setError(false);
      const records = await pb.collection('downloads').getFullList({
        filter: 'status="published"',
        sort: '-created',
        $autoCancel: false
      });
      setDownloads(records);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  return (
    <>
      <SEO 
        title="Downloads e Materiais - Escola Bíblica 360" 
        description="Baixe mapas mentais, PDFs, slides e materiais didáticos para enriquecer suas aulas e estudos bíblicos." 
      />

      <Header />
      <TitleSection 
        title="Downloads" 
        description="Baixe mapas mentais, PDFs, slides e materiais didáticos para enriquecer suas aulas e estudos bíblicos."
      />

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <DownloadCardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <ErrorState onRetry={fetchDownloads} />
          ) : downloads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {downloads.map((item, index) => {
                const fileUrl = item.file ? pb.files.getUrl(item, item.file) : '#';
                const coverUrl = item.cover_image ? pb.files.getUrl(item, item.cover_image) : null;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
                  >
                    {coverUrl && (
                      <div className="h-48 w-full overflow-hidden bg-muted">
                        <img src={coverUrl} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start gap-4 mb-4">
                        {!coverUrl && (
                          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-accent" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-foreground font-['Poppins'] line-clamp-2">
                            {item.title}
                          </h3>
                          {item.category && (
                            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full mt-2 inline-block">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-6 flex-grow">{item.description}</p>
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto shadow-sm"
                        onClick={() => { if (fileUrl !== '#') window.open(fileUrl, '_blank'); }}
                        disabled={fileUrl === '#'}
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        {fileUrl === '#' ? 'Indisponível' : 'Fazer Download'}
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <EmptyState title="Nenhum download disponível" message="Não há materiais disponíveis no momento." />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
