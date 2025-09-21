import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Users, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio do formulário
    console.log("Formulário enviado:", formData);
    setIsSubmitted(true);
    
    // Resetar formulário após 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const contactMethods = [
    {
      title: "Discord",
      description: "Nossa comunidade oficial",
      icon: MessageCircle,
      action: "Entrar no Discord",
      link: "/watch",
      color: "text-indigo-400"
    },
    {
      title: "Email",
      description: "Para questões formais",
      icon: Mail,
      action: "copatomatao@email.com",
      link: "mailto:copatomatao@email.com",
      color: "text-blue-400"
    },
    {
      title: "Twitch",
      description: "Durante as transmissões",
      icon: Users,
      action: "Chat ao vivo",
      link: "/watch",
      color: "text-purple-400"
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
            <span className="gradient-text">ENTRE EM</span> CONTATO
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tem dúvidas, sugestões ou quer participar da Copa Tomatão? Fale conosco!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="glass-card border border-white/10 glow-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-gaming flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <span className="gradient-text">ENVIE UMA MENSAGEM</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Mensagem Enviada!</h3>
                  <p className="text-gray-300">
                    Obrigado pelo contato. Responderemos em breve!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Assunto *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary"
                      placeholder="Qual o assunto da sua mensagem?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary resize-none"
                      placeholder="Descreva sua dúvida, sugestão ou interesse em participar..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white glow-hover border-0 py-3"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card className="glass-card border border-white/10 glow-hover ">
              <CardHeader>
                <CardTitle className="text-xl font-gaming">
                  <span className="gradient-text">OUTRAS FORMAS DE CONTATO</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
                          <IconComponent className={`w-6 h-6 ${method.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{method.title}</h3>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                        <a
                          href={method.link}
                          className="text-primary hover:text-primary/80 font-medium text-sm"
                        >
                          {method.action}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Response Time Info */}
            <Card className="glass-card border border-white/10 glow-hover ">
              <CardHeader>
                <CardTitle className="text-xl font-gaming flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border border-primary/20">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="gradient-text">TEMPO DE RESPOSTA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Discord:</span>
                    <span className="text-green-400 font-semibold">Imediato</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Email:</span>
                    <span className="text-yellow-400 font-semibold">24-48 horas</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Twitch Chat:</span>
                    <span className="text-green-400 font-semibold">Durante streams</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <Card className="glass-card border border-white/10 max-w-2xl mx-auto glow-hover ">
            <CardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-3 text-white">
                Antes de entrar em contato...
              </h3>
              <p className="text-gray-300 mb-4">
                Dê uma olhada na nossa seção de perguntas frequentes. Sua dúvida pode já ter uma resposta!
              </p>
              <a href="/faq" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-lg font-semibold glow-hover border-0 inline-block">
                Ver FAQ
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
