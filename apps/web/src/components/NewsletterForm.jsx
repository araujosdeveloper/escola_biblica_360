
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error('Informe seu e-mail.');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      toast.error('Informe um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      await pb.collection('newsletter_subscribers').create(
        {
          email: normalizedEmail,
          status: 'active',
          date_subscribed: new Date().toISOString(),
        },
        {
          $autoCancel: false,
        }
      );

      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
      setSubscribed(true);
    } catch {
      toast.error('Não foi possível cadastrar este e-mail. Talvez ele já esteja inscrito.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />

        <div>
          <p className="text-sm font-semibold">Inscrição confirmada</p>
          <p className="text-sm text-green-700/80">
            Você receberá nossos próximos conteúdos no seu e-mail.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        disabled={loading}
        className="min-h-11 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent"
      />

      <Button
        type="submit"
        disabled={loading}
        className="min-h-11 whitespace-nowrap bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Inscrever
      </Button>
    </form>
  );
}