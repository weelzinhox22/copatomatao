import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie, Shield, Eye, Settings, AlertTriangle, Calendar, Users, Database } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold neon-text text-glow-soft">
              Política de Cookies
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Informações detalhadas sobre como utilizamos cookies e tecnologias similares em nosso site
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-primary/20 text-primary px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              Última atualização: 15 de Janeiro de 2025
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              LGPD Compliant
            </Badge>
          </div>
        </div>

        {/* Índice */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              Índice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <a href="#o-que-sao-cookies" className="block text-primary hover:text-primary/80 transition-colors">1. O que são Cookies</a>
                <a href="#tipos-cookies" className="block text-primary hover:text-primary/80 transition-colors">2. Tipos de Cookies que Utilizamos</a>
                <a href="#finalidade-cookies" className="block text-primary hover:text-primary/80 transition-colors">3. Finalidade dos Cookies</a>
                <a href="#duracao-cookies" className="block text-primary hover:text-primary/80 transition-colors">4. Duração dos Cookies</a>
              </div>
              <div className="space-y-2">
                <a href="#gerenciamento-cookies" className="block text-primary hover:text-primary/80 transition-colors">5. Gerenciamento de Cookies</a>
                <a href="#terceiros" className="block text-primary hover:text-primary/80 transition-colors">6. Cookies de Terceiros</a>
                <a href="#direitos-usuario" className="block text-primary hover:text-primary/80 transition-colors">7. Direitos do Usuário</a>
                <a href="#contato" className="block text-primary hover:text-primary/80 transition-colors">8. Contato</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Principal */}
        <div className="space-y-8">
          {/* Seção 1 */}
          <Card className="glass-card" id="o-que-sao-cookies">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Cookie className="w-6 h-6 text-primary" />
                1. O que são Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) 
                quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais 
                eficiente, bem como para fornecer informações aos proprietários do site.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Como funcionam os Cookies?</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Quando você visita nosso site, enviamos um ou mais cookies para o seu dispositivo. 
                      Os cookies permitem que o site reconheça seu dispositivo e armazene algumas informações 
                      sobre suas preferências ou ações passadas.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Os cookies podem ser "persistentes" (permanecem no seu dispositivo até expirarem ou serem deletados) 
                ou "sessão" (são deletados quando você fecha o navegador). Também podem ser "primeiros" 
                (definidos diretamente por nós) ou "terceiros" (definidos por outros serviços que aparecem em nossa página).
              </p>
            </CardContent>
          </Card>

          {/* Seção 2 */}
          <Card className="glass-card" id="tipos-cookies">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                2. Tipos de Cookies que Utilizamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                {/* Cookies Necessários */}
                <div className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-red-400 font-semibold text-lg">Cookies Necessários</h4>
                      <p className="text-gray-400 text-sm">Essenciais para o funcionamento básico do site</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Estes cookies são essenciais para o funcionamento do site e não podem ser desabilitados. 
                      Eles geralmente são definidos apenas em resposta a ações feitas por você que equivalem a uma 
                      solicitação de serviços, como definir suas preferências de privacidade, fazer login ou 
                      preencher formulários.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="text-white font-medium mb-2">Exemplos de uso:</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Manter você logado durante sua visita</li>
                        <li>• Lembrar suas preferências de cookies</li>
                        <li>• Garantir a segurança do site</li>
                        <li>• Prevenir fraudes e ataques</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cookies de Analytics */}
                <div className="border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-semibold text-lg">Cookies de Analytics</h4>
                      <p className="text-gray-400 text-sm">Coletam informações sobre como você usa o site</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Estes cookies nos permitem contar visitas e fontes de tráfego para que possamos medir e 
                      melhorar o desempenho do nosso site. Eles nos ajudam a saber quais páginas são as mais e 
                      menos populares e ver como os visitantes se movem pelo site.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="text-white font-medium mb-2">Informações coletadas:</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Páginas visitadas e tempo gasto</li>
                        <li>• Origem do tráfego (Google, redes sociais, etc.)</li>
                        <li>• Dispositivo e navegador utilizado</li>
                        <li>• Erros encontrados durante a navegação</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cookies de Performance */}
                <div className="border border-yellow-500/20 rounded-lg p-4 bg-yellow-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Settings className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold text-lg">Cookies de Performance</h4>
                      <p className="text-gray-400 text-sm">Melhoram a velocidade e funcionalidade do site</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Estes cookies permitem que o site se lembre de escolhas que você faz (como seu nome de usuário, 
                      idioma ou região) e forneça recursos aprimorados e mais pessoais. Eles também podem ser usados 
                      para lembrar mudanças feitas no tamanho do texto, fontes e outras partes personalizáveis das páginas.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="text-white font-medium mb-2">Funcionalidades:</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Cache de recursos para carregamento mais rápido</li>
                        <li>• Preload de conteúdo relevante</li>
                        <li>• Otimização de imagens e vídeos</li>
                        <li>• Service Workers para funcionalidade offline</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cookies de Marketing */}
                <div className="border border-purple-500/20 rounded-lg p-4 bg-purple-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold text-lg">Cookies de Marketing</h4>
                      <p className="text-gray-400 text-sm">Personalizam conteúdo e anúncios</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Estes cookies podem ser definidos através do nosso site por nossos parceiros de publicidade 
                      para construir um perfil dos seus interesses e mostrar-lhe anúncios relevantes em outros sites. 
                      Eles não armazenam diretamente informações pessoais, mas são baseados na identificação única 
                      do seu navegador e dispositivo de internet.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <h5 className="text-white font-medium mb-2">Uso:</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Personalização de conteúdo</li>
                        <li>• Anúncios direcionados</li>
                        <li>• Medição de eficácia de campanhas</li>
                        <li>• Limitação de frequência de anúncios</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3 */}
          <Card className="glass-card" id="finalidade-cookies">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                3. Finalidade dos Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Utilizamos cookies para várias finalidades, sempre respeitando sua privacidade e direitos. 
                A seguir, detalhamos os principais objetivos do uso de cookies em nosso site:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Funcionalidade do Site</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Manter sessões de usuário ativas</li>
                      <li>• Lembrar preferências de navegação</li>
                      <li>• Garantir segurança e prevenir fraudes</li>
                      <li>• Facilitar o uso de formulários</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Melhoria da Experiência</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Personalizar conteúdo</li>
                      <li>• Otimizar velocidade de carregamento</li>
                      <li>• Adaptar interface ao dispositivo</li>
                      <li>• Lembrar configurações de acessibilidade</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Análise e Estatísticas</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Medir tráfego e uso do site</li>
                      <li>• Identificar páginas mais populares</li>
                      <li>• Analisar comportamento de navegação</li>
                      <li>• Detectar problemas técnicos</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Marketing e Publicidade</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Exibir anúncios relevantes</li>
                      <li>• Medir eficácia de campanhas</li>
                      <li>• Evitar anúncios repetitivos</li>
                      <li>• Personalizar ofertas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 4 */}
          <Card className="glass-card" id="duracao-cookies">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                4. Duração dos Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                A duração dos cookies varia conforme sua finalidade e tipo. Abaixo detalhamos os períodos 
                de armazenamento para cada categoria:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white font-semibold">Tipo de Cookie</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Duração</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-red-400 font-medium">Sessão</td>
                      <td className="py-3 px-4 text-gray-300">Até fechar o navegador</td>
                      <td className="py-3 px-4 text-gray-300">Temporários, para funcionalidade básica</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-blue-400 font-medium">Necessários</td>
                      <td className="py-3 px-4 text-gray-300">Até 1 ano</td>
                      <td className="py-3 px-4 text-gray-300">Preferências essenciais e segurança</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-yellow-400 font-medium">Analytics</td>
                      <td className="py-3 px-4 text-gray-300">Até 2 anos</td>
                      <td className="py-3 px-4 text-gray-300">Dados de uso e comportamento</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-purple-400 font-medium">Marketing</td>
                      <td className="py-3 px-4 text-gray-300">Até 1 ano</td>
                      <td className="py-3 px-4 text-gray-300">Preferências de publicidade</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-green-400 font-medium">Performance</td>
                      <td className="py-3 px-4 text-gray-300">Até 6 meses</td>
                      <td className="py-3 px-4 text-gray-300">Cache e otimizações</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Importante</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Você pode excluir todos os cookies a qualquer momento através das configurações do seu navegador. 
                      No entanto, isso pode afetar a funcionalidade do site e sua experiência de navegação.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 5 */}
          <Card className="glass-card" id="gerenciamento-cookies">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-primary" />
                5. Gerenciamento de Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Você tem controle total sobre os cookies utilizados em nosso site. Abaixo explicamos como 
                gerenciar suas preferências:
              </p>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Controle através do Site</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Nosso banner de cookies permite que você configure suas preferências de forma granular:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Aceitar Todos:</strong> Habilita todos os tipos de cookies</li>
                    <li>• <strong>Rejeitar Todos:</strong> Mantém apenas cookies necessários</li>
                    <li>• <strong>Personalizar:</strong> Escolha quais tipos de cookies aceitar</li>
                    <li>• <strong>Alterar Preferências:</strong> Modifique suas escolhas a qualquer momento</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Controle através do Navegador</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Você também pode gerenciar cookies diretamente no seu navegador:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Google Chrome</h5>
                      <p className="text-gray-300 text-xs">Configurações → Privacidade e segurança → Cookies</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Firefox</h5>
                      <p className="text-gray-300 text-xs">Opções → Privacidade e segurança → Cookies</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Safari</h5>
                      <p className="text-gray-300 text-xs">Preferências → Privacidade → Cookies</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Edge</h5>
                      <p className="text-gray-300 text-xs">Configurações → Cookies e permissões</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 6 */}
          <Card className="glass-card" id="terceiros">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                6. Cookies de Terceiros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Nosso site pode conter cookies de terceiros para funcionalidades específicas. 
                Estes cookies são controlados pelos respectivos provedores de serviços:
              </p>

              <div className="space-y-4">
                <div className="border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                  <h4 className="text-blue-400 font-semibold mb-2">Vercel Analytics</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Utilizamos o Vercel Analytics para analisar o uso do site de forma privada e respeitosa. 
                    Este serviço coleta métricas essenciais sem cookies de terceiros.
                  </p>
                  <p className="text-gray-400 text-xs">
                    <strong>Política de Privacidade:</strong> <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline">https://vercel.com/legal/privacy-policy</a>
                  </p>
                </div>

                <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                  <h4 className="text-green-400 font-semibold mb-2">Redes Sociais</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Botões de compartilhamento e widgets de redes sociais podem definir cookies 
                    para funcionalidades de integração.
                  </p>
                  <p className="text-gray-400 text-xs">
                    <strong>Controle:</strong> Configure suas preferências nas respectivas plataformas
                  </p>
                </div>

                <div className="border border-purple-500/20 rounded-lg p-4 bg-purple-500/5">
                  <h4 className="text-purple-400 font-semibold mb-2">Serviços de Vídeo</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Vídeos incorporados (YouTube, Vimeo) podem definir cookies para 
                    funcionalidades de reprodução e analytics.
                  </p>
                  <p className="text-gray-400 text-xs">
                    <strong>Nota:</strong> Estes cookies são controlados pelos provedores de vídeo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 7 */}
          <Card className="glass-card" id="direitos-usuario">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                7. Direitos do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                De acordo com a Lei Geral de Proteção de Dados (LGPD) e outras legislações aplicáveis, 
                você possui os seguintes direitos em relação aos cookies e dados coletados:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Direito de Informação</h4>
                    <p className="text-gray-300 text-sm">
                      Receber informações claras sobre quais cookies são utilizados e para que finalidade.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Direito de Consentimento</h4>
                    <p className="text-gray-300 text-sm">
                      Dar ou retirar consentimento para cookies não essenciais a qualquer momento.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Direito de Acesso</h4>
                    <p className="text-gray-300 text-sm">
                      Solicitar informações sobre quais dados pessoais estão sendo coletados.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Direito de Retificação</h4>
                    <p className="text-gray-300 text-sm">
                      Corrigir dados incorretos ou incompletos relacionados aos cookies.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Direito de Exclusão</h4>
                    <p className="text-gray-300 text-sm">
                      Solicitar a exclusão de dados pessoais coletados através de cookies.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Direito de Portabilidade</h4>
                    <p className="text-gray-300 text-sm">
                      Receber seus dados em formato estruturado e legível por máquina.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Exercendo seus Direitos</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Para exercer qualquer um dos direitos mencionados acima, entre em contato conosco 
                      através dos canais indicados na seção de contato. Responderemos sua solicitação 
                      no prazo de 15 dias úteis.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 8 */}
          <Card className="glass-card" id="contato">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                8. Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Se você tiver dúvidas sobre nossa Política de Cookies ou desejar exercer seus direitos, 
                entre em contato conosco através dos seguintes canais:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">E-mail</h4>
                    <p className="text-gray-300 text-sm">privacidade@copatomatao.com</p>
                    <p className="text-gray-400 text-xs">Resposta em até 48 horas</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Discord</h4>
                    <p className="text-gray-300 text-sm">Servidor da Copa Tomatão</p>
                    <p className="text-gray-400 text-xs">Canal #suporte-privacidade</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Horário de Atendimento</h4>
                    <p className="text-gray-300 text-sm">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-gray-400 text-xs">Horário de Brasília</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Assunto do E-mail</h4>
                    <p className="text-gray-300 text-sm">"Política de Cookies - [Seu Nome]"</p>
                    <p className="text-gray-400 text-xs">Para melhor organização</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <h4 className="text-primary font-semibold mb-2">Informações Importantes</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Sempre inclua seu nome completo e e-mail de contato</li>
                  <li>• Seja específico sobre sua solicitação ou dúvida</li>
                  <li>• Para solicitações de exclusão, informe quais dados deseja remover</li>
                  <li>• Mantenha um tom respeitoso e profissional</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="glass-card p-6 rounded-xl">
            <p className="text-gray-400 text-sm">
              Esta Política de Cookies foi atualizada pela última vez em 15 de Janeiro de 2025. 
              Reservamo-nos o direito de atualizar esta política a qualquer momento. 
              Alterações significativas serão comunicadas através do site.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge className="bg-green-500/20 text-green-400">
                <Shield className="w-3 h-3 mr-1" />
                LGPD Compliant
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400">
                <Calendar className="w-3 h-3 mr-1" />
                Versão 1.0
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
