export default function About() {
  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 neon-text text-glow-soft">
            Sobre a Copa Tomatão
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            Conheça a história e os organizadores do campeonato de League of Legends realizado por pura resenha entre amigos e conhecidos
          </p>
        </div>

        {/* História com Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-white neon-text mb-12 text-center">
            Nossa Jornada
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-30"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              <div className="glass-card p-8 rounded-xl glow-hover animate-fade-in-up relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full border-4 border-black"></div>
                <div className="md:w-1/2 md:pr-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">Setembro 2025</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">O Início</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Tudo começou com um grupo de amigos apaixonados por jogos online que queriam 
                    criar algo especial para a comunidade. A primeira edição conta com 4 times formados.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-xl glow-hover animate-fade-in-up relative" style={{animationDelay: "0.2s"}}>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-black"></div>
                <div className="md:w-1/2 md:ml-auto md:pl-8">
                  <div className="flex items-center gap-2 mb-4 md:justify-end">
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-bold">Outubro 2025</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3 md:text-right">Primeira Edição</h3>
                  <p className="text-gray-300 leading-relaxed md:text-right">
                    A Copa Tomatão está começando! Com sorteio de jogadores, transmissões ao vivo 
                    e muito mais diversão para todos os participantes.
                  </p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-xl glow-hover animate-fade-in-up relative" style={{animationDelay: "0.4s"}}>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black"></div>
                <div className="md:w-1/2 md:pr-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">Futuro</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">O Que Vem Por Aí</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Estamos sempre evoluindo! Planejamos novas modalidades, parcerias e formas 
                    inovadoras de tornar a experiência ainda mais incrível.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizadores */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-white neon-text mb-12 text-center">
            Equipe Organizadora
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl text-center glow-hover animate-fade-in-up">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-soft">
                <span className="text-4xl font-bold text-white">ZT</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white neon-text mb-2">Zeca Tomatão</h3>
              <p className="text-primary font-semibold mb-4">Fundador & CEO</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Visionário por trás da Copa Tomatão. Apaixonado por LoL e por criar experiências 
                únicas para a comunidade.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center glow-hover animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center glow-soft">
                <span className="text-4xl font-bold text-white">W</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white neon-text mb-2">Wel</h3>
              <p className="text-secondary font-semibold mb-4">Desenvolvedor & Responsável pelo Site</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Responsável por toda a infraestrutura técnica, site 
                e desenvolvimento da plataforma do torneio.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center glow-hover animate-fade-in-up" style={{animationDelay: "0.4s"}}>
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center glow-soft">
                <span className="text-4xl font-bold text-white">J</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white neon-text mb-2">Jamal</h3>
              <p className="text-green-400 font-semibold mb-4">Responsável pelas Transmissões</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Responsável por toda a parte de transmissões ao vivo, 
                streaming e cobertura dos jogos do torneio.
              </p>
            </div>
          </div>
        </div>

        {/* Valores com Animações */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-white neon-text mb-12 text-center">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl text-center glow-hover tilt-hover animate-fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-floating">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white neon-text mb-4">Fair Play</h3>
              <p className="text-gray-300 leading-relaxed">
                Acreditamos que a competição saudável e o respeito mútuo são fundamentais 
                para criar um ambiente divertido para todos.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center glow-hover tilt-hover animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-floating" style={{animationDelay: "0.5s"}}>
                <span className="text-3xl">🎮</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white neon-text mb-4">Diversão</h3>
              <p className="text-gray-300 leading-relaxed">
                O principal objetivo é se divertir! Ganhar é bom, mas se divertir jogando 
                com os amigos é ainda melhor.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl text-center glow-hover tilt-hover animate-fade-in-up" style={{animationDelay: "0.4s"}}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-floating" style={{animationDelay: "1s"}}>
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white neon-text mb-4">Comunidade</h3>
              <p className="text-gray-300 leading-relaxed">
                Fortalecer os laços entre jogadores e criar conexões duradouras através 
                da paixão compartilhada por League of Legends.
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="glass-card p-12 rounded-xl glow-hover animate-fade-in-up" style={{animationDelay: "0.6s"}}>
          <h2 className="text-3xl font-heading font-bold text-white neon-text mb-12 text-center">
            Copa Tomatão em Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary neon-text mb-2 text-glow-soft">20</div>
              <div className="text-gray-400">Jogadores Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary neon-text mb-2 text-glow-soft">4</div>
              <div className="text-gray-400">Times Formados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 neon-text mb-2 text-glow-soft">1ª</div>
              <div className="text-gray-400">Edição</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 neon-text mb-2 text-glow-soft">100%</div>
              <div className="text-gray-400">Diversão Garantida</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
