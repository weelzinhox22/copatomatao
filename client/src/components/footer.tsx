import { Link } from "wouter";

export default function Footer() {
  const socialLinks = [
    { name: "Discord", icon: "fab fa-discord", href: "#" },
    { name: "Twitter", icon: "fab fa-twitter", href: "#" },
    { name: "Instagram", icon: "fab fa-instagram", href: "#" },
    { name: "YouTube", icon: "fab fa-youtube", href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold brand-text mb-4" data-testid="text-footer-title">
              Copa Tomatão
            </h3>
            <p className="text-muted-foreground text-sm mb-4" data-testid="text-footer-description">
              O campeonato de League of Legends da nossa comunidade. 
              Conectando jogadores e criando momentos épicos.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid={`link-social-${link.name.toLowerCase()}`}
                  aria-label={link.name}
                >
                  <i className={`${link.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-tournament-title">Campeonato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/tournament" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="link-bracket"
                >
                  Chaveamento
                </Link>
              </li>
              <li>
                <Link 
                  href="/tournament" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="link-calendar"
                >
                  Calendário
                </Link>
              </li>
              <li>
                <Link 
                  href="/rules" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="link-rules"
                >
                  Regras
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-prizes">
                  Premiação
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-participants-title">Participantes</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/teams" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="link-teams"
                >
                  Times
                </Link>
              </li>
              <li>
                <Link 
                  href="/players" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="link-players"
                >
                  Jogadores
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-stats">
                  Estatísticas
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-rankings">
                  Rankings
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-support-title">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-faq">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-contact">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-bug-report">
                  Reportar Bug
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="link-privacy">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            © Copa Tomatão. Todos os direitos reservados. 
            Campeonato da comunidade de League of Legends.
          </p>
        </div>
      </div>
    </footer>
  );
}
