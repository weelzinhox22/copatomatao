import React from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Eye, Share2, Bookmark, Clock } from 'lucide-react';

// Dados dos artigos
const articles = {
  "copa-tomatao-2025-inscricoes-abertas": {
    id: "1",
    title: "Copa Tomatão 2025: Inscrições abertas para o maior torneio da comunidade!",
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>O Maior Torneio da Comunidade Está de Volta!</h2>
        <p>É com grande alegria e emoção que anunciamos o retorno da <strong>Copa Tomatão 2025</strong>! O campeonato mais aguardado da comunidade está de volta com ainda mais emoção, diversão e competição de alto nível. Este ano prometemos uma experiência única e inesquecível para todos os participantes e espectadores.</p>
        
        <h3>🎯 O que esperar desta edição?</h3>
        <p>Esta edição da Copa Tomatão será especial! Preparamos novidades incríveis que vão revolucionar o cenário competitivo:</p>
        <ul>
          <li><strong>🏆 4 times confirmados</strong> com jogadores de elite da comunidade</li>
          <li><strong>🎲 Formato inovador</strong> com sorteio de oponentes para máxima emoção</li>
          <li><strong>📺 Transmissões ao vivo</strong> de todas as partidas com comentários profissionais</li>
          <li><strong>🏅 Hall dos Vencedores</strong> para eternizar os grandes campeões</li>
          <li><strong>📊 Análises detalhadas</strong> e highlights épicos de cada partida</li>
          <li><strong>🎮 Sistema de ranking</strong> atualizado em tempo real</li>
          <li><strong>🏆 Troféus exclusivos</strong> para os melhores jogadores</li>
        </ul>
        
        <h3>📝 Como participar?</h3>
        <p>As inscrições estão abertas até o final do mês e o processo é simples! Para participar da Copa Tomatão 2025, você precisa:</p>
        <ol>
          <li><strong>Conta no League of Legends:</strong> Ter uma conta ativa no servidor brasileiro</li>
          <li><strong>Disponibilidade:</strong> Estar disponível nos horários das partidas (fins de semana)</li>
          <li><strong>Espírito esportivo:</strong> Ter espírito esportivo e vontade de se divertir</li>
          <li><strong>Formulário:</strong> Preencher o formulário de inscrição completo</li>
          <li><strong>Confirmação:</strong> Aguardar confirmação da organização</li>
        </ol>
        
        <h3>👥 Times Confirmados</h3>
        <p>Já temos <strong>4 times confirmados</strong> para esta edição, cada um com sua própria identidade e estilo de jogo:</p>
        <ul>
          <li><strong>🦅 Zeca e os Urubus</strong> - Capitão: Theushubu (Veteranos experientes)</li>
          <li><strong>🌊 Kongs do Atlântico</strong> - Capitão: LDates (Força do nordeste)</li>
          <li><strong>⚔️ Os Fimos</strong> - Capitão: AZR Aldeath (Estratégia e experiência)</li>
          <li><strong>🎯 Te Fizguei</strong> - Capitão: Jamalzeralol (Inovação e criatividade)</li>
        </ul>
        
        <h3>📅 Cronograma do Torneio</h3>
        <p>O cronograma oficial será divulgado em breve, mas já sabemos que:</p>
        <ul>
          <li><strong>Inscrições:</strong> Até 30 de setembro</li>
          <li><strong>Sorteio:</strong> Primeira semana de outubro</li>
          <li><strong>Primeira fase:</strong> Segunda semana de outubro</li>
          <li><strong>Semifinais:</strong> Terceira semana de outubro</li>
          <li><strong>Final:</strong> Última semana de outubro</li>
        </ul>
        
        <h3>🏆 Sistema de Premiação</h3>
        <p>Este ano teremos um sistema de premiação especial:</p>
        <ul>
          <li><strong>🥇 1º Lugar:</strong> Troféu da Copa Tomatão + Badge exclusivo</li>
          <li><strong>🥈 2º Lugar:</strong> Medalha de prata + Badge especial</li>
          <li><strong>🥉 3º Lugar:</strong> Medalha de bronze + Badge comemorativo</li>
          <li><strong>🏅 MVP:</strong> Badge de MVP + Reconhecimento especial</li>
          <li><strong>🎮 Melhor Play:</strong> Badge de melhor jogada da temporada</li>
        </ul>
        
        <h3>📱 Como acompanhar?</h3>
        <p>Fique ligado nas nossas redes sociais e no site para mais informações sobre:</p>
        <ul>
          <li><strong>📺 Transmissões:</strong> Links para transmissões ao vivo</li>
          <li><strong>📊 Estatísticas:</strong> Análises detalhadas das partidas</li>
          <li><strong>🎥 Highlights:</strong> Melhores momentos de cada jogo</li>
          <li><strong>📰 Notícias:</strong> Atualizações em tempo real</li>
          <li><strong>🏆 Ranking:</strong> Posições atualizadas dos times</li>
        </ul>
        
        <h3>🎉 Por que participar?</h3>
        <p>A Copa Tomatão não é apenas um torneio, é uma <strong>experiência única</strong> que une:</p>
        <ul>
          <li><strong>🤝 Comunidade:</strong> Conhecer novos jogadores e fazer amizades</li>
          <li><strong>📈 Evolução:</strong> Melhorar suas habilidades competitivas</li>
          <li><strong>🎮 Diversão:</strong> Momentos épicos e inesquecíveis</li>
          <li><strong>🏆 Competição:</strong> Testar suas habilidades contra os melhores</li>
          <li><strong>📚 Aprendizado:</strong> Estratégias e técnicas dos veteranos</li>
        </ul>
        
        <h3>🚀 Próximos Passos</h3>
        <p>Não perca esta oportunidade única de participar do maior campeonato da comunidade! As inscrições estão abertas e os lugares são limitados. Junte-se a nós nesta jornada épica rumo à glória!</p>
        
        <div class="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-xl border border-primary/30 mt-8">
          <h4 class="text-xl font-bold text-white mb-3">🎯 Ação Imediata!</h4>
          <p class="text-gray-300 mb-4">As inscrições estão abertas por tempo limitado. Não deixe para depois!</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>✅ Formulário de inscrição disponível</li>
            <li>✅ Confirmação em até 48h</li>
            <li>✅ Suporte completo da organização</li>
            <li>✅ Garantia de diversão e competição</li>
          </ul>
        </div>
        
        <p class="text-center text-lg font-semibold text-primary mt-8">🏆 <strong>Copa Tomatão 2025 - Onde os campeões nascem!</strong> 🏆</p>
      </div>
    `,
    author: "Admin Copa Tomatão",
    publishedAt: "2025-09-15T10:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    category: "Torneio",
    views: 1250,
    readTime: "8 min"
  },
  "zeca-urubus-campeao-copa-tomatao-2025": {
    id: "2",
    title: "Zeca e os Urubus conquistam o título da Copa Tomatão 2025!",
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>🏆 Uma Final Épica para a História!</h2>
        <p>Em uma das finais mais emocionantes e disputadas da história da Copa Tomatão, <strong>Zeca e os Urubus</strong> se sagraram campeões após uma batalha intensa e dramática contra Te Fizguei. A partida durou mais de 2 horas e 30 minutos, sendo marcada por momentos inesquecíveis, viradas épicas e uma demonstração de pura determinação e trabalho em equipe.</p>
        
        <h3>🛤️ O Caminho até a Glória</h3>
        <p>Zeca e os Urubus chegaram à final após uma campanha impressionante e consistente:</p>
        <ul>
          <li><strong>🎯 Primeira rodada:</strong> Vitória por 2-1 contra Kongs do Atlântico em uma série equilibrada</li>
          <li><strong>⚡ Final dos vencedores:</strong> Vitória por 3-1 contra Te Fizguei com domínio tático</li>
          <li><strong>📈 Performance consistente:</strong> Sempre demonstrando evolução a cada partida</li>
          <li><strong>🧠 Adaptação estratégica:</strong> Ajustando o estilo de jogo conforme necessário</li>
        </ul>
        
        <h3>⚔️ A Grande Final - Uma Batalha Épica</h3>
        <p>A partida começou equilibrada, com ambos os times mostrando grande qualidade técnica e estratégica. Te Fizguei, liderado pelo criativo Jamalzeralol, mostrou estratégias inovadoras e conseguiu uma vantagem inicial que deixou todos surpresos.</p>
        
        <p>No entanto, a <strong>experiência e determinação</strong> de Zeca e os Urubus falou mais alto. Theushubu, o capitão da equipe, foi eleito MVP da final após uma performance excepcional, coordenando perfeitamente sua equipe nos momentos mais decisivos e críticos da partida.</p>
        
        <h3>🎬 Momentos Decisivos da Final</h3>
        <p>Os momentos mais marcantes desta final histórica foram:</p>
        
        <h4>🎮 Game 1 - A Surpresa Inicial</h4>
        <p><strong>Te Fizguei vence com estratégia agressiva</strong> - O time apostou em uma composição não-meta que pegou os Urubus despreparados. Uma vitória dominante que mostrou que a final seria disputada.</p>
        
        <h4>⚖️ Game 2 - O Equilíbrio</h4>
        <p><strong>Zeca e os Urubus empatam com controle de objetivos</strong> - Os veteranos se adaptaram rapidamente e mostraram sua experiência, controlando o mapa e os objetivos de forma magistral.</p>
        
        <h4>🔥 Game 3 - A Virada Épica</h4>
        <p><strong>Virada épica dos Urubus com teamfight perfeita</strong> - Em um momento de desespero, os Urubus executaram uma teamfight perfeita que virou o jogo completamente. Um momento que ficará para a história!</p>
        
        <h4>🏆 Game 4 - A Coroação</h4>
        <p><strong>Domínio total dos Urubus para fechar a série</strong> - Com a moral alta, os campeões dominaram completamente o último jogo, mostrando porque mereciam o título.</p>
        
        <h3>👑 MVP da Final - Theushubu</h3>
        <p><strong>Theushubu</strong> foi eleito MVP da final por sua liderança excepcional e decisões estratégicas que levaram sua equipe à vitória. Suas características que fizeram a diferença:</p>
        <ul>
          <li><strong>🧠 Visão de jogo:</strong> Decisões estratégicas perfeitas nos momentos críticos</li>
          <li><strong>😌 Calma sob pressão:</strong> Mantendo a equipe focada mesmo quando perdendo</li>
          <li><strong>🎯 Precisão:</strong> Execução perfeita das estratégias planejadas</li>
          <li><strong>🤝 Liderança:</strong> Coordenando a equipe como um verdadeiro capitão</li>
          <li><strong>💪 Determinação:</strong> Nunca desistindo mesmo nos momentos mais difíceis</li>
        </ul>
        
        <h3>📊 Estatísticas da Final</h3>
        <p>Alguns números impressionantes desta final:</p>
        <ul>
          <li><strong>⏱️ Duração total:</strong> 2h 35min de pura emoção</li>
          <li><strong>🎯 KDA médio dos Urubus:</strong> 3.2 (excepcional para uma final)</li>
          <li><strong>🏰 Objetivos controlados:</strong> 78% de controle de dragões e barões</li>
          <li><strong>💰 Gold advantage:</strong> +15k no game decisivo</li>
          <li><strong>👀 Visão:</strong> 85% de controle de wards no mapa</li>
        </ul>
        
        <h3>🏅 Reconhecimento e Legado</h3>
        <p>Com esta vitória histórica, <strong>Zeca e os Urubus</strong> entram para a história da Copa Tomatão como os primeiros campeões do formato atual. Sua dedicação, trabalho em equipe e espírito esportivo são exemplos para toda a comunidade.</p>
        
        <p>Esta vitória representa muito mais que um título - representa a força da experiência, da determinação e do trabalho em equipe. Os Urubus mostraram que com foco, estratégia e união, qualquer desafio pode ser superado.</p>
        
        <h3>🎉 Celebração da Comunidade</h3>
        <p>A comunidade se uniu para celebrar esta conquista épica:</p>
        <ul>
          <li><strong>📱 Redes sociais:</strong> Mais de 500 posts celebrando a vitória</li>
          <li><strong>🎥 Highlights:</strong> Milhares de visualizações dos melhores momentos</li>
          <li><strong>💬 Comentários:</strong> Reconhecimento unânime da qualidade da final</li>
          <li><strong>🏆 Inspiração:</strong> Novos jogadores motivados a participar</li>
        </ul>
        
        <div class="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 p-6 rounded-xl border border-yellow-400/30 mt-8">
          <h4 class="text-xl font-bold text-white mb-3">🏆 Campeões da Copa Tomatão 2025</h4>
          <p class="text-gray-300 mb-4">Zeca e os Urubus - Os primeiros campeões do novo formato!</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>✅ Capitão: Theushubu (MVP da Final)</li>
            <li>✅ Vitória por 3-1 na final</li>
            <li>✅ Campanha perfeita no torneio</li>
            <li>✅ Exemplo de trabalho em equipe</li>
          </ul>
        </div>
        
        <p class="text-center text-lg font-semibold text-yellow-400 mt-8">🏆 <strong>Parabéns aos campeões! Zeca e os Urubus - Primeiros Campeões da Copa Tomatão!</strong> 🏆</p>
      </div>
    `,
    author: "Repórter LoL",
    publishedAt: "2025-09-28T22:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    category: "Campeão",
    views: 2100,
    readTime: "10 min"
  },
  "te-fizguei-estrategias-inovadoras": {
    id: "3",
    title: "Te Fizguei surpreende com estratégias inovadoras",
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>🎯 Inovação e Criatividade em Campo</h2>
        <p><strong>Te Fizguei</strong>, liderado pelo visionário capitão <strong>Jamalzeralol</strong>, surpreendeu a todos na semifinal contra Os Fimos com estratégias completamente inovadoras e revolucionárias que resultaram em uma vitória espetacular e muitos highlights para a história da Copa Tomatão.</p>
        
        <h3>🚀 A Estratégia Surpresa que Revolucionou o Jogo</h3>
        <p>Diferente do que todos esperavam, Te Fizguei apostou em uma <strong>composição não-meta</strong> que pegou Os Fimos completamente despreparados. A estratégia envolvia elementos nunca vistos antes:</p>
        <ul>
          <li><strong>🎮 Picks inesperados</strong> em todas as posições, quebrando completamente o meta</li>
          <li><strong>🗺️ Rotas não convencionais</strong> para objetivos, criando confusão total</li>
          <li><strong>⏰ Timing perfeito</strong> para teamfights, sempre atacando no momento certo</li>
          <li><strong>🤝 Coordenação impecável</strong> entre os jogadores, como se fossem uma mente única</li>
          <li><strong>🧠 Adaptação constante</strong> às mudanças do jogo em tempo real</li>
        </ul>
        
        <h3>🎬 Os Destaques da Partida Histórica</h3>
        <p>A partida foi marcada por vários momentos inesquecíveis que ficarão para a história:</p>
        
        <h4>🎮 Game 1 - A Surpresa Total</h4>
        <p>No primeiro game, Te Fizguei executou uma <strong>estratégia completamente nova</strong> que deixou Os Fimos sem resposta. A coordenação da equipe foi perfeita, resultando em uma vitória dominante que deixou todos os espectadores em choque.</p>
        
        <h4>⚡ Game 2 - A Adaptação dos Fimos</h4>
        <p>Os Fimos tentaram se adaptar rapidamente, mas Te Fizguei já havia preparado <strong>variações da estratégia original</strong>, mantendo a vantagem e vencendo novamente com uma performance ainda mais impressionante.</p>
        
        <h4>🏆 Game 3 - Fechamento com Chave de Ouro</h4>
        <p>No terceiro game, Te Fizguei executou a <strong>estratégia mais arriscada</strong>, mas também a mais eficaz, garantindo a vitória da série e a classificação para a final com uma demonstração de pura genialidade estratégica.</p>
        
        <h3>🧠 A Mente por Trás da Inovação</h3>
        <p><strong>Jamalzeralol</strong>, o capitão de Te Fizguei, revelou os segredos por trás das estratégias inovadoras:</p>
        <ul>
          <li><strong>📚 Estudo intensivo:</strong> Análise profunda dos padrões dos adversários</li>
          <li><strong>🎯 Pensamento lateral:</strong> Abordagem completamente diferente do jogo</li>
          <li><strong>🤝 Confiança na equipe:</strong> Apostando na capacidade de execução dos companheiros</li>
          <li><strong>⚡ Adaptabilidade:</strong> Mudando estratégias em tempo real conforme necessário</li>
          <li><strong>🎪 Elemento surpresa:</strong> Usando a criatividade como arma principal</li>
        </ul>
        
        <h3>📊 Estatísticas Impressionantes</h3>
        <p>Os números mostram o impacto das estratégias inovadoras:</p>
        <ul>
          <li><strong>🎯 Taxa de sucesso:</strong> 85% das estratégias executadas com sucesso</li>
          <li><strong>⚡ Tempo de reação:</strong> Adaptação em menos de 30 segundos</li>
          <li><strong>🏰 Controle de objetivos:</strong> 92% de taxa de sucesso</li>
          <li><strong>💰 Gold advantage:</strong> +12k em média por partida</li>
          <li><strong>👀 Visão de mapa:</strong> 90% de controle de wards</li>
        </ul>
        
        <h3>🌍 O Impacto na Comunidade</h3>
        <p>Esta partida mudou completamente a perspectiva sobre o que é possível no League of Legends competitivo. Te Fizguei provou que:</p>
        <ul>
          <li><strong>💡 Criatividade</strong> pode superar meta tradicional estabelecida</li>
          <li><strong>🤝 Trabalho em equipe</strong> é mais importante que picks individuais</li>
          <li><strong>📋 Preparação estratégica</strong> faz toda a diferença no resultado</li>
          <li><strong>🎯 Coragem</strong> para arriscar pode levar ao sucesso inesperado</li>
          <li><strong>🧠 Inovação</strong> é a chave para quebrar paradigmas</li>
        </ul>
        
        <h3>🎥 Highlights Épicos</h3>
        <p>Os momentos mais marcantes desta partida histórica:</p>
        <ul>
          <li><strong>🔥 Teamfight perfeita:</strong> Execução coordenada de 5 jogadores</li>
          <li><strong>🎯 Pick inovador:</strong> Campeão nunca usado em competições</li>
          <li><strong>⚡ Rotação surpresa:</strong> Movimento que pegou todos de surpresa</li>
          <li><strong>🏰 Objetivo roubado:</strong> Barão roubado com timing perfeito</li>
          <li><strong>🎪 Finalização épica:</strong> Nexus destruído com estratégia única</li>
        </ul>
        
        <h3>🚀 Preparação para a Final</h3>
        <p>Com esta vitória espetacular, Te Fizguei se classificou para a final contra Zeca e os Urubus. A comunidade está ansiosa para ver que outras <strong>surpresas revolucionárias</strong> eles têm preparadas para a grande final.</p>
        
        <p>Esta semifinal provou que Te Fizguei não é apenas um time, é uma <strong>força da inovação</strong> que está redefinindo o que é possível no League of Legends competitivo.</p>
        
        <div class="bg-gradient-to-r from-green-400/20 to-blue-500/20 p-6 rounded-xl border border-green-400/30 mt-8">
          <h4 class="text-xl font-bold text-white mb-3">🎯 Inovadores da Copa Tomatão</h4>
          <p class="text-gray-300 mb-4">Te Fizguei - Redefinindo o jogo com criatividade!</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>✅ Capitão: Jamalzeralol (Estrategista Visionário)</li>
            <li>✅ Vitória por 3-0 na semifinal</li>
            <li>✅ Estratégias revolucionárias</li>
            <li>✅ Exemplo de inovação e criatividade</li>
          </ul>
        </div>
        
        <p class="text-center text-lg font-semibold text-green-400 mt-8">🎯 <strong>Uma lição para todos: às vezes, pensar fora da caixa é a chave para o sucesso!</strong> 🎯</p>
      </div>
    `,
    author: "Analista Pro",
    publishedAt: "2025-09-26T20:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    category: "Highlights",
    views: 1800,
    readTime: "8 min"
  },
  "kongs-atlantico-forca-nordeste": {
    id: "4",
    title: "Kongs do Atlântico: A força do nordeste",
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>🌊 Representando a Força do Nordeste</h2>
        <p><strong>Kongs do Atlântico</strong>, liderados pelo experiente e carismático <strong>LDates</strong>, representa a força, determinação e orgulho do nordeste brasileiro no cenário competitivo. Conheça a história inspiradora por trás deste time que está surpreendendo a todos com sua garra, determinação e espírito de luta inabalável.</p>
        
        <h3>🏝️ A Origem do Time - Nasce uma Lenda</h3>
        <p>O time foi formado por jogadores experientes e apaixonados da região nordeste, unidos pela paixão pelo League of Legends e pelo desejo genuíno de representar sua região no maior campeonato da comunidade. Cada membro traz consigo a força característica do nordeste brasileiro.</p>
        
        <h3>👑 O Capitão LDates - Líder Natural</h3>
        <p><strong>LDates</strong>, o capitão da equipe, é conhecido por suas qualidades excepcionais:</p>
        <ul>
          <li><strong>🏆 Experiência</strong> sólida no cenário competitivo brasileiro</li>
          <li><strong>🎯 Liderança natural</strong> dentro e fora do jogo</li>
          <li><strong>🧠 Conhecimento estratégico</strong> profundo e detalhado do jogo</li>
          <li><strong>💪 Determinação</strong> inabalável em representar o nordeste</li>
          <li><strong>🤝 Espírito de equipe</strong> que inspira todos ao redor</li>
          <li><strong>🌊 Representatividade</strong> da cultura nordestina no esporte</li>
        </ul>
        
        <h3>⚔️ Filosofia de Jogo Única</h3>
        <p>Kongs do Atlântico desenvolveu uma filosofia de jogo única e característica:</p>
        <ul>
          <li><strong>🎯 Controle de objetivos</strong> como prioridade máxima absoluta</li>
          <li><strong>🤝 Coordenação perfeita</strong> em teamfights, como uma família</li>
          <li><strong>⚡ Adaptação rápida</strong> às situações mais adversas do jogo</li>
          <li><strong>❤️ Espírito de equipe</strong> acima de qualquer individualidade</li>
          <li><strong>🌊 Resistência</strong> característica do povo nordestino</li>
          <li><strong>🏆 Determinação</strong> para sempre dar o melhor de si</li>
        </ul>
        
        <h3>🏆 Campanha na Copa Tomatão 2025</h3>
        <p>Na Copa Tomatão 2025, Kongs do Atlântico mostrou toda sua força e determinação:</p>
        
        <h4>⚔️ Primeira Rodada - Uma Batalha Épica</h4>
        <p>Na primeira rodada contra Zeca e os Urubus, o time mostrou <strong>grande qualidade técnica</strong> e estratégica, mas acabou sendo derrotado por 2-1 em uma série muito equilibrada e emocionante que deixou todos impressionados.</p>
        
        <h4>🥉 Final dos Times em Segundo Lugar - A Redenção</h4>
        <p>Na final dos times em segundo lugar contra Os Fimos, Kongs do Atlântico demonstrou toda sua <strong>força interior</strong> e venceu por 2-1, garantindo o terceiro lugar no campeonato com uma performance inspiradora.</p>
        
        <h3>⭐ Destaques Individuais da Equipe</h3>
        <p>Cada jogador da equipe tem suas especialidades únicas que contribuem para o sucesso coletivo:</p>
        <ul>
          <li><strong>🌊 LDates (Jungle):</strong> Controle de objetivos e liderança inspiradora</li>
          <li><strong>⚔️ Player2 (Top):</strong> Farm consistente e teamfights determinadas</li>
          <li><strong>🎯 Player3 (Mid):</strong> Roaming eficiente e controle de wave</li>
          <li><strong>🏹 Player4 (ADC):</strong> Dano consistente e posicionamento inteligente</li>
          <li><strong>🛡️ Player5 (Support):</strong> Visão estratégica e proteção da equipe</li>
        </ul>
        
        <h3>📊 Estatísticas Impressionantes</h3>
        <p>Os números mostram a qualidade dos Kongs do Atlântico:</p>
        <ul>
          <li><strong>🎯 Taxa de vitória:</strong> 60% nas partidas disputadas</li>
          <li><strong>🏰 Controle de objetivos:</strong> 75% de taxa de sucesso</li>
          <li><strong>🤝 Coordenação:</strong> 90% de execução de estratégias</li>
          <li><strong>⚡ Adaptação:</strong> Tempo médio de 45 segundos</li>
          <li><strong>💪 Resistência:</strong> Nunca desistiram de uma partida</li>
        </ul>
        
        <h3>🌍 Impacto na Comunidade Nordestina</h3>
        <p>Kongs do Atlântico inspirou muitos jogadores do nordeste a:</p>
        <ul>
          <li><strong>🌟 Acreditar</strong> no potencial competitivo da região</li>
          <li><strong>🎮 Participar</strong> ativamente de competições</li>
          <li><strong>📈 Desenvolver</strong> habilidades competitivas avançadas</li>
          <li><strong>🏆 Representar</strong> sua região com muito orgulho</li>
          <li><strong>🤝 Unir-se</strong> em torno de objetivos comuns</li>
          <li><strong>🌊 Mostrar</strong> a força do povo nordestino</li>
        </ul>
        
        <h3>🎥 Momentos Épicos dos Kongs</h3>
        <p>Os highlights mais marcantes da campanha:</p>
        <ul>
          <li><strong>🔥 Teamfight épica:</strong> Contra Zeca e os Urubus no Game 2</li>
          <li><strong>🏰 Barão roubado:</strong> Timing perfeito contra Os Fimos</li>
          <li><strong>⚡ Rotação surpresa:</strong> Movimento que pegou todos de surpresa</li>
          <li><strong>🎯 Pick decisivo:</strong> Campeão que virou o jogo</li>
          <li><strong>🏆 Vitória emocionante:</strong> Terceiro lugar conquistado com garra</li>
        </ul>
        
        <h3>🚀 Futuro Promissor</h3>
        <p>Com o terceiro lugar conquistado com muito orgulho, Kongs do Atlântico já está se preparando para as próximas competições, sempre representando a <strong>força, determinação e espírito de luta</strong> do nordeste brasileiro.</p>
        
        <p>O time promete continuar inspirando e mostrando que o nordeste tem muito talento e determinação para oferecer ao cenário competitivo.</p>
        
        <div class="bg-gradient-to-r from-blue-400/20 to-cyan-500/20 p-6 rounded-xl border border-blue-400/30 mt-8">
          <h4 class="text-xl font-bold text-white mb-3">🌊 Orgulho do Nordeste</h4>
          <p class="text-gray-300 mb-4">Kongs do Atlântico - Representando nossa região com honra!</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>✅ Capitão: LDates (Líder Inspirador)</li>
            <li>✅ 3º Lugar na Copa Tomatão</li>
            <li>✅ Vitória por 2-1 contra Os Fimos</li>
            <li>✅ Exemplo de determinação e garra</li>
          </ul>
        </div>
        
        <p class="text-center text-lg font-semibold text-blue-400 mt-8">🌊 <strong>O nordeste está de parabéns! Kongs do Atlântico - Nossa força, nosso orgulho!</strong> 🌊</p>
      </div>
    `,
    author: "Jornalista Gamer",
    publishedAt: "2025-09-25T14:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
    category: "Perfil",
    views: 1450,
    readTime: "10 min"
  },
  "os-fimos-experiencia-decisoes": {
    id: "5",
    title: "Os Fimos mostram experiência nas decisões",
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>📚 Experiência que Faz a Diferença</h2>
        <p><strong>Os Fimos</strong>, liderados pelo experiente e sábio <strong>AZR Aldeath</strong>, demonstraram que experiência conta muito em momentos decisivos do campeonato. Veteranos do cenário competitivo, eles mostraram maturidade, sabedoria e serenidade em situações de alta pressão, provando que a experiência é um dos maiores ativos no League of Legends competitivo.</p>
        
        <h3>🏛️ O Perfil da Equipe - Os Veteranos</h3>
        <p>Os Fimos é uma equipe formada por jogadores experientes e maduros que:</p>
        <ul>
          <li><strong>🧠 Conhecem o jogo</strong> em profundidade e detalhes</li>
          <li><strong>😌 Mantêm a calma</strong> mesmo nas situações mais difíceis</li>
          <li><strong>🎯 Tomam decisões</strong> baseadas em anos de experiência</li>
          <li><strong>⚡ Adaptam-se</strong> rapidamente às mudanças do meta</li>
          <li><strong>🤝 Trabalham em equipe</strong> com harmonia e respeito</li>
          <li><strong>📈 Evoluem constantemente</strong> sempre buscando melhorar</li>
        </ul>
        
        <h3>👑 O Capitão AZR Aldeath - O Sábio Líder</h3>
        <p><strong>AZR Aldeath</strong>, o capitão da equipe, é reconhecido por suas qualidades excepcionais:</p>
        <ul>
          <li><strong>🏆 Anos de experiência</strong> sólida no cenário competitivo</li>
          <li><strong>🧠 Conhecimento estratégico</strong> avançado e detalhado</li>
          <li><strong>😌 Liderança tranquila</strong> e eficaz sob pressão</li>
          <li><strong>🎯 Versatilidade</strong> impressionante em diferentes posições</li>
          <li><strong>📚 Sabedoria</strong> adquirida ao longo dos anos</li>
          <li><strong>🤝 Mentoria</strong> para jogadores mais novos</li>
        </ul>
        
        <h3>⚔️ Filosofia de Jogo - Sabedoria em Campo</h3>
        <p>A filosofia de Os Fimos é baseada em princípios sólidos e testados:</p>
        <ul>
          <li><strong>🛡️ Jogo seguro</strong> e calculado, evitando riscos desnecessários</li>
          <li><strong>💰 Controle de recursos</strong> e economia eficiente</li>
          <li><strong>🤝 Teamfights coordenadas</strong> e extremamente eficientes</li>
          <li><strong>🧠 Adaptação estratégica</strong> constante e inteligente</li>
          <li><strong>⏰ Timing perfeito</strong> para todas as ações</li>
          <li><strong>🎯 Precisão</strong> em cada movimento e decisão</li>
        </ul>
        
        <h3>🏆 Campanha na Copa Tomatão 2025</h3>
        <p>Na Copa Tomatão 2025, Os Fimos enfrentaram desafios únicos que testaram sua experiência:</p>
        
        <h4>⚔️ Primeira Rodada - A Surpresa Inovadora</h4>
        <p>Na primeira rodada contra Te Fizguei, Os Fimos foram surpreendidos pelas <strong>estratégias inovadoras</strong> do adversário, perdendo por 2-1. Foi uma lição valiosa sobre a importância de se adaptar rapidamente.</p>
        
        <h4>🥉 Final dos Times em Segundo Lugar - A Experiência em Ação</h4>
        <p>Na final dos times em segundo lugar contra Kongs do Atlântico, Os Fimos mostraram toda sua <strong>experiência e maturidade</strong>, mas acabaram sendo derrotados por 2-1, ficando em quarto lugar com honra.</p>
        
        <h3>📊 Estatísticas da Experiência</h3>
        <p>Os números mostram o valor da experiência dos Fimos:</p>
        <ul>
          <li><strong>🎯 Taxa de decisões corretas:</strong> 78% em momentos críticos</li>
          <li><strong>⚡ Tempo de adaptação:</strong> 35 segundos em média</li>
          <li><strong>🤝 Coordenação:</strong> 95% de execução de estratégias</li>
          <li><strong>💰 Economia:</strong> +8k gold advantage por partida</li>
          <li><strong>🛡️ Sobrevivência:</strong> Menor taxa de mortes do torneio</li>
        </ul>
        
        <h3>🎓 Lições Aprendidas</h3>
        <p>Mesmo não conquistando o título, Os Fimos aprenderam lições valiosas que enriqueceram ainda mais sua experiência:</p>
        <ul>
          <li><strong>💡 Inovação</strong> é tão importante quanto experiência consolidada</li>
          <li><strong>⚡ Adaptação</strong> é crucial em competições modernas</li>
          <li><strong>🤝 Trabalho em equipe</strong> supera habilidades individuais</li>
          <li><strong>🏆 Espírito esportivo</strong> é fundamental para o crescimento</li>
          <li><strong>📚 Aprendizado contínuo</strong> é essencial para evolução</li>
          <li><strong>🎯 Humildade</strong> para reconhecer e aprender com derrotas</li>
        </ul>
        
        <h3>⭐ Destaques da Equipe</h3>
        <p>Cada jogador contribuiu com suas especialidades únicas:</p>
        <ul>
          <li><strong>🧠 AZR Aldeath (Mid/Top):</strong> Versatilidade e liderança sábia</li>
          <li><strong>🌲 Player2 (Jungle):</strong> Controle de objetivos e visão estratégica</li>
          <li><strong>⭐ Player3 (Mid):</strong> Farm consistente e roaming eficiente</li>
          <li><strong>🏹 Player4 (ADC):</strong> Dano consistente em teamfights</li>
          <li><strong>🛡️ Player5 (Support):</strong> Proteção e visão de mapa</li>
        </ul>
        
        <h3>🌍 Impacto no Cenário Competitivo</h3>
        <p>Os Fimos contribuíram significativamente para o cenário competitivo mostrando que:</p>
        <ul>
          <li><strong>📚 Experiência</strong> tem valor inestimável e atemporal</li>
          <li><strong>😌 Maturidade</strong> faz diferença em momentos decisivos</li>
          <li><strong>🧠 Conhecimento</strong> profundo do jogo é fundamental</li>
          <li><strong>🏆 Espírito esportivo</strong> é exemplo para toda a comunidade</li>
          <li><strong>🤝 Mentoria</strong> é importante para o crescimento coletivo</li>
          <li><strong>📈 Evolução constante</strong> é necessária para manter relevância</li>
        </ul>
        
        <h3>🎥 Momentos de Sabedoria</h3>
        <p>Os highlights mais marcantes que mostraram a experiência dos Fimos:</p>
        <ul>
          <li><strong>🧠 Decisão estratégica:</strong> Rotação perfeita contra Kongs</li>
          <li><strong>⚡ Adaptação rápida:</strong> Mudança de estratégia em tempo real</li>
          <li><strong>🤝 Teamfight coordenada:</strong> Execução perfeita contra Te Fizguei</li>
          <li><strong>🎯 Pick inteligente:</strong> Campeão que virou o jogo</li>
          <li><strong>📚 Lição aprendida:</strong> Humildade após derrota</li>
        </ul>
        
        <h3>🚀 Futuro da Equipe</h3>
        <p>Com sua experiência consolidada e conhecimento profundo, Os Fimos continuarão sendo uma <strong>referência no cenário competitivo</strong>, sempre buscando evoluir, aprender e contribuir para o crescimento da comunidade.</p>
        
        <p>A equipe promete continuar inspirando novos jogadores e mostrando que experiência, sabedoria e maturidade são valores fundamentais no League of Legends competitivo.</p>
        
        <div class="bg-gradient-to-r from-purple-400/20 to-pink-500/20 p-6 rounded-xl border border-purple-400/30 mt-8">
          <h4 class="text-xl font-bold text-white mb-3">📚 Os Sábios da Copa Tomatão</h4>
          <p class="text-gray-300 mb-4">Os Fimos - Experiência que inspira e ensina!</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>✅ Capitão: AZR Aldeath (Líder Sábio)</li>
            <li>✅ 4º Lugar na Copa Tomatão</li>
            <li>✅ Exemplo de maturidade e experiência</li>
            <li>✅ Referência para novos jogadores</li>
          </ul>
        </div>
        
        <p class="text-center text-lg font-semibold text-purple-400 mt-8">📚 <strong>Experiência é o melhor professor! Os Fimos - Sabedoria que inspira!</strong> 📚</p>
      </div>
    `,
    author: "Comentarista eSports",
    publishedAt: "2025-09-24T18:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=200&fit=crop",
    category: "Análise",
    views: 1200,
    readTime: "8 min"
  },
  "hall-vencedores-nova-secao": {
    id: "6",
    title: "Hall dos Vencedores: Nova seção no site",
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>🏆 Eternizando os Grandes Campeões</h2>
        <p>É com grande orgulho e emoção que anunciamos a nova seção <strong>"Hall dos Vencedores"</strong> no site da Copa Tomatão! Esta seção foi criada para eternizar os grandes campeões, celebrar suas conquistas históricas e preservar para sempre os momentos mais épicos da nossa competição.</p>
        
        <h3>🎯 O que é o Hall dos Vencedores?</h3>
        <p>O Hall dos Vencedores é uma seção especial e exclusiva dedicada a:</p>
        <ul>
          <li><strong>🏆 Campeões</strong> de cada edição do torneio</li>
          <li><strong>🥈 Vice-campeões</strong> e times em segundo lugar</li>
          <li><strong>🥉 Terceiros colocados</strong> e suas conquistas memoráveis</li>
          <li><strong>⭐ MVPs</strong> e destaques individuais excepcionais</li>
          <li><strong>🎬 Momentos épicos</strong> e highlights históricos</li>
          <li><strong>📊 Estatísticas</strong> e recordes impressionantes</li>
        </ul>
        
        <h3>✨ Funcionalidades da Seção</h3>
        <p>A nova seção oferece uma experiência completa e imersiva:</p>
        <ul>
          <li><strong>🖼️ Galeria de campeões</strong> com fotos exclusivas e informações detalhadas</li>
          <li><strong>📈 Estatísticas detalhadas</strong> de cada partida e performance</li>
          <li><strong>🎥 Highlights</strong> dos melhores momentos em alta qualidade</li>
          <li><strong>📖 Biografias</strong> completas dos jogadores e suas jornadas</li>
          <li><strong>📚 Histórico completo</strong> do torneio desde sua criação</li>
          <li><strong>🏅 Sistema de conquistas</strong> e badges exclusivos</li>
          <li><strong>🎮 Interatividade</strong> com quizzes e desafios</li>
        </ul>
        
        <h3>👑 Primeiros Indurados - Copa Tomatão 2025</h3>
        <p>Na primeira edição do Hall dos Vencedores, temos os seguintes homenageados:</p>
        
        <h4>🏆 Campeões - Copa Tomatão 2025</h4>
        <p><strong>Zeca e os Urubus</strong> - Primeiros campeões do formato atual</p>
        <ul>
          <li><strong>👑 Capitão:</strong> Theushubu (MVP da Final)</li>
          <li><strong>🎯 Resultado:</strong> 3-1 contra Te Fizguei</li>
          <li><strong>⏱️ Duração da final:</strong> 2h 35min de pura emoção</li>
          <li><strong>📊 KDA médio:</strong> 3.2 (excepcional para uma final)</li>
          <li><strong>🏰 Controle de objetivos:</strong> 78% de taxa de sucesso</li>
          <li><strong>🎬 Highlights:</strong> Teamfight perfeita no Game 3</li>
        </ul>
        
        <h4>🥈 Vice-Campeões</h4>
        <p><strong>Te Fizguei</strong> - Segundo lugar com estratégias inovadoras</p>
        <ul>
          <li><strong>🎯 Capitão:</strong> Jamalzeralol (Estrategista Visionário)</li>
          <li><strong>💡 Destaque:</strong> Estratégias criativas e revolucionárias</li>
          <li><strong>📊 Resultado:</strong> 1-3 contra Zeca e os Urubus</li>
          <li><strong>🎮 Inovação:</strong> Composições não-meta que surpreenderam</li>
          <li><strong>🎬 Highlights:</strong> Pick inovador que virou o jogo</li>
        </ul>
        
        <h4>🥉 Terceiros Colocados</h4>
        <p><strong>Kongs do Atlântico</strong> - Terceiro lugar representando o nordeste</p>
        <ul>
          <li><strong>🌊 Capitão:</strong> LDates (Líder Inspirador)</li>
          <li><strong>🎯 Destaque:</strong> Controle de objetivos e determinação</li>
          <li><strong>📊 Resultado:</strong> 2-1 contra Os Fimos</li>
          <li><strong>🌍 Representatividade:</strong> Força do nordeste brasileiro</li>
          <li><strong>🎬 Highlights:</strong> Barão roubado com timing perfeito</li>
        </ul>
        
        <h4>📚 Quartos Colocados</h4>
        <p><strong>Os Fimos</strong> - Quarto lugar com experiência e sabedoria</p>
        <ul>
          <li><strong>🧠 Capitão:</strong> AZR Aldeath (Líder Sábio)</li>
          <li><strong>📚 Destaque:</strong> Experiência e maturidade em campo</li>
          <li><strong>📊 Resultado:</strong> 1-2 contra Kongs do Atlântico</li>
          <li><strong>🎯 Filosofia:</strong> Jogo seguro e calculado</li>
          <li><strong>🎬 Highlights:</strong> Decisão estratégica perfeita</li>
        </ul>
        
        <h3>🚀 Como Acessar o Hall dos Vencedores</h3>
        <p>Para acessar o Hall dos Vencedores e explorar toda sua riqueza:</p>
        <ol>
          <li><strong>🌐 Visite o site</strong> da Copa Tomatão</li>
          <li><strong>🏆 Clique em "Hall dos Vencedores"</strong> no menu principal</li>
          <li><strong>🔍 Explore as diferentes seções</strong> disponíveis</li>
          <li><strong>👑 Veja os detalhes</strong> de cada campeão e conquista</li>
          <li><strong>🎮 Interaja</strong> com quizzes e desafios</li>
          <li><strong>📱 Compartilhe</strong> seus momentos favoritos</li>
        </ol>
        
        <h3>🔮 Futuro do Hall dos Vencedores</h3>
        <p>O Hall dos Vencedores continuará crescendo e evoluindo com:</p>
        <ul>
          <li><strong>🏆 Novas edições</strong> do torneio sendo adicionadas</li>
          <li><strong>👑 Mais campeões</strong> sendo eternizados na história</li>
          <li><strong>✨ Funcionalidades</strong> adicionais e interativas</li>
          <li><strong>🤝 Interatividade</strong> crescente com a comunidade</li>
          <li><strong>📊 Estatísticas</strong> mais detalhadas e avançadas</li>
          <li><strong>🎥 Conteúdo</strong> exclusivo e premium</li>
        </ul>
        
        <h3>🎯 Reconhecimento e Propósito</h3>
        <p>Esta seção é nossa forma especial de:</p>
        <ul>
          <li><strong>🏆 Honrar</strong> os grandes campeões e suas conquistas</li>
          <li><strong>📚 Preservar</strong> a história rica do torneio</li>
          <li><strong>🌟 Inspirar</strong> futuras gerações de jogadores</li>
          <li><strong>🎮 Celebrar</strong> o esporte eletrônico e sua evolução</li>
          <li><strong>🤝 Unir</strong> a comunidade em torno de conquistas</li>
          <li><strong>📈 Documentar</strong> a evolução do cenário competitivo</li>
        </ul>
        
        <h3>🎉 Celebração da Comunidade</h3>
        <p>O Hall dos Vencedores já está sendo celebrado pela comunidade:</p>
        <ul>
          <li><strong>📱 Redes sociais:</strong> Mais de 1.000 posts sobre a nova seção</li>
          <li><strong>💬 Comentários:</strong> Feedback positivo e sugestões</li>
          <li><strong>🎮 Engajamento:</strong> Alta interação com o conteúdo</li>
          <li><strong>🏆 Inspiração:</strong> Novos jogadores motivados a participar</li>
        </ul>
        
        <div class="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 p-6 rounded-xl border border-yellow-400/30 mt-8">
          <h4 class="text-xl font-bold text-white mb-3">🏆 Hall dos Vencedores</h4>
          <p class="text-gray-300 mb-4">Eternizando os grandes campeões da Copa Tomatão!</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>✅ Seção exclusiva e interativa</li>
            <li>✅ Galeria completa de campeões</li>
            <li>✅ Estatísticas detalhadas</li>
            <li>✅ Highlights épicos em alta qualidade</li>
          </ul>
        </div>
        
        <p class="text-center text-lg font-semibold text-yellow-400 mt-8">🏆 <strong>Visite o Hall dos Vencedores e faça parte da história! Onde os campeões são eternizados!</strong> 🏆</p>
      </div>
    `,
    author: "Equipe Copa Tomatão",
    publishedAt: "2025-09-23T12:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1586953295165-e44cd8e0ee67?w=800&h=200&fit=crop",
    category: "Site",
    views: 950,
    readTime: "8 min"
  }
};

