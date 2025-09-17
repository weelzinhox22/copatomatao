import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import session from "express-session";
import { storage } from "./storage";
import { insertUserSchema, insertTeamSchema, insertNewsSchema, users } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role: "captain" | "player" | "admin";
        fullName?: string;
        preferredLane?: "top" | "jungle" | "mid" | "adc" | "support";
        riotId?: string;
        createdAt: Date;
      };
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "fallback-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
    })
  );

  // Auth middleware
  const requireAuth = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  };

  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, username: user.username, role: user.role });
    } catch (error) {
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ id: user.id, email: user.email, username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    const { password, ...user } = req.user as any;
    res.json(user);
  });

  // Teams routes
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  app.post("/api/teams", requireAuth, async (req, res) => {
    try {
      if (!req.user || req.user.role !== "captain") {
        return res.status(403).json({ message: "Only captains can create teams" });
      }

      const teamData = insertTeamSchema.parse({
        ...req.body,
        captainId: req.user!.id,
      });

      const team = await storage.createTeam(teamData);
      res.json(team);
    } catch (error) {
      res.status(400).json({ message: "Failed to create team" });
    }
  });

  app.get("/api/teams/:id/members", async (req, res) => {
    try {
      const members = await storage.getTeamMembers(req.params.id);
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.post("/api/teams/:id/members", requireAuth, async (req, res) => {
    try {
      const team = await storage.getTeam(req.params.id);
      if (!team || !req.user || team.captainId !== req.user.id) {
        return res.status(403).json({ message: "Only team captain can add members" });
      }

      const member = await storage.addTeamMember({
        teamId: req.params.id,
        playerId: req.body.playerId,
        lane: req.body.lane,
      });
      res.json(member);
    } catch (error) {
      res.status(400).json({ message: "Failed to add team member" });
    }
  });

  // Matches routes
  app.get("/api/matches", async (req, res) => {
    try {
      const matches = await storage.getAllMatches();
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  app.get("/api/matches/phase/:phase", async (req, res) => {
    try {
      const matches = await storage.getMatchesByPhase(req.params.phase);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  // Users routes
  app.get("/api/users", async (req, res) => {
    try {
      const allUsers = await db.select({
        id: users.id,
        email: users.email,
        username: users.username,
        role: users.role,
        fullName: users.fullName,
        preferredLane: users.preferredLane,
        riotId: users.riotId,
        createdAt: users.createdAt,
      }).from(users);
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/featured", async (req, res) => {
    try {
      const news = await storage.getFeaturedNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured news" });
    }
  });

  app.post("/api/news", requireAuth, requireAdmin, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse({
        ...req.body,
        authorId: req.user!.id,
      });

      const news = await storage.createNews(newsData);
      res.json(news);
    } catch (error) {
      res.status(400).json({ message: "Failed to create news" });
    }
  });

  app.put("/api/news/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const news = await storage.updateNews(req.params.id, req.body);
      res.json(news);
    } catch (error) {
      res.status(400).json({ message: "Failed to update news" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
