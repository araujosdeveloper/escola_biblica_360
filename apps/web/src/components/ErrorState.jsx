
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorState({ title = 'Ocorreu um erro', message = 'Não foi possível carregar os dados. Por favor, tente novamente.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-2xl border border-border shadow-sm">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-2xl font-semibold text-card-foreground mb-2 font-['Poppins']">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Tentar Novamente
        </Button>
      )}
    </div>
  );
}
