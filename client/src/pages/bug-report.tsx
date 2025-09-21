import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bug, Monitor, Smartphone, Globe, Send, CheckCircle, AlertTriangle } from "lucide-react";

export default function BugReport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bugType: "",
    severity: "",
    device: "",
    browser: "",
    url: "",
    description: "",
    steps: "",
    expected: "",
    actual: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio do formulário
    console.log("Bug report enviado:", formData);
    setIsSubmitted(true);
    
    // Resetar formulário após 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        bugType: "",
        severity: "",
        device: "",
        browser: "",
        url: "",
        description: "",
        steps: "",
        expected: "",
        actual: ""
      });
    }, 3000);
  };

  const bugTypes = [
    { value: "ui", label: "Interface do Usuário" },
    { value: "navigation", label: "Navegação" },
    { value: "performance", label: "Performance" },
    { value: "mobile", label: "Versão Mobile" },
    { value: "data", label: "Dados/Conteúdo" },
    { value: "login", label: "Login/Cadastro" },
    { value: "other", label: "Outro" }
  ];

  const severityLevels = [
    { value: "low", label: "Baixa - Não afeta o uso" },
    { value: "medium", label: "Média - Afeta algumas funcionalidades" },
    { value: "high", label: "Alta - Impede o uso normal" },
    { value: "critical", label: "Crítica - Site inacessível" }
  ];

  const devices = [
    { value: "desktop", label: "Desktop/Notebook" },
    { value: "mobile", label: "Smartphone" },
    { value: "tablet", label: "Tablet" }
  ];

  const browsers = [
    { value: "chrome", label: "Google Chrome" },
    { value: "firefox", label: "Mozilla Firefox" },
    { value: "safari", label: "Safari" },
    { value: "edge", label: "Microsoft Edge" },
    { value: "other", label: "Outro" }
  ];

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
            <span className="gradient-text">REPORTAR</span> BUG
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontrou um problema no site? Nos ajude a melhorar reportando o bug!
          </p>
        </div>

        {/* Bug Report Form */}
        <Card className="glass-card border border-white/10 glow-hover ">
          <CardHeader>
            <CardTitle className="text-2xl font-gaming flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-red-500/20">
                <Bug className="w-5 h-5 text-red-400" />
              </div>
              <span className="gradient-text">FORMULÁRIO DE REPORTE</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Bug Reportado!</h3>
                <p className="text-gray-300">
                  Obrigado por reportar o bug. Nossa equipe irá analisar e corrigir o problema.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
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
                      placeholder="Seu nome"
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

                {/* Bug Classification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tipo de Bug *
                    </label>
                    <Select value={formData.bugType} onValueChange={(value) => handleSelectChange("bugType", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {bugTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Severidade *
                    </label>
                    <Select value={formData.severity} onValueChange={(value) => handleSelectChange("severity", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione a severidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Technical Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dispositivo *
                    </label>
                    <Select value={formData.device} onValueChange={(value) => handleSelectChange("device", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {devices.map((device) => (
                          <SelectItem key={device.value} value={device.value}>
                            {device.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Navegador *
                    </label>
                    <Select value={formData.browser} onValueChange={(value) => handleSelectChange("browser", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {browsers.map((browser) => (
                          <SelectItem key={browser.value} value={browser.value}>
                            {browser.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                      URL da Página
                    </label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Bug Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição do Bug *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary resize-none"
                    placeholder="Descreva o problema encontrado de forma clara e objetiva..."
                  />
                </div>

                {/* Steps to Reproduce */}
                <div>
                  <label htmlFor="steps" className="block text-sm font-medium text-gray-300 mb-2">
                    Passos para Reproduzir *
                  </label>
                  <Textarea
                    id="steps"
                    name="steps"
                    required
                    rows={4}
                    value={formData.steps}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary resize-none"
                    placeholder="1. Acesse a página...&#10;2. Clique em...&#10;3. Observe que..."
                  />
                </div>

                {/* Expected vs Actual */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expected" className="block text-sm font-medium text-gray-300 mb-2">
                      Comportamento Esperado *
                    </label>
                    <Textarea
                      id="expected"
                      name="expected"
                      required
                      rows={3}
                      value={formData.expected}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary resize-none"
                      placeholder="O que deveria acontecer..."
                    />
                  </div>
                  <div>
                    <label htmlFor="actual" className="block text-sm font-medium text-gray-300 mb-2">
                      Comportamento Atual *
                    </label>
                    <Textarea
                      id="actual"
                      name="actual"
                      required
                      rows={3}
                      value={formData.actual}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-primary resize-none"
                      placeholder="O que realmente aconteceu..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white glow-hover border-0 py-3"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Reportar Bug
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-12">
          <Card className="glass-card border border-white/10 glow-hover ">
            <CardHeader>
              <CardTitle className="text-xl font-gaming flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-yellow-500/20">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="gradient-text">DICAS PARA UM BOM REPORTE</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">✅ Faça:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Descreva o problema de forma clara</li>
                    <li>• Inclua passos específicos para reproduzir</li>
                    <li>• Mencione o navegador e dispositivo</li>
                    <li>• Tire prints se possível</li>
                    <li>• Teste em diferentes navegadores</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">❌ Evite:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Descrições vagas ou genéricas</li>
                    <li>• Reportar problemas de conexão</li>
                    <li>• Múltiplos bugs em um só reporte</li>
                    <li>• Linguagem ofensiva</li>
                    <li>• Pressa para correção</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Alternative */}
        <div className="text-center mt-8">
          <Card className="glass-card border border-white/10 max-w-2xl mx-auto glow-hover ">
            <CardContent className="p-6">
              <h3 className="text-xl font-heading font-bold mb-3 text-white">
                Prefere contato direto?
              </h3>
              <p className="text-gray-300 mb-4">
                Para bugs críticos ou dúvidas urgentes, entre em contato conosco diretamente.
              </p>
              <a href="/contact" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-3 rounded-lg font-semibold glow-hover border-0 inline-block">
                Entrar em Contato
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
