
import React, { useState, useEffect } from 'react';
import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import { EmptyState } from '@/components/EmptyState.jsx';
import { ErrorState } from '@/components/ErrorState.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import pb from '@/lib/pocketbaseProductionClient.js';
import { User } from 'lucide-react';

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProfessores = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await pb.collection('professores').getList(1, 50, {
        filter: `status="active"`,
        sort: 'name',
        $autoCancel: false
      });
      setProfessores(res.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  return (
    <>
      <SEO 
        title="Professores - Escola Bíblica 360" 
        description="Conheça nossa equipe de professores e especialistas em ensino bíblico." 
      />

      <Header />
      <TitleSection 
        title="Nossos Professores" 
        description="Conheça a equipe dedicada ao ensino e edificação através da Palavra."
      />

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
            </div>
          ) : error ? (
            <ErrorState onRetry={fetchProfessores} />
          ) : professores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {professores.map((prof) => (
                <div key={prof.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mb-4 border-4 border-background shadow-sm">
                    {prof.photo ? (
                      <img src={pb.files.getUrl(prof, prof.photo)} alt={prof.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                        <User className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-['Poppins']">{prof.name}</h3>
                  {prof.especialidade && (
                    <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full mt-2 mb-4">
                      {prof.especialidade}
                    </span>
                  )}
                  <p className="text-muted-foreground text-sm line-clamp-3 mt-2">{prof.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Nenhum professor encontrado" message="Ainda não temos professores cadastrados no diretório." />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
