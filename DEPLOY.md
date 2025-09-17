# 🚀 Guia de Deploy - Copa Tomatão

## 📋 **Pré-requisitos**

1. **Variáveis de Ambiente Obrigatórias:**
   - `DATABASE_URL`: URL do PostgreSQL
   - `RIOT_API_KEY`: Chave da API da Riot Games
   - `SESSION_SECRET`: Segredo para sessões (gere um aleatório)
   - `NODE_ENV`: production

## 🎯 **Deploy no Render** (Recomendado)

### **1. Configuração do Banco de Dados:**
1. Acesse [render.com](https://render.com)
2. Crie um **PostgreSQL Database**:
   - Name: `copa-tomatao-db`
   - Database: `copatomatao`
   - User: `copatomatao`
   - Plan: Free
3. Anote a `DATABASE_URL` gerada

### **2. Deploy do Backend:**
1. Crie um **Web Service**:
   - Connect your GitHub repository
   - Build Command: `npm run render:build`
   - Start Command: `npm run start`
   - Plan: Free

2. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://user:pass@host:port/db
   RIOT_API_KEY=RGAPI-0a987b67-6e29-48a5-85c9-db2c86b72c7
   SESSION_SECRET=seu-session-secret-super-secreto
   NODE_ENV=production
   ```

3. **Deploy automático:** Conecte ao GitHub para deploy automático

### **3. Configuração Final:**
- URL do backend estará disponível em: `https://seu-app.onrender.com`
- Configure CORS se necessário
- Teste as rotas da API

## ⚡ **Deploy no Vercel** (Alternativo)

### **1. Deploy do Backend:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configurar variáveis de ambiente
vercel env add DATABASE_URL
vercel env add RIOT_API_KEY
vercel env add SESSION_SECRET
```

### **2. Limitações do Vercel:**
- ⚠️ Timeout de 10 segundos para funções
- ⚠️ Sem estado persistente (ideal para APIs stateless)
- ⚠️ Rate limiting mais rígido

## 🐳 **Deploy com Docker**

### **1. Build da Imagem:**
```bash
docker build -t copa-tomatao .
```

### **2. Executar Container:**
```bash
# Criar arquivo .env com as variáveis
docker run -p 5000:5000 --env-file .env copa-tomatao
```

### **3. Deploy em Cloud Providers:**
- **Google Cloud Run**
- **AWS ECS**
- **Azure Container Instances**

## 🔧 **Deploy Híbrido (Melhor Opção)**

### **Frontend no Vercel:**
1. Deploy apenas a pasta `client/`
2. Configure `VITE_API_URL=https://seu-backend-render.com`

### **Backend no Render:**
1. Deploy completo com banco de dados
2. Configure CORS para aceitar requests do Vercel

## 🛠️ **Scripts de Deploy**

```bash
# Build local
npm run build

# Build para Render
npm run render:build

# Build para Vercel
npm run vercel:build

# Docker
npm run docker:build
npm run docker:run
```

## 🔍 **Verificação de Deploy**

### **Checklist pós-deploy:**
- [ ] ✅ API responde em `/api/health`
- [ ] ✅ Banco de dados conectado
- [ ] ✅ Riot API funcionando
- [ ] ✅ Autenticação funcionando
- [ ] ✅ Frontend carregando
- [ ] ✅ CORS configurado
- [ ] ✅ Variáveis de ambiente definidas

### **Teste das Rotas:**
```bash
# Health check
curl https://seu-app.onrender.com/api/health

# Teste de jogador
curl https://seu-app.onrender.com/api/riot/player/welziinho/wel
```

## 🚨 **Problemas Comuns**

### **1. "DATABASE_URL must be set"**
```bash
# Verificar se a variável está definida
echo $DATABASE_URL

# Configurar no Render/Vercel
```

### **2. "Rate limit exceeded"**
- Implementar cache no Riot API
- Usar menos requisições por segundo
- Implementar retry logic

### **3. "CORS Error"**
```javascript
// Configurar CORS no backend
app.use(cors({
  origin: ['https://seu-frontend.vercel.app']
}));
```

### **4. "Build failed"**
```bash
# Verificar Node.js version
node --version

# Verificar dependências
npm audit fix
```

## 📊 **Monitoramento**

### **Logs no Render:**
- Acesse o dashboard do Render
- Vá em "Logs" para ver erros em tempo real

### **Métricas:**
- Response time
- Error rate
- Database connections
- API rate limits

## 🎉 **Deploy Finalizado!**

Após o deploy bem-sucedido:
1. 🎯 Teste todas as funcionalidades
2. 📝 Documente a URL de produção
3. 🔄 Configure CI/CD para deploys automáticos
4. 📊 Configure monitoramento e alertas
