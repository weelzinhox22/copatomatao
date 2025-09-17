import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth, useLogout } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImage from '@/assets/copa tomataão.png';

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, isLoading } = useAuth();
  const logout = useLogout();

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/tournament", label: "Campeonato" },
    { href: "/teams", label: "Times" },
    { href: "/players", label: "Jogadores" },
    { href: "/draft", label: "Sorteio" },
    { href: "/watch", label: "Onde Assistir" },
    { href: "/rules", label: "Regras" },
    { href: "/about", label: "Sobre" },
  ];

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link href="/" data-testid="link-home" className="flex items-center">
              <img 
                src={logoImage} 
                alt="Copa Tomatão" 
                className="h-8 lg:h-10 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <div className="hidden lg:block">
              <div className="ml-6 flex items-baseline space-x-4 xl:space-x-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                      location === item.href 
                        ? "text-white bg-primary/20 glow-hover" 
                        : "text-gray-300 hover:text-primary hover:bg-white/5"
                    }`}
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center space-x-2 xl:space-x-3">
              {!isLoading && (
                user ? (
                  <div className="flex items-center space-x-2 xl:space-x-3">
                    <span className="text-xs xl:text-sm text-muted-foreground whitespace-nowrap" data-testid="text-username">
                      Olá, {user.username}
                    </span>
                    {user.role === "admin" && (
                      <Link href="/admin" data-testid="link-admin">
                        <Button variant="outline" size="sm" className="text-xs">
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      disabled={logout.isPending}
                      data-testid="button-logout"
                    >
                      Sair
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" data-testid="link-login">
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 text-xs" data-testid="button-login">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" data-testid="link-register">
                      <Button variant="outline" className="glass-card border-primary/30 text-white hover:bg-primary/20 glow-hover text-xs" data-testid="button-register">
                        Cadastrar
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
          
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location === item.href 
                      ? "text-foreground bg-muted" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Link>
              ))}
              
              {!isLoading && (
                <div className="pt-3 border-t border-border">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm text-muted-foreground" data-testid="text-mobile-username">
                        Olá, {user.username}
                      </div>
                      {user.role === "admin" && (
                        <Link href="/admin" data-testid="link-mobile-admin">
                          <Button variant="outline" className="w-full" size="sm">
                            Admin
                          </Button>
                        </Link>
                      )}
                      <Button 
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        variant="outline" 
                        className="w-full"
                        size="sm"
                        disabled={logout.isPending}
                        data-testid="button-mobile-logout"
                      >
                        Sair
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" data-testid="link-mobile-login">
                        <Button className="w-full minimal-hover" onClick={() => setIsMenuOpen(false)}>
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" data-testid="link-mobile-register">
                        <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                          Cadastrar
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
