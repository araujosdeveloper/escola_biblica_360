
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loggerService } from '@/services/loggerService.js';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    loggerService.error('React Component Error', error, { errorInfo });

    this.setState({
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-background px-4 py-16">
          <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            <h1 className="mb-4 font-['Poppins'] text-3xl font-bold text-foreground md:text-4xl">
              Algo deu errado
            </h1>

            <p className="mb-8 max-w-xl text-muted-foreground">
              Encontramos um erro inesperado ao carregar esta página. Você pode tentar novamente
              ou voltar para a página inicial.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-8 max-h-[360px] w-full overflow-auto rounded-2xl border border-border bg-muted p-5 text-left text-sm text-muted-foreground">
                <strong className="block text-foreground">
                  {this.state.error.toString()}
                </strong>

                <pre className="mt-4 whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={this.handleReload}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar novamente
              </Button>

              <Button
                onClick={this.handleGoHome}
                variant="outline"
                size="lg"
              >
                <Home className="mr-2 h-4 w-4" />
                Voltar ao início
              </Button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}