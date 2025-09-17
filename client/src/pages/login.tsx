import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLogin } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login.mutateAsync({ email, password });
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao LoL Championship.",
      });
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="neon-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-gaming gradient-text" data-testid="text-login-title">
              FAZER LOGIN
            </CardTitle>
            <CardDescription>
              Entre na sua conta para acessar o campeonato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Senha</Label>
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

              <Button
                type="submit"
                className="w-full neon-glow"
                disabled={login.isPending}
                data-testid="button-submit"
              >
                {login.isPending ? "Entrando..." : "Entrar"}
              </Button>

              {login.error && (
                <Alert variant="destructive" data-testid="alert-error">
                  <AlertDescription>
                    {login.error.message || "Credenciais inválidas. Tente novamente."}
                  </AlertDescription>
                </Alert>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Não tem uma conta? </span>
              <Link href="/register" data-testid="link-register">
                <a className="text-primary hover:text-primary/80 font-medium">
                  Cadastre-se aqui
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
