import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Menu,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';

const menuGroups = [
  {
    title: 'Estudos Bíblicos',
    path: '/estudos-biblicos',
    description: 'Estudos organizados para aprofundar o conhecimento das Escrituras.',
    items: [
      ['Antigo Testamento', '/categoria/antigo-testamento'],
      ['Novo Testamento', '/categoria/novo-testamento'],
      ['Personagens Bíblicos', '/categoria/personagens-biblicos'],
      ['Doutrinas Bíblicas', '/categoria/doutrinas-biblicas'],
      ['Vida Cristã', '/categoria/vida-crista'],
    ],
  },
  {
    title: 'EBD',
    path: '/licoes-ebd',
    description: 'Materiais de apoio para Escola Bíblica Dominical.',
    items: [
      ['Adultos', '/categoria/adultos'],
      ['Jovens', '/categoria/jovens'],
      ['Juvenis', '/categoria/juvenis'],
      ['Crianças', '/categoria/criancas'],
      ['Lições Comentadas', '/categoria/licoes-comentadas'],
    ],
  },
  {
    title: 'Teologia',
    path: '/categoria/teologia',
    description: 'Temas doutrinários e estudos teológicos para formação cristã.',
    items: [
      ['Teologia Pentecostal', '/categoria/teologia-pentecostal'],
      ['Escatologia', '/escatologia'],
      ['Soteriologia', '/categoria/soteriologia'],
      ['Pneumatologia', '/categoria/pneumatologia'],
      ['Cristologia', '/categoria/cristologia'],
    ],
  },
  {
    title: 'Sermões',
    path: '/sermoes',
    description: 'Esboços e conteúdos para pregação, ensino e edificação.',
    items: [
      ['Sermões Expositivos', '/categoria/sermoes-expositivos'],
      ['Sermões Temáticos', '/categoria/sermoes-tematicos'],
      ['Sermões Doutrinários', '/categoria/sermoes-doutrinarios'],
      ['Missões', '/categoria/missoes'],
      ['Avivamento', '/categoria/avivamento'],
    ],
  },
  {
    title: 'Recursos',
    path: '/downloads',
    description: 'Materiais práticos para estudo, ensino e preparação de aulas.',
    items: [
      ['Mapas Mentais', '/categoria/mapas-mentais'],
      ['PDFs', '/categoria/pdfs'],
      ['Slides', '/categoria/slides'],
      ['Downloads', '/downloads'],
      ['Estudos em PDF', '/categoria/estudos-em-pdf'],
    ],
  },
  {
    title: 'Institucional',
    path: '/sobre',
    description: 'Conheça o projeto, professores e canais de contato.',
    items: [
      ['Sobre', '/sobre'],
      ['Contato', '/contato'],
      ['Professores', '/professores'],
    ],
  },
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/busca?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const isGroupActive = (group) => {
    return isActive(group.path) || group.items.some(([, path]) => isActive(path));
  };

  const navLinkClass = (active = false) => `
    group relative inline-flex items-center gap-1.5 px-2.5 py-2 text-xs xl:text-sm font-semibold
    transition-all duration-200 whitespace-nowrap outline-none
    ${active
      ? 'text-[#f6d66b]'
      : 'text-white/92 hover:text-[#f6d66b]'}
  `;

  return (
    <header className="sticky top-0 z-50 border-b border-[#d4af37]/25 bg-[#050b12] shadow-[0_18px_50px_rgba(0,0,0,0.42)]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.18),transparent_30%),linear-gradient(90deg,rgba(212,175,55,0.10),transparent_30%,transparent_70%,rgba(212,175,55,0.08))]" />

      <div className="container relative">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            to="/"
            className="group z-50 flex flex-shrink-0 items-center gap-3"
            aria-label="Ir para a página inicial"
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37]/60 bg-[#d4af37]/16 text-[#f6d66b] shadow-[0_0_30px_rgba(212,175,55,0.22)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#d4af37] group-hover:text-[#07131f]">
              <BookOpen className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#f6d66b] shadow-[0_0_18px_rgba(246,214,107,0.9)]" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="whitespace-nowrap font-['Poppins'] text-lg font-extrabold tracking-tight text-white md:text-xl">
                Escola Bíblica <span className="text-[#f6d66b]">360</span>
              </span>

              <span className="mt-1 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.22em] text-[#d7e6ef] md:text-[10px]">
                Conhecimento em todas as dimensões
              </span>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-3">
            <Link to="/" className={navLinkClass(currentPath === '/')}>
              Home
              <span
                className={`absolute -bottom-1 left-2 right-2 h-px rounded-full bg-[#d4af37] transition-all duration-300 ${
                  currentPath === '/' ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                }`}
              />
            </Link>

            {menuGroups.map((group) => (
              <DropdownMenu key={group.title}>
                <DropdownMenuTrigger className={navLinkClass(isGroupActive(group))}>
                  {group.title}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  <span
                    className={`absolute -bottom-1 left-2 right-2 h-px rounded-full bg-[#d4af37] transition-all duration-300 ${
                      isGroupActive(group) ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                    }`}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="center"
                  className="w-[390px] overflow-hidden rounded-3xl border border-[#d4af37]/25 bg-[#07131f]/98 p-0 text-white shadow-2xl shadow-black/45 backdrop-blur-2xl"
                >
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.24),transparent_35%),linear-gradient(135deg,#08131f,#102f45)] p-6">
                    <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-white/5 text-[#f6d66b]">
                      <BookOpen className="h-7 w-7" />
                    </div>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f6d66b]">
                      {group.title}
                    </p>

                    <p className="max-w-[270px] text-sm leading-6 text-white/82">
                      {group.description}
                    </p>
                  </div>

                  <div className="p-3">
                    <Link
                      to={group.path}
                      className="mb-2 flex items-center justify-between rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/12 px-4 py-3 text-sm font-bold text-[#f6d66b] transition-colors hover:bg-[#d4af37]/18"
                    >
                      Ver tudo em {group.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="grid grid-cols-1 gap-1">
                      {group.items.map(([label, path]) => (
                        <Link
                          key={path}
                          to={path}
                          className="group/item flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm text-white/76 transition-all hover:bg-white/[0.07] hover:text-white"
                        >
                          <span>{label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/item:translate-x-1 group-hover/item:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 items-center gap-3 xl:flex">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />

              <Input
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-44 rounded-full border border-white/14 bg-white/[0.08] pl-10 text-sm text-white placeholder:text-white/58 transition-all focus-visible:border-[#d4af37]/45 focus-visible:ring-2 focus-visible:ring-[#d4af37]/30 2xl:w-52"
              />
            </form>

            <Button
              asChild
              className="h-11 rounded-xl bg-gradient-to-r from-[#f6d66b] to-[#c89525] px-5 text-sm font-extrabold text-[#07131f] shadow-lg shadow-[#d4af37]/18 hover:from-[#ffe184] hover:to-[#d4af37]"
            >
              <Link to="/estudos-biblicos">
                Começar Estudos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-[#f6d66b] lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] overflow-y-auto border-l border-[#d4af37]/20 bg-[#050b12] text-white sm:w-[420px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left font-['Poppins'] text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-[#d4af37]/25 bg-white/[0.05] p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#f6d66b]">
                    <BookOpen className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="font-extrabold text-white">
                      Escola Bíblica <span className="text-[#f6d66b]">360</span>
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d7e6ef]">
                      Conhecimento em todas as dimensões
                    </p>
                  </div>
                </Link>

                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />

                  <Input
                    type="search"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-11 w-full rounded-full border border-white/14 bg-white/[0.08] pl-10 text-white placeholder:text-white/58 focus-visible:ring-2 focus-visible:ring-[#d4af37]/30"
                  />
                </form>

                <Button
                  asChild
                  className="h-12 rounded-xl bg-gradient-to-r from-[#f6d66b] to-[#c89525] font-extrabold text-[#07131f] hover:from-[#ffe184] hover:to-[#d4af37]"
                >
                  <Link to="/estudos-biblicos" onClick={() => setIsOpen(false)}>
                    Começar Estudos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <nav className="flex flex-col gap-5">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-3 py-2 text-lg font-semibold transition-colors hover:bg-white/[0.07] hover:text-[#f6d66b]"
                  >
                    Home
                  </Link>

                  {menuGroups.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <Link
                        to={group.path}
                        onClick={() => setIsOpen(false)}
                        className="mb-3 block text-sm font-bold uppercase tracking-wider text-[#f6d66b]"
                      >
                        {group.title}
                      </Link>

                      <p className="mb-3 text-sm leading-6 text-white/70">
                        {group.description}
                      </p>

                      <div className="flex flex-col gap-1">
                        {group.items.map(([label, path]) => (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl px-3 py-2 text-sm text-white/84 transition-colors hover:bg-white/[0.07] hover:text-[#f6d66b]"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;