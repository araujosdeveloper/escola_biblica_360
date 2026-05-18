
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-medium">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
                <BookOpen className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold font-['Poppins']">Escola Bíblica 360</span>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6 max-w-sm">
              Sua plataforma completa para estudos bíblicos, materiais EBD, recursos para professores e crescimento espiritual.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors" aria-label="YouTube"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-['Poppins']">Conteúdo</h3>
            <ul className="space-y-3">
              <li><Link to="/estudos-biblicos" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Estudos Bíblicos</Link></li>
              <li><Link to="/licoes-ebd" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Lições EBD</Link></li>
              <li><Link to="/escatologia" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Escatologia</Link></li>
              <li><Link to="/sermoes" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Sermões</Link></li>
              <li><Link to="/infantil" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Infantil</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-['Poppins']">Recursos & Institucional</h3>
            <ul className="space-y-3">
              <li><Link to="/professores" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Professores</Link></li>
              <li><Link to="/downloads" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Downloads</Link></li>
              <li><Link to="/sobre" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Contato</Link></li>
              <li><Link to="/admin/login" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Painel Admin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 font-['Poppins']">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">E-mail</p>
                  <a href="mailto:contato@escolabiblica360.com" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">contato@escolabiblica360.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-medium flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60 text-center md:text-left">
            © {new Date().getFullYear()} Escola Bíblica 360. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Política de Privacidade</Link>
            <Link to="/" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
