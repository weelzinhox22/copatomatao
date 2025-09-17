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
            <h3 className="text-xl font-gaming font-bold gradient-text mb-4" data-testid="text-footer-title">
              LoL Championship
            </h3>
            <p className="text-muted-foreground text-sm mb-4" data-testid="text-footer-description">
              O maior campeonato de League of Legends do Brasil. 
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
                <Link href="/tournament" data-testid="link-bracket">
                  <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Chaveamento
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/tournament" data-testid="link-calendar">
                  <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Calendário
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/rules" data-testid="link-rules">
                  <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Regras
                  </a>
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
                <Link href="/teams" data-testid="link-teams">
                  <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Times
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/players" data-testid="link-players">
                  <a className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Jogadores
                  </a>
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
            © 2024 LoL Championship. Todos os direitos reservados. 
            League of Legends é uma marca registrada da Riot Games, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
