import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth, useLogout } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
    { href: "/watch", label: "Onde Assistir" },
    { href: "/rules", label: "Regras" },
  ];

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" data-testid="link-home">
              <h1 className="text-xl font-gaming font-bold gradient-text cursor-pointer">
                LoL Championship
              </h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location === item.href 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-primary"
                    }`}>
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {!isLoading && (
                user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground" data-testid="text-username">
                      Olá, {user.username}
                    </span>
                    {user.role === "admin" && (
                      <Link href="/admin" data-testid="link-admin">
                        <Button variant="outline" size="sm">
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      size="sm"
                      disabled={logout.isPending}
                      data-testid="button-logout"
                    >
                      Sair
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" data-testid="link-login">
                      <Button className="neon-glow" data-testid="button-login">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" data-testid="link-register">
                      <Button variant="outline" data-testid="button-register">
                        Cadastrar
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
          
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <a 
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location === item.href 
                        ? "text-foreground bg-muted" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
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
                        <Button className="w-full neon-glow" onClick={() => setIsMenuOpen(false)}>
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
