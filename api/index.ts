// Vercel API entry point
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Riot API routes
app.get('/api/riot/player/:gameName/:tagLine', async (req, res) => {
  try {
    const { gameName, tagLine } = req.params;
    res.json({ 
      gameName, 
      tagLine, 
      message: 'Player endpoint funcionando',
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default app;
