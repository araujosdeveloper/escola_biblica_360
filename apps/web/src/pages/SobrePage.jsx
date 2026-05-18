
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Eye, Heart } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';

export default function SobrePage() {
  return (
    <>
      <Helmet>
        <title>Sobre - Escola Bíblica 360</title>
        <meta name="description" content="Conheça a missão, visão e valores da Escola Bíblica 360. Nossa história e compromisso com o ensino bíblico de qualidade." />
      </Helmet>

      <Header />
      <TitleSection 
        title="Sobre Escola Bíblica 360" 
        description="Conheça nossa história, missão e compromisso com o ensino bíblico de qualidade."
      />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6 font-['Poppins']">Nossa história</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A Escola Bíblica 360 nasceu do desejo de democratizar o acesso a conteúdos bíblicos de qualidade. Percebemos que muitos professores de EBD, líderes e estudantes da Palavra enfrentavam dificuldades para encontrar materiais organizados, confiáveis e de fácil acesso.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-12">
                Desde então, temos trabalhado para criar uma plataforma completa que reúne estudos bíblicos, lições para EBD, recursos para professores, conteúdos sobre escatologia e muito mais. Nosso objetivo é equipar a igreja com ferramentas que facilitem o ensino e o aprendizado das Escrituras.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-['Poppins']">Missão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Equipar a igreja com recursos bíblicos de qualidade para o ensino e crescimento espiritual.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-['Poppins']">Visão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser referência em conteúdo bíblico digital, alcançando igrejas e estudantes em todo o Brasil.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-['Poppins']">Valores</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fidelidade bíblica, excelência no ensino, acessibilidade e compromisso com a verdade.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-6 font-['Poppins']">Nosso compromisso</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Todo o conteúdo disponibilizado na Escola Bíblica 360 é cuidadosamente elaborado e revisado por educadores cristãos experientes. Nosso compromisso é com a fidelidade às Escrituras e a excelência pedagógica.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Acreditamos que o conhecimento bíblico deve ser acessível a todos, por isso oferecemos a maior parte de nossos recursos gratuitamente. Nosso desejo é ver vidas transformadas pelo poder da Palavra de Deus.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
