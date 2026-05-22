
import React from 'react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorState({
  title = 'Ocorreu um erro',
  message = 'Não foi possível carregar os dados. Por favor, tente novamente.',
  onRetry,
  compact = false,
  fullHeight = false,
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center
        rounded-3xl border border-border bg-card shadow-sm
        px-6
        ${compact ? 'py-10' : 'py-16'}
        ${fullHeight ? 'min-h-[60vh]' : ''}
      `}
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>

      <h3 className="font-['Poppins'] text-2xl font-bold text-card-foreground">
        {title}
      </h3>

      <p className="mt-3 max-w-lg text-muted-foreground leading-7">
        {message}
      </p>

      {typeof navigator !== 'undefined' && !navigator.onLine && (
        <div className="mt-5 flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          <WifiOff className="h-4 w-4" />
          Sem conexão com a internet
        </div>
      )}

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-8 gap-2 rounded-2xl px-6"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}