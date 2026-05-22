
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const footerGroups = [
  {
    title: 'Conteúdo',
    links: [
      ['Estudos Bíblicos', '/estudos-biblicos'],
      ['Lições EBD', '/licoes-ebd'],
      ['Teologia Pentecostal', '/categoria/teologia-pentecostal'],
      ['Escatologia', '/escatologia'],
      ['Sermões', '/sermoes'],
      ['Infantil', '/infantil'],
    ],
  },
  {
    title: 'Recursos',
    links: [
      ['Downloads', '/downloads'],
      ['Mapas Mentais', '/categoria/mapas-mentais'],
      ['PDFs', '/categoria/pdfs'],
      ['Slides', '/categoria/slides'],
      ['Professores', '/professores'],
    ],
  },
  {
    title: 'Institucional',
    links: [
      ['Sobre o projeto', '/sobre'],
      ['Contato', '/contato'],
      ['Política de Privacidade', '/politica-de-privacidade'],
      ['Termos de Uso', '/termos-de-uso'],
      ['Painel Admin', '/admin/login'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-primary-medium bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-secondary/90" />

      <div className="container relative z-10 pt-16 pb-8">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="group mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent shadow-sm transition-transform duration-300 group-hover:scale-105">
                <BookOpen className="h-6 w-6 text-accent-foreground" />
              </div>

              <div>
                <span className="block font-['Poppins'] text-xl font-bold leading-tight">
                  Escola Bíblica 360
                </span>
                <span className="text-xs text-primary-foreground/65">
                  Conhecimento em todas as dimensões
                </span>
              </div>
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-7 text-primary-foreground/75">
              Uma plataforma cristã dedicada a estudos bíblicos, Escola Bíblica Dominical,
              teologia, sermões e materiais de apoio para professores, alunos e amantes da Palavra.
            </p>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent">
              <ShieldCheck className="h-4 w-4" />
              Conteúdo cristão educacional
            </div>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-5 font-['Poppins'] text-sm font-bold uppercase tracking-[0.18em] text-accent">
                    {group.title}
                  </h3>

                  <ul className="space-y-3">
                    {group.links.map(([label, path]) => (
                      <li key={path}>
                        <Link
                          to={path}
                          className="group inline-flex items-center gap-2 text-sm text-primary-foreground/75 transition-colors hover:text-accent"
                        >
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100" />
                          <span>{label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/10 p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-['Poppins'] text-lg font-bold">
                Fale conosco
              </h3>

              <p className="mb-5 text-sm leading-7 text-primary-foreground/75">
                Tem dúvidas, sugestões ou deseja contribuir com o projeto? Entre em contato conosco.
              </p>

              <a
                href="mailto:contato@escolabiblica360.com"
                className="group flex items-start gap-3 rounded-2xl border border-primary-foreground/10 bg-primary/30 p-4 transition-colors hover:border-accent/40"
              >
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />

                <div>
                  <p className="text-sm font-semibold">E-mail</p>
                  <p className="break-all text-sm text-primary-foreground/70 group-hover:text-accent">
                    contato@escolabiblica360.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-primary-foreground/55 md:text-left">
            © {new Date().getFullYear()} Escola Bíblica 360. Todos os direitos reservados.
          </p>

          <p className="text-center text-xs text-primary-foreground/45 md:text-right">
            Desenvolvido para ensino bíblico, formação cristã e apoio à Escola Bíblica Dominical.
          </p>
        </div>
      </div>
    </footer>
  );
}