
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TitleSection from '@/components/TitleSection.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseProductionClient.js';

export default function ContatoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Por favor, preencha todos os campos do formulário.');
      return;
    }

    setIsLoading(true);
    try {
      await pb.collection('contact_messages').create({
        ...formData,
        status: 'new'
      }, { $autoCancel: false });

      toast.success('Recebemos sua mensagem e responderemos em breve.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contato - Escola Bíblica 360</title>
        <meta name="description" content="Entre em contato conosco. Estamos prontos para responder suas dúvidas e ouvir suas sugestões." />
      </Helmet>

      <Header />
      <TitleSection title="Contato" description="Estamos prontos para responder suas dúvidas, ouvir suas sugestões e ajudá-lo no que for necessário." />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 font-['Poppins']">Envie sua mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Seu nome" className="mt-2 text-foreground" required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="mt-2 text-foreground" required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="Sobre o que você quer falar?" className="mt-2 text-foreground" required disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Escreva sua mensagem aqui..." rows={6} className="mt-2 text-foreground resize-none" required disabled={isLoading} />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold">
                  {isLoading ? 'Enviando...' : 'Enviar mensagem'}
                </Button>
              </form>
            </div>

            <div className="lg:pl-8">
              <h2 className="text-2xl font-bold text-foreground mb-8 font-['Poppins']">Informações de contato</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-accent" />
                  </div>
                  <div className="mt-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 font-['Poppins']">Email</h3>
                    <a href="mailto:contato@escolabiblica360.com" className="text-muted-foreground hover:text-accent transition-colors duration-200">contato@escolabiblica360.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-accent" />
                  </div>
                  <div className="mt-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 font-['Poppins']">Telefone</h3>
                    <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <div className="mt-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 font-['Poppins']">Localização</h3>
                    <p className="text-muted-foreground">Atendimento online em todo o Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
