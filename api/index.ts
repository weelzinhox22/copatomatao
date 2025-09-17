// Vercel API entry point
import express from 'express';
import cors from 'cors';
import { registerRoutes } from '../server/routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register all routes
await registerRoutes(app);

export default app;
