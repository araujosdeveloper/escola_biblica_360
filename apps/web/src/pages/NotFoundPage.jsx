
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Página não encontrada - Escola Bíblica 360</title>
        <meta name="description" content="A página que você procura não existe." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center py-24 bg-background min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-['Poppins'] mb-4">
          Página não encontrada
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="/">
            <Home className="w-5 h-5 mr-2" />
            Voltar para o Início
          </Link>
        </Button>
      </main>

      <Footer />
    </>
  );
}
