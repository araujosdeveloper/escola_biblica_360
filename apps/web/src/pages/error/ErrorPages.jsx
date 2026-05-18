
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ServerCrash, WifiOff, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BaseErrorPage = ({ icon: Icon, title, description, actionText = "Voltar para o Início", actionLink = "/" }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8 shadow-sm">
      <Icon className="w-12 h-12 text-muted-foreground" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">{title}</h1>
    <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
      {description}
    </p>
    <Button asChild size="lg" className="rounded-full px-8">
      <Link to={actionLink}>{actionText}</Link>
    </Button>
  </div>
);

export const NotFoundPage = () => (
  <BaseErrorPage 
    icon={AlertTriangle}
    title="Página não encontrada"
    description="A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível."
  />
);

export const ServerErrorPage = () => (
  <BaseErrorPage 
    icon={ServerCrash}
    title="Erro Interno"
    description="Nossos servidores estão enfrentando problemas. Nossa equipe técnica já foi notificada. Por favor, tente novamente mais tarde."
  />
);

export const ServiceUnavailablePage = () => (
  <BaseErrorPage 
    icon={ServerCrash}
    title="Serviço Indisponível"
    description="O sistema está em manutenção no momento para melhorias. Voltaremos em breve."
  />
);

export const OfflinePage = () => (
  <BaseErrorPage 
    icon={WifiOff}
    title="Sem Conexão"
    description="Você parece estar offline. Verifique sua conexão com a internet e tente novamente."
    actionText="Tentar Novamente"
    actionLink={window.location.pathname}
  />
);

export const TimeoutPage = () => (
  <BaseErrorPage 
    icon={Clock}
    title="Tempo Esgotado"
    description="A requisição demorou muito para responder. Por favor, tente novamente."
    actionText="Tentar Novamente"
    actionLink={window.location.pathname}
  />
);