export default function Article() {
  // Obter o slug do artigo da URL
  const urlParams = new URLSearchParams(window.location.search);
  const articleSlug = urlParams.get('article');
  
  const article = articleSlug ? articles[articleSlug as keyof typeof articles] : null;

  if (!article) {
    return (
      <div className="min-h-screen pt-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-white mb-4">Artigo não encontrado</h1>
            <p className="text-gray-300 mb-8">O artigo que você está procurando não existe.</p>
            <Link href="/blog">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0">
                Voltar para o Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Blog
            </Button>
          </Link>
          
          {/* Article Image */}
          {article.imageUrl && (
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}
          
          {/* Article Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{article.views} visualizações</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} de leitura</span>
            </div>
          </div>
          
          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Category Badge */}
          <div className="inline-block">
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/30">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <Card className="glass-card glow-hover mb-8">
          <CardContent className="p-8">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </CardContent>
        </Card>

        {/* Article Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" className="border-secondary/30 text-secondary hover:bg-secondary/10">
              <Bookmark className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            {article.views} visualizações
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-white mb-6">Artigos Relacionados</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(articles)
              .filter(a => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link key={relatedArticle.id} href={`/article?article=${Object.keys(articles).find(key => articles[key as keyof typeof articles].id === relatedArticle.id)}`}>
                  <Card className="glass-card glow-hover cursor-pointer">
                    <CardContent className="p-6">
                      <h4 className="font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                        <span>{relatedArticle.category}</span>
                        <span>{relatedArticle.readTime}</span>
                        <span>{relatedArticle.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        {/* Back to Blog */}
        <div className="text-center">
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 px-8 py-4 text-lg font-semibold">
              Ver Todos os Artigos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
