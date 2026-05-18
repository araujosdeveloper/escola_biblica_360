
import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function PracticalExample() {
  return (
    <div className="bg-secondary rounded-3xl p-6 md:p-10 border border-border shadow-sm my-12">
      <div className="flex items-center gap-3 mb-8">
        <CheckCircle2 className="w-8 h-8 text-[hsl(var(--success))]" />
        <h3 className="text-2xl font-bold text-secondary-foreground m-0">
          Aplicação Prática: Romanos 3:23
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Preenchimento no Painel
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Title (Título)</label>
                <div className="bg-input border border-border rounded-lg p-3 text-foreground font-medium text-sm">
                  O Significado de Romanos 3:23 para Hoje
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Content (Conteúdo)</label>
                <div className="bg-input border border-border rounded-lg p-3 text-foreground text-sm line-clamp-3">
                  <p>"Porque todos pecaram e destituídos estão da glória de Deus." Este versículo central resume a condição humana e a necessidade absoluta da graça redentora. Através da justificação pela fé, somos restaurados à comunhão com o Criador.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Category (Categoria)</label>
                  <div className="bg-input border border-border rounded-lg p-3 text-foreground text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" /> Estudos Bíblicos
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Status</label>
                  <div className="bg-[hsl(var(--success))]/10 border border-[hsl(var(--success))]/20 text-[hsl(var(--success))] rounded-lg p-3 text-sm font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--success))]"></div> Published
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Featured Image (Imagem)</label>
                <div className="bg-input border border-border border-dashed rounded-lg p-4 text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <ImageIcon className="w-5 h-5" /> romanos-3-23-capa.jpg (1200x630)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="w-12 h-12 bg-background rounded-full shadow-md flex items-center justify-center border border-border">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border h-full">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground p-6 pb-2">
              Resultado no Site
            </h4>
            
            <div className="p-6 pt-2">
              <div className="w-full h-40 bg-muted rounded-xl mb-4 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=800" 
                  alt="Bíblia aberta" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-accent text-accent-foreground border-none font-semibold">
                    Estudos Bíblicos
                  </Badge>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground font-['Poppins'] mb-2 leading-tight">
                O Significado de Romanos 3:23 para Hoje
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                "Porque todos pecaram e destituídos estão da glória de Deus." Este versículo central resume a condição humana e a necessidade absoluta da graça redentora. Através da justificação pela fé, somos restaurados à comunhão com o Criador.
              </p>
              
              <div className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                <span>Publicado hoje</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>Equipe Escola Bíblica 360</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticalExample;
