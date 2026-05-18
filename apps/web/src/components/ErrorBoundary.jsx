
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loggerService } from '@/services/loggerService.js';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    loggerService.error('React Component Error', error, { errorInfo });
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4 font-['Poppins']">Ops! Algo deu errado.</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Encontramos um erro inesperado ao carregar esta página. Nossa equipe já foi notificada.
          </p>
          
          {import.meta.env.DEV && this.state.error && (
            <div className="bg-muted p-4 rounded-md text-left mb-8 max-w-2xl overflow-auto text-sm text-muted-foreground">
              <strong>{this.state.error.toString()}</strong>
              <pre className="mt-2">{this.state.errorInfo?.componentStack}</pre>
            </div>
          )}

          <Button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
