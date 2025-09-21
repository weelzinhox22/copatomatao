import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Users, Trophy, Calendar, MessageCircle, Shield } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Geral",
      icon: HelpCircle,
      questions: [
        {
          question: "O que é a Copa Tomatão?",
          answer: "A Copa Tomatão é um campeonato de League of Legends feito por pura resenha entre amigos e conhecidos. É um torneio comunitário onde times se enfrentam em partidas emocionantes."
        },
        {
          question: "Como posso participar?",
          answer: "Para participar, você precisa se cadastrar como jogador no site e formar ou entrar em um time. As inscrições são abertas periodicamente."
        },
        {
          question: "O campeonato é gratuito?",
          answer: "Sim! A Copa Tomatão é completamente gratuita. É um evento feito pela comunidade, para a comunidade."
        },
        {
          question: "Qual o nível mínimo para participar?",
          answer: "Não há nível mínimo específico. O importante é ter vontade de jogar e se divertir com a galera!"
        }
      ]
    },
    {
      title: "Times e Jogadores",
      icon: Users,
      questions: [
        {
          question: "Como formar um time?",
          answer: "Você pode formar um time convidando outros jogadores cadastrados ou procurar por jogadores disponíveis na seção de times."
        },
        {
          question: "Quantos jogadores por time?",
          answer: "Cada time deve ter 5 jogadores principais e pode ter até 2 reservas."
        },
        {
          question: "Posso trocar de time durante o campeonato?",
          answer: "As trocas de time são permitidas apenas antes do início das partidas eliminatórias."
        },
        {
          question: "O que acontece se um jogador não aparecer?",
          answer: "Se um jogador principal não aparecer, o time pode usar um reserva. Se não houver reservas, a partida será adiada ou o time pode jogar com 4 jogadores."
        }
      ]
    },
    {
      title: "Campeonato",
      icon: Trophy,
      questions: [
        {
          question: "Como funciona o formato do campeonato?",
          answer: "O campeonato segue um formato de eliminatória simples, com partidas de melhor de 3 (MD3) nas semifinais e melhor de 5 (MD5) na final."
        },
        {
          question: "Quando acontecem as partidas?",
          answer: "As partidas acontecem nos fins de semana, geralmente aos sábados e domingos. Os horários são divulgados com antecedência."
        },
        {
          question: "Onde posso assistir as partidas?",
          answer: "Todas as partidas são transmitidas ao vivo nas nossas plataformas oficiais: Twitch (jamalzeralol e mecwelll) e Discord."
        },
        {
          question: "Há premiação?",
          answer: "O campeonato é principalmente por diversão, mas há reconhecimento e destaque para os times vencedores no Hall dos Vencedores."
        }
      ]
    },
    {
      title: "Horários e Cronograma",
      icon: Calendar,
      questions: [
        {
          question: "Qual o cronograma das transmissões?",
          answer: "Dias de semana: Pré-show 19:30-20:00, Partidas 20:00-23:00, Pós-show 23:00-23:30. Fins de semana: Pré-show 13:30-14:00, Partidas 14:00-18:00 e 20:00-23:00."
        },
        {
          question: "Como fico sabendo dos horários das partidas?",
          answer: "Os horários são divulgados no site, Discord e redes sociais. Você também pode acompanhar na seção 'Onde Assistir'."
        },
        {
          question: "As partidas podem ser adiadas?",
          answer: "Sim, em casos de problemas técnicos ou indisponibilidade de jogadores, as partidas podem ser adiadas com aviso prévio."
        }
      ]
    },
    {
      title: "Comunidade",
      icon: MessageCircle,
      questions: [
        {
          question: "Como posso interagir com outros participantes?",
          answer: "Você pode participar do nosso Discord oficial, onde há chats para discussões, avisos importantes e interação com outros jogadores."
        },
        {
          question: "Posso sugerir melhorias para o campeonato?",
          answer: "Claro! Suas sugestões são sempre bem-vindas. Entre em contato conosco através da página de contato."
        },
        {
          question: "Há regras específicas de comportamento?",
          answer: "Sim, pedimos respeito mútuo, fair play e espírito esportivo. Qualquer comportamento inadequado pode resultar em desclassificação."
        }
      ]
    },
    {
      title: "Técnico e Suporte",
      icon: Shield,
      questions: [
        {
          question: "Estou com problemas técnicos no site, o que fazer?",
          answer: "Entre em contato conosco através da página de contato ou use a página 'Reportar Bug' para nos informar sobre problemas técnicos."
        },
        {
          question: "Como reportar problemas durante as partidas?",
          answer: "Problemas durante as partidas devem ser reportados imediatamente aos organizadores via Discord ou durante a transmissão."
        },
        {
          question: "O site funciona em dispositivos móveis?",
          answer: "Sim! O site é totalmente responsivo e funciona perfeitamente em smartphones e tablets."
        },
        {
          question: "Posso instalar o site como app?",
          answer: "Sim! O site é uma PWA (Progressive Web App) e pode ser instalado no seu dispositivo móvel para acesso mais rápido."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="gradient-text">PERGUNTAS</span> FREQUENTES
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre a Copa Tomatão
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="glass-card border border-white/10 glow-hover ">
                <CardHeader>
                  <CardTitle className="text-2xl font-gaming flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="gradient-text">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((item, questionIndex) => (
                      <div key={questionIndex} className="border-l-2 border-primary/30 pl-4 py-2">
                        <h3 className="font-semibold text-white mb-2 text-lg">
                          {item.question}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <Card className="glass-card border border-white/10 max-w-2xl mx-auto glow-hover ">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold mb-4 text-white">
                Não encontrou sua dúvida?
              </h3>
              <p className="text-gray-300 mb-6">
                Entre em contato conosco através da nossa página de contato ou participe da nossa comunidade no Discord.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-lg font-semibold glow-hover border-0">
                  Entrar em Contato
                </a>
                <a href="/watch" className="border border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-semibold glow-hover">
                  Acessar Discord
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
