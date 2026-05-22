
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  ChevronDown,
  Menu,
  ArrowRight,
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

  const allMenuPaths = useMemo(() => {
    return menuGroups.flatMap((group) => [
      group.path,
      ...group.items.map(([, path]) => path),
    ]);
  }, []);

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
    relative inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs xl:text-sm font-semibold
    transition-all duration-200 whitespace-nowrap outline-none
    ${active
      ? 'text-accent bg-primary-medium/70'
      : 'text-primary-foreground/85 hover:text-accent hover:bg-primary-medium/60'}
  `;

  return (
    <header className="sticky top-0 z-50 border-b border-primary-medium/80 bg-primary/95 shadow-md backdrop-blur-xl">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            to="/"
            className="group z-50 flex flex-shrink-0 items-center gap-2"
            aria-label="Ir para a página inicial"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent shadow-sm transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="h-4 w-4 text-accent-foreground" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="whitespace-nowrap font-['Poppins'] text-sm font-bold tracking-tight text-primary-foreground md:text-base">
                Escola Bíblica 360
              </span>
              <span className="whitespace-nowrap text-[8px] text-primary-foreground/65 md:text-[9px]">
                Conhecimento em todas as dimensões
              </span>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            <Link to="/" className={navLinkClass(currentPath === '/')}>
              Home
            </Link>

            {menuGroups.map((group) => (
              <DropdownMenu key={group.title}>
                <DropdownMenuTrigger className={navLinkClass(isGroupActive(group))}>
                  {group.title}
                  <ChevronDown className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="center"
                  className="w-[360px] overflow-hidden rounded-2xl border-border bg-card p-0 text-card-foreground shadow-2xl"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary p-5 text-primary-foreground">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {group.title}
                    </p>

                    <p className="text-sm leading-6 text-primary-foreground/80">
                      {group.description}
                    </p>
                  </div>

                  <div className="p-3">
                    <Link
                      to={group.path}
                      className="mb-2 flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      Ver tudo em {group.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div className="grid grid-cols-1 gap-1">
                      {group.items.map(([label, path]) => (
                        <Link
                          key={path}
                          to={path}
                          className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                        >
                          <span>{label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          <div className="hidden flex-shrink-0 xl:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/50" />

              <Input
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-9 w-48 rounded-full border-transparent bg-primary-medium pl-9 text-sm text-primary-foreground placeholder:text-primary-foreground/50 transition-all focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent 2xl:w-56"
              />
            </form>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-primary-foreground hover:bg-primary-medium hover:text-accent"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[320px] overflow-y-auto border-l-primary-medium bg-primary text-primary-foreground sm:w-[420px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left font-['Poppins'] text-primary-foreground">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/50" />

                  <Input
                    type="search"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-10 w-full rounded-full border-transparent bg-primary-medium pl-9 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </form>

                <nav className="flex flex-col gap-5">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-3 py-2 text-lg font-semibold transition-colors hover:bg-primary-medium hover:text-accent"
                  >
                    Home
                  </Link>

                  {menuGroups.map((group) => (
                    <div key={group.title} className="rounded-2xl border border-primary-medium/80 bg-primary-medium/30 p-4">
                      <Link
                        to={group.path}
                        onClick={() => setIsOpen(false)}
                        className="mb-3 block text-sm font-semibold uppercase tracking-wider text-accent"
                      >
                        {group.title}
                      </Link>

                      <div className="flex flex-col gap-1">
                        {group.items.map(([label, path]) => (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-primary-foreground/85 transition-colors hover:bg-primary hover:text-accent"
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