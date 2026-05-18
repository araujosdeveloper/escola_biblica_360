
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, BookOpen, ChevronDown, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;
  
  const getNavLinkClass = (path) => `
    text-sm font-medium transition-colors duration-200 
    ${isActive(path) ? 'text-accent' : 'text-primary-foreground hover:text-accent'}
  `;

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary-medium shadow-md">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0 z-50">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <BookOpen className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-primary-foreground font-['Poppins'] leading-tight tracking-tight">
                Escola Bíblica 360
              </span>
              <span className="text-[10px] md:text-xs text-primary-foreground/70 leading-tight">
                Conhecimento em todas as dimensões
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className={getNavLinkClass('/')}>Home</Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 outline-none ${getNavLinkClass('')}`}>
                Conteúdo <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card text-card-foreground border-border">
                <DropdownMenuItem asChild><Link to="/estudos-biblicos" className="w-full cursor-pointer hover:bg-muted">Estudos Bíblicos</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/licoes-ebd" className="w-full cursor-pointer hover:bg-muted">Lições EBD</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/escatologia" className="w-full cursor-pointer hover:bg-muted">Escatologia</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/sermoes" className="w-full cursor-pointer hover:bg-muted">Sermões</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/infantil" className="w-full cursor-pointer hover:bg-muted">Infantil</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 outline-none ${getNavLinkClass('')}`}>
                Recursos <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card text-card-foreground border-border">
                <DropdownMenuItem asChild><Link to="/professores" className="w-full cursor-pointer hover:bg-muted">Professores</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/downloads" className="w-full cursor-pointer hover:bg-muted">Downloads</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 outline-none ${getNavLinkClass('')}`}>
                Institucional <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card text-card-foreground border-border">
                <DropdownMenuItem asChild><Link to="/sobre" className="w-full cursor-pointer hover:bg-muted">Sobre</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/contato" className="w-full cursor-pointer hover:bg-muted">Contato</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-shrink-0 ml-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
              <Input
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48 xl:w-64 bg-primary-medium border-transparent text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent text-sm h-10 rounded-full transition-all"
              />
            </form>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground hover:bg-primary-medium hover:text-accent">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground border-l-primary-medium w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left text-primary-foreground font-['Poppins']">Menu</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 mt-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full bg-primary-medium border-transparent text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-2 focus-visible:ring-accent h-10 rounded-full"
                  />
                </form>

                <nav className="flex flex-col gap-4">
                  <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-accent transition-colors">Home</Link>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-primary-foreground/50 font-semibold uppercase tracking-wider">Conteúdo</span>
                    <Link to="/estudos-biblicos" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Estudos Bíblicos</Link>
                    <Link to="/licoes-ebd" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Lições EBD</Link>
                    <Link to="/escatologia" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Escatologia</Link>
                    <Link to="/sermoes" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Sermões</Link>
                    <Link to="/infantil" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Infantil</Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-primary-foreground/50 font-semibold uppercase tracking-wider">Recursos</span>
                    <Link to="/professores" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Professores</Link>
                    <Link to="/downloads" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Downloads</Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-primary-foreground/50 font-semibold uppercase tracking-wider">Institucional</span>
                    <Link to="/sobre" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Sobre</Link>
                    <Link to="/contato" onClick={() => setIsOpen(false)} className="pl-4 text-base hover:text-accent transition-colors">Contato</Link>
                  </div>
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
