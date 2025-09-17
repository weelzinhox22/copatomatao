import { eq, desc, and } from "drizzle-orm";
import { 
  users, teams, teamMembers, matches, news,
  type User, type InsertUser,
  type Team, type InsertTeam,
  type TeamMember, type InsertTeamMember,
  type Match, type InsertMatch,
  type News, type InsertNews
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User>;
  
  // Teams
  getTeam(id: string): Promise<Team | undefined>;
  getTeamByName(name: string): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  getAllTeams(): Promise<Team[]>;
  
  // Team Members
  getTeamMembers(teamId: string): Promise<(TeamMember & { user: User })[]>;
  addTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  removeTeamMember(teamId: string, playerId: string): Promise<void>;
  
  // Matches
  getMatch(id: string): Promise<Match | undefined>;
  getAllMatches(): Promise<Match[]>;
  getMatchesByPhase(phase: string): Promise<Match[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: string, updates: Partial<InsertMatch>): Promise<Match>;
  
  // News
  getNews(id: string): Promise<News | undefined>;
  getAllNews(): Promise<(News & { author: User })[]>;
  getFeaturedNews(): Promise<(News & { author: User })[]>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: string, updates: Partial<InsertNews>): Promise<News>;
  deleteNews(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user as any).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const result = await db.update(users).set(updates as any).where(eq(users.id, id)).returning();
    return result[0];
  }

  async getTeam(id: string): Promise<Team | undefined> {
    const result = await db.select().from(teams).where(eq(teams.id, id));
    return result[0];
  }

  async getTeamByName(name: string): Promise<Team | undefined> {
    const result = await db.select().from(teams).where(eq(teams.name, name));
    return result[0];
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const result = await db.insert(teams).values(team).returning();
    return result[0];
  }

  async getAllTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }

  async getTeamMembers(teamId: string): Promise<(TeamMember & { user: User })[]> {
    const result = await db
      .select({
        id: teamMembers.id,
        teamId: teamMembers.teamId,
        playerId: teamMembers.playerId,
        lane: teamMembers.lane,
        joinedAt: teamMembers.joinedAt,
        user: users,
      })
      .from(teamMembers)
      .innerJoin(users, eq(teamMembers.playerId, users.id))
      .where(eq(teamMembers.teamId, teamId));
    
    return result.map(row => ({
      id: row.id,
      teamId: row.teamId,
      playerId: row.playerId,
      lane: row.lane,
      joinedAt: row.joinedAt,
      user: row.user,
    }));
  }

  async addTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const result = await db.insert(teamMembers).values(member as any).returning();
    return result[0];
  }

  async removeTeamMember(teamId: string, playerId: string): Promise<void> {
    await db.delete(teamMembers).where(
      and(eq(teamMembers.teamId, teamId), eq(teamMembers.playerId, playerId))
    );
  }

  async getMatch(id: string): Promise<Match | undefined> {
    const result = await db.select().from(matches).where(eq(matches.id, id));
    return result[0];
  }

  async getAllMatches(): Promise<Match[]> {
    return await db.select().from(matches).orderBy(desc(matches.scheduledAt));
  }

  async getMatchesByPhase(phase: string): Promise<Match[]> {
    return await db.select().from(matches).where(eq(matches.phase, phase as any));
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const result = await db.insert(matches).values(match as any).returning();
    return result[0];
  }

  async updateMatch(id: string, updates: Partial<InsertMatch>): Promise<Match> {
    const result = await db.update(matches).set(updates as any).where(eq(matches.id, id)).returning();
    return result[0];
  }

  async getNews(id: string): Promise<News | undefined> {
    const result = await db.select().from(news).where(eq(news.id, id));
    return result[0];
  }

  async getAllNews(): Promise<(News & { author: User })[]> {
    const result = await db
      .select({
        id: news.id,
        title: news.title,
        content: news.content,
        excerpt: news.excerpt,
        authorId: news.authorId,
        featured: news.featured,
        createdAt: news.createdAt,
        author: users,
      })
      .from(news)
      .innerJoin(users, eq(news.authorId, users.id))
      .orderBy(desc(news.createdAt));
    
    return result.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      excerpt: row.excerpt,
      authorId: row.authorId,
      featured: row.featured,
      createdAt: row.createdAt,
      author: row.author,
    }));
  }

  async getFeaturedNews(): Promise<(News & { author: User })[]> {
    const result = await db
      .select({
        id: news.id,
        title: news.title,
        content: news.content,
        excerpt: news.excerpt,
        authorId: news.authorId,
        featured: news.featured,
        createdAt: news.createdAt,
        author: users,
      })
      .from(news)
      .innerJoin(users, eq(news.authorId, users.id))
      .where(eq(news.featured, true))
      .orderBy(desc(news.createdAt));
    
    return result.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      excerpt: row.excerpt,
      authorId: row.authorId,
      featured: row.featured,
      createdAt: row.createdAt,
      author: row.author,
    }));
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const result = await db.insert(news).values(newsItem).returning();
    return result[0];
  }

  async updateNews(id: string, updates: Partial<InsertNews>): Promise<News> {
    const result = await db.update(news).set(updates).where(eq(news.id, id)).returning();
    return result[0];
  }

  async deleteNews(id: string): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }
}

export const storage = new DatabaseStorage();
