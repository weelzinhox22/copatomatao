import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Database, Users, Lock, AlertTriangle, Calendar, Mail, Phone } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold neon-text text-glow-soft">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Como coletamos, usamos e protegemos suas informações pessoais
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
              <Eye className="w-6 h-6 text-primary" />
              Índice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <a href="#introducao" className="block text-primary hover:text-primary/80 transition-colors">1. Introdução</a>
                <a href="#dados-coletados" className="block text-primary hover:text-primary/80 transition-colors">2. Dados Coletados</a>
                <a href="#finalidade" className="block text-primary hover:text-primary/80 transition-colors">3. Finalidade do Tratamento</a>
                <a href="#compartilhamento" className="block text-primary hover:text-primary/80 transition-colors">4. Compartilhamento</a>
              </div>
              <div className="space-y-2">
                <a href="#seguranca" className="block text-primary hover:text-primary/80 transition-colors">5. Segurança</a>
                <a href="#direitos" className="block text-primary hover:text-primary/80 transition-colors">6. Seus Direitos</a>
                <a href="#retencao" className="block text-primary hover:text-primary/80 transition-colors">7. Retenção</a>
                <a href="#contato" className="block text-primary hover:text-primary/80 transition-colors">8. Contato</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Principal */}
        <div className="space-y-8">
          {/* Seção 1 */}
          <Card className="glass-card" id="introducao">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                1. Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                A Copa Tomatão ("nós", "nosso" ou "empresa") respeita sua privacidade e está comprometida 
                em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, 
                usamos, armazenamos e protegemos suas informações quando você utiliza nosso site e serviços.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Nossa Responsabilidade</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Somos responsáveis pelo tratamento de dados pessoais conforme a Lei Geral de Proteção 
                      de Dados (LGPD - Lei nº 13.709/2018) e demais legislações aplicáveis.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Esta política se aplica a todos os usuários do site Copa Tomatão, incluindo visitantes, 
                jogadores cadastrados, administradores e qualquer pessoa que interaja com nossos serviços.
              </p>
            </CardContent>
          </Card>

          {/* Seção 2 */}
          <Card className="glass-card" id="dados-coletados">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                2. Dados Coletados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Coletamos diferentes tipos de informações pessoais, dependendo de como você interage com nosso site:
              </p>

              <div className="space-y-4">
                {/* Dados de Cadastro */}
                <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold text-lg">Dados de Cadastro</h4>
                      <p className="text-gray-400 text-sm">Informações fornecidas voluntariamente</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Quando você se cadastra em nosso site, coletamos:
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Nome completo</li>
                        <li>• Endereço de e-mail</li>
                        <li>• Nome de usuário (gameName)</li>
                        <li>• Tag do jogo (tagLine)</li>
                        <li>• Senha (criptografada)</li>
                        <li>• Data de nascimento</li>
                        <li>• Informações do perfil de jogador</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dados de Navegação */}
                <div className="border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-semibold text-lg">Dados de Navegação</h4>
                      <p className="text-gray-400 text-sm">Coletados automaticamente</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Informações coletadas automaticamente durante sua navegação:
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Endereço IP</li>
                        <li>• Tipo de navegador e versão</li>
                        <li>• Sistema operacional</li>
                        <li>• Páginas visitadas</li>
                        <li>• Tempo de permanência</li>
                        <li>• Referrer (site de origem)</li>
                        <li>• Cookies e tecnologias similares</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dados de Jogo */}
                <div className="border border-purple-500/20 rounded-lg p-4 bg-purple-500/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Database className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold text-lg">Dados de Jogo</h4>
                      <p className="text-gray-400 text-sm">Informações da API da Riot Games</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Quando você autoriza, coletamos dados da sua conta League of Legends:
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Nível do invocador</li>
                        <li>• Ranking atual</li>
                        <li>• Maestria de campeões</li>
                        <li>• Histórico de partidas</li>
                        <li>• Estatísticas de jogo</li>
                        <li>• Informações de perfil público</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 3 */}
          <Card className="glass-card" id="finalidade">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                3. Finalidade do Tratamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Utilizamos suas informações pessoais para as seguintes finalidades legítimas:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Funcionalidade do Serviço</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Criar e gerenciar sua conta</li>
                      <li>• Fornecer acesso aos serviços</li>
                      <li>• Processar inscrições no torneio</li>
                      <li>• Facilitar comunicação entre jogadores</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Melhoria da Experiência</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Personalizar conteúdo</li>
                      <li>• Otimizar performance do site</li>
                      <li>• Desenvolver novos recursos</li>
                      <li>• Resolver problemas técnicos</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Comunicação</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Enviar notificações importantes</li>
                      <li>• Informar sobre atualizações</li>
                      <li>• Responder a suporte</li>
                      <li>• Comunicar resultados do torneio</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Segurança e Conformidade</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Prevenir fraudes e abusos</li>
                      <li>• Cumprir obrigações legais</li>
                      <li>• Proteger direitos e propriedade</li>
                      <li>• Manter segurança do sistema</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 4 */}
          <Card className="glass-card" id="compartilhamento">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                4. Compartilhamento de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Não vendemos suas informações pessoais. Compartilhamos dados apenas nas seguintes situações:
              </p>

              <div className="space-y-4">
                <div className="border border-yellow-500/20 rounded-lg p-4 bg-yellow-500/5">
                  <h4 className="text-yellow-400 font-semibold mb-2">Prestadores de Serviços</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Compartilhamos dados com terceiros que nos auxiliam na operação do site:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Provedores de hospedagem</li>
                    <li>• Serviços de análise (Google Analytics)</li>
                    <li>• Processadores de pagamento</li>
                    <li>• Serviços de e-mail</li>
                  </ul>
                </div>

                <div className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                  <h4 className="text-red-400 font-semibold mb-2">Obrigações Legais</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Podemos compartilhar dados quando exigido por lei:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Ordens judiciais</li>
                    <li>• Investigações policiais</li>
                    <li>• Proteção de direitos</li>
                    <li>• Segurança pública</li>
                  </ul>
                </div>

                <div className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                  <h4 className="text-green-400 font-semibold mb-2">Consentimento</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Compartilhamos dados quando você autoriza explicitamente, como para integração 
                    com a API da Riot Games ou outros serviços de terceiros.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 5 */}
          <Card className="glass-card" id="seguranca">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                5. Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Implementamos medidas técnicas e organizacionais para proteger suas informações:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Medidas Técnicas</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Criptografia SSL/TLS</li>
                      <li>• Senhas hasheadas</li>
                      <li>• Firewalls e proteção DDoS</li>
                      <li>• Backup regular</li>
                      <li>• Monitoramento de segurança</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Medidas Organizacionais</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Acesso restrito aos dados</li>
                      <li>• Treinamento da equipe</li>
                      <li>• Políticas de segurança</li>
                      <li>• Auditorias regulares</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Proteção de Dados</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Minimização de dados</li>
                      <li>• Pseudonimização</li>
                      <li>• Controle de acesso</li>
                      <li>• Logs de auditoria</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Resposta a Incidentes</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Plano de resposta</li>
                      <li>• Notificação obrigatória</li>
                      <li>• Análise de impacto</li>
                      <li>• Medidas corretivas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Limitações</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Embora implementemos medidas de segurança robustas, nenhum sistema é 100% seguro. 
                      Recomendamos que você mantenha suas credenciais seguras e nos notifique imediatamente 
                      sobre qualquer suspeita de uso não autorizado.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 6 */}
          <Card className="glass-card" id="direitos">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                6. Seus Direitos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                De acordo com a LGPD, você possui os seguintes direitos sobre seus dados pessoais:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Acesso e Confirmação</h4>
                    <p className="text-gray-300 text-sm">
                      Solicitar confirmação e acesso aos dados pessoais que tratamos sobre você.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Correção</h4>
                    <p className="text-gray-300 text-sm">
                      Solicitar correção de dados incompletos, inexatos ou desatualizados.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Anonimização ou Eliminação</h4>
                    <p className="text-gray-300 text-sm">
                      Solicitar anonimização ou eliminação de dados desnecessários ou excessivos.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Portabilidade</h4>
                    <p className="text-gray-300 text-sm">
                      Solicitar portabilidade dos dados para outro fornecedor de serviços.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Revogação de Consentimento</h4>
                    <p className="text-gray-300 text-sm">
                      Revogar consentimento a qualquer momento, quando aplicável.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Informações</h4>
                    <p className="text-gray-300 text-sm">
                      Obter informações sobre entidades com as quais compartilhamos dados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">Como Exercer seus Direitos</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  Para exercer qualquer um dos direitos acima, entre em contato conosco através dos 
                  canais indicados na seção de contato. Responderemos sua solicitação no prazo de 15 dias úteis.
                </p>
                <p className="text-gray-400 text-xs">
                  <strong>Importante:</strong> Alguns direitos podem ser limitados por obrigações legais 
                  ou necessidades operacionais legítimas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seção 7 */}
          <Card className="glass-card" id="retencao">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                7. Retenção de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
                para as quais foram coletados:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white font-semibold">Tipo de Dado</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Período de Retenção</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Justificativa</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-green-400 font-medium">Dados de Cadastro</td>
                      <td className="py-3 px-4 text-gray-300">Enquanto a conta estiver ativa</td>
                      <td className="py-3 px-4 text-gray-300">Funcionamento do serviço</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-blue-400 font-medium">Dados de Navegação</td>
                      <td className="py-3 px-4 text-gray-300">Até 2 anos</td>
                      <td className="py-3 px-4 text-gray-300">Análise e melhorias</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-purple-400 font-medium">Dados de Jogo</td>
                      <td className="py-3 px-4 text-gray-300">Até 1 ano após último acesso</td>
                      <td className="py-3 px-4 text-gray-300">Funcionalidades do torneio</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-yellow-400 font-medium">Logs de Sistema</td>
                      <td className="py-3 px-4 text-gray-300">Até 6 meses</td>
                      <td className="py-3 px-4 text-gray-300">Segurança e auditoria</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-red-400 font-medium">Dados Financeiros</td>
                      <td className="py-3 px-4 text-gray-300">Conforme legislação fiscal</td>
                      <td className="py-3 px-4 text-gray-300">Obrigações legais</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-2">Exclusão Automática</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dados são automaticamente excluídos após o período de retenção, exceto quando 
                      há obrigações legais que exijam manutenção por período superior.
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
                <Mail className="w-6 h-6 text-primary" />
                8. Contato e DPO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Para questões relacionadas à privacidade e proteção de dados, entre em contato conosco:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">E-mail Principal</h4>
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
                    <p className="text-gray-300 text-sm">"LGPD - [Seu Nome]"</p>
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
              Esta Política de Privacidade foi atualizada pela última vez em 15 de Janeiro de 2025. 
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
