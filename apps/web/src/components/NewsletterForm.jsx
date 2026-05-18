
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await pb.collection('newsletter_subscribers').create({
        email,
        status: 'active',
        date_subscribed: new Date().toISOString()
      }, { $autoCancel: false });
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      toast.error('Erro ao se inscrever. Talvez o e-mail já esteja cadastrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent"
      />
      <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
        Inscrever
      </Button>
    </form>
  );
}
