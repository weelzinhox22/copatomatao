import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegister } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"captain" | "player">("player");
  const [preferredLane, setPreferredLane] = useState<string>("");
  const [riotId, setRiotId] = useState("");
  
  const register = useRegister();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await register.mutateAsync({
        email,
        password,
        username,
        fullName: fullName || undefined,
        role,
        preferredLane: (preferredLane || undefined) as any,
        riotId: riotId || undefined,
      });
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao LoL Championship. Você já está logado.",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="neon-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-gaming gradient-text" data-testid="text-register-title">
              CRIAR CONTA
            </CardTitle>
            <CardDescription>
              Junte-se ao maior campeonato de League of Legends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="SeuUsername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  data-testid="input-username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  data-testid="input-full-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riotId">Riot ID</Label>
                <Input
                  id="riotId"
                  type="text"
                  placeholder="NomeRiot#TAG"
                  value={riotId}
                  onChange={(e) => setRiotId(e.target.value)}
                  data-testid="input-riot-id"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Tipo de usuário *</Label>
                <Select value={role} onValueChange={(value: "captain" | "player") => setRole(value)}>
                  <SelectTrigger data-testid="select-role">
                    <SelectValue placeholder="Selecione seu tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="player">Jogador</SelectItem>
                    <SelectItem value="captain">Capitão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {role === "player" && (
                <div className="space-y-2">
                  <Label htmlFor="preferredLane">Lane preferida</Label>
                  <Select value={preferredLane} onValueChange={setPreferredLane}>
                    <SelectTrigger data-testid="select-lane">
                      <SelectValue placeholder="Selecione sua lane" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="jungle">Jungle</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="adc">ADC</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                type="submit"
                className="w-full neon-glow"
                disabled={register.isPending}
                data-testid="button-submit"
              >
                {register.isPending ? "Criando conta..." : "Criar conta"}
              </Button>

              {register.error && (
                <Alert variant="destructive" data-testid="alert-error">
                  <AlertDescription>
                    {register.error.message || "Erro no cadastro. Tente novamente."}
                  </AlertDescription>
                </Alert>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Já tem uma conta? </span>
              <Link href="/login" data-testid="link-login">
                <a className="text-primary hover:text-primary/80 font-medium">
                  Faça login aqui
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
