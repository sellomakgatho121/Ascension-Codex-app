import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  chakraProgress: jsonb("chakra_progress").$type<{
    physicalChakras: number[];
    morphogeneticChakras: number[];
    completedChakras: number[];
  }>(),
  lightbodyProgress: jsonb("lightbody_progress").$type<{
    activatedLayers: string[];
    integrationLevel: number;
  }>(),
  gridProgress: jsonb("grid_progress").$type<{
    activatedSpheres: number[];
    shieldIntegration: string[];
  }>(),
  overallLevel: integer("overall_level").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const spiritualContent = pgTable("spiritual_content", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'chakra', 'lightbody', 'hova', 'tree-grid'
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").$type<{
    location?: string;
    color?: string;
    dimension?: string;
    function?: string;
    ascensionPurpose?: string;
    connections?: string[];
    practices?: string[];
  }>(),
  order: integer("order").default(0),
});

export const meditationSessions = pgTable("meditation_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // 'chakra-clearing', '12d-shield', 'lightbody-activation'
  duration: integer("duration").notNull(), // in minutes
  focusArea: text("focus_area"), // specific chakra or system
  notes: text("notes"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  likes: integer("likes").default(0),
  replies: integer("replies").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const groupSessions = pgTable("group_sessions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'meditation', 'study', 'practice', 'discussion'
  hostId: integer("host_id").notNull(),
  description: text("description").notNull(),
  participants: integer("participants").default(0),
  maxParticipants: integer("max_participants").notNull(),
  scheduledTime: timestamp("scheduled_time").notNull(),
  duration: integer("duration").notNull(), // in minutes
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  isActive: integer("is_active").default(1), // 1 = active, 0 = cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityMembers = pgTable("community_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  level: text("level").notNull(),
  specialties: text("specialties").array(),
  contributions: integer("contributions").default(0),
  isMentor: integer("is_mentor").default(0), // 1 = mentor, 0 = regular member
  isOnline: integer("is_online").default(0), // 1 = online, 0 = offline
  joinDate: timestamp("join_date").defaultNow(),
  lastSeen: timestamp("last_seen").defaultNow(),
});

export const postReactions = pgTable("post_reactions", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // 'like', 'reply', 'share'
  content: text("content"), // for reply content
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  chakraProgress: true,
  lightbodyProgress: true,
  gridProgress: true,
  overallLevel: true,
});

export const insertSpiritualContentSchema = createInsertSchema(spiritualContent).pick({
  type: true,
  category: true,
  title: true,
  description: true,
  content: true,
  order: true,
});

export const insertMeditationSessionSchema = createInsertSchema(meditationSessions).pick({
  userId: true,
  type: true,
  duration: true,
  focusArea: true,
  notes: true,
});

export const insertForumPostSchema = createInsertSchema(forumPosts).pick({
  title: true,
  content: true,
  category: true,
  tags: true,
}).extend({
  authorId: z.number().optional(), // Server-derived, client should not control
});

export const insertGroupSessionSchema = createInsertSchema(groupSessions).pick({
  title: true,
  type: true,
  description: true,
  maxParticipants: true,
  scheduledTime: true,
  duration: true,
  level: true,
}).extend({
  hostId: z.number().optional(), // Server-derived, client should not control
});

export const insertCommunityMemberSchema = createInsertSchema(communityMembers).pick({
  userId: true,
  displayName: true,
  level: true,
  specialties: true,
  isMentor: true,
});

export const insertPostReactionSchema = createInsertSchema(postReactions).pick({
  postId: true,
  type: true,
  content: true,
}).extend({
  userId: z.number().optional(), // Server-derived, client should not control
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type SpiritualContent = typeof spiritualContent.$inferSelect;
export type InsertSpiritualContent = z.infer<typeof insertSpiritualContentSchema>;
export type MeditationSession = typeof meditationSessions.$inferSelect;
export type InsertMeditationSession = z.infer<typeof insertMeditationSessionSchema>;
export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type GroupSession = typeof groupSessions.$inferSelect;
export type InsertGroupSession = z.infer<typeof insertGroupSessionSchema>;
export type CommunityMember = typeof communityMembers.$inferSelect;
export type InsertCommunityMember = z.infer<typeof insertCommunityMemberSchema>;
export type PostReaction = typeof postReactions.$inferSelect;
export type InsertPostReaction = z.infer<typeof insertPostReactionSchema>;
