import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Trophy, 
  FileText, 
  Settings,
  Shield,
  AlertTriangle
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  // Redirect if not admin
  if (!authLoading && (!user || user.role !== "admin")) {
    setLocation("/");
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-gaming font-bold">
              <span className="gradient-text">PAINEL</span> ADMIN
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Gerencie o campeonato, notícias e usuários
          </p>
          <Badge variant="secondary" className="mt-2" data-testid="badge-admin-user">
            Logado como: {user?.username}
          </Badge>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="news" className="flex items-center space-x-2" data-testid="tab-news">
              <FileText className="h-4 w-4" />
              <span>Notícias</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center space-x-2" data-testid="tab-teams">
              <Users className="h-4 w-4" />
              <span>Times</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center space-x-2" data-testid="tab-matches">
              <Trophy className="h-4 w-4" />
              <span>Partidas</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2" data-testid="tab-settings">
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </TabsTrigger>
          </TabsList>

          {/* News Management */}
          <TabsContent value="news">
            <NewsManagement />
          </TabsContent>

          {/* Teams Management */}
          <TabsContent value="teams">
            <TeamsManagement />
          </TabsContent>

          {/* Matches Management */}
          <TabsContent value="matches">
            <MatchesManagement />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function NewsManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured: false,
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: news, isLoading } = useQuery({
    queryKey: ["/api/news"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/news", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      setIsCreating(false);
      setFormData({ title: "", content: "", excerpt: "", featured: false });
      toast({ title: "Notícia criada com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao criar notícia", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/news/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      setEditingNews(null);
      setFormData({ title: "", content: "", excerpt: "", featured: false });
      toast({ title: "Notícia atualizada com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar notícia", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      updateMutation.mutate({ id: editingNews.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEditing = (newsItem: any) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || "",
      featured: newsItem.featured,
    });
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setIsCreating(false);
    setEditingNews(null);
    setFormData({ title: "", content: "", excerpt: "", featured: false });
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg"></div>;
  }

  return (
    <div className="space-y-8">
      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="neon-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>{editingNews ? "Editar" : "Criar"} Notícia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-news-title"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Resumo curto da notícia"
                  data-testid="input-news-excerpt"
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={6}
                  data-testid="textarea-news-content"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  data-testid="switch-news-featured"
                />
                <Label htmlFor="featured">Notícia em destaque</Label>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-news"
                >
                  {editingNews ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEditing} data-testid="button-cancel-news">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* News List */}
      <Card className="neon-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Notícias Publicadas</span>
            </CardTitle>
            <Button onClick={() => setIsCreating(true)} data-testid="button-create-news">
              <Plus className="h-4 w-4 mr-2" />
              Nova Notícia
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {news?.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground" data-testid="text-no-news">
                Nenhuma notícia publicada ainda.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {news?.map((newsItem: any, index: number) => (
                <div key={newsItem.id} className="tournament-card rounded-lg p-4" data-testid={`news-item-${index}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold" data-testid={`news-title-${index}`}>
                          {newsItem.title}
                        </h3>
                        {newsItem.featured && (
                          <Badge className="bg-primary text-primary-foreground">Destaque</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`news-excerpt-${index}`}>
                        {newsItem.excerpt || newsItem.content.slice(0, 100) + "..."}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Por {newsItem.author?.username} em {new Date(newsItem.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(newsItem)}
                        data-testid={`button-edit-news-${index}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        data-testid={`button-delete-news-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TeamsManagement() {
  const { data: teams, isLoading } = useQuery({
    queryKey: ["/api/teams"],
  });

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg"></div>;
  }

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Gerenciar Times</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {teams?.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground" data-testid="text-no-teams-admin">
              Nenhum time inscrito ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {teams?.map((team: any, index: number) => (
              <div key={team.id} className="tournament-card rounded-lg p-4" data-testid={`admin-team-${index}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold" data-testid={`admin-team-name-${index}`}>
                      {team.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Criado em {new Date(team.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" data-testid={`admin-team-status-${index}`}>
                      Ativo
                    </Badge>
                    <Button variant="ghost" size="icon" data-testid={`button-edit-team-${index}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MatchesManagement() {
  const { data: matches, isLoading } = useQuery({
    queryKey: ["/api/matches"],
  });

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg"></div>;
  }

  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span>Gerenciar Partidas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {matches?.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground" data-testid="text-no-matches-admin">
              Nenhuma partida agendada ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches?.map((match: any, index: number) => (
              <div key={match.id} className="tournament-card rounded-lg p-4" data-testid={`admin-match-${index}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold" data-testid={`admin-match-teams-${index}`}>
                      Time 1 vs Time 2
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(match.scheduledAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge 
                      variant={match.status === "live" ? "destructive" : "secondary"}
                      data-testid={`admin-match-status-${index}`}
                    >
                      {match.status}
                    </Badge>
                    <Button variant="ghost" size="icon" data-testid={`button-edit-match-${index}`}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SettingsManagement() {
  return (
    <div className="space-y-8">
      <Card className="neon-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configurações Gerais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Inscrições Abertas</h3>
                <p className="text-sm text-muted-foreground">
                  Permitir novos times se inscreverem no campeonato
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-registrations" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Transmissão Ao Vivo</h3>
                <p className="text-sm text-muted-foreground">
                  Habilitar links de transmissão nas páginas
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-live-streaming" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Notificações Push</h3>
                <p className="text-sm text-muted-foreground">
                  Enviar notificações sobre partidas e resultados
                </p>
              </div>
              <Switch defaultChecked data-testid="switch-notifications" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="neon-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Zona de Perigo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              As ações abaixo são irreversíveis. Use com extrema cautela.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <Button variant="destructive" className="w-full" data-testid="button-reset-tournament">
              <Trash2 className="mr-2 h-4 w-4" />
              Resetar Torneio Completo
            </Button>
            
            <Button variant="destructive" className="w-full" data-testid="button-clear-all-data">
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Todos os Dados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
