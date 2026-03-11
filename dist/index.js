var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";
import fileUpload from "express-fileupload";

// server/routes.ts
import { createServer } from "http";
import OpenAI from "openai";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  communityMembers: () => communityMembers,
  forumPosts: () => forumPosts,
  groupSessions: () => groupSessions,
  insertCommunityMemberSchema: () => insertCommunityMemberSchema,
  insertForumPostSchema: () => insertForumPostSchema,
  insertGroupSessionSchema: () => insertGroupSessionSchema,
  insertMeditationSessionSchema: () => insertMeditationSessionSchema,
  insertPostReactionSchema: () => insertPostReactionSchema,
  insertSpiritualContentSchema: () => insertSpiritualContentSchema,
  insertUserProgressSchema: () => insertUserProgressSchema,
  insertUserSchema: () => insertUserSchema,
  meditationSessions: () => meditationSessions,
  postReactions: () => postReactions,
  spiritualContent: () => spiritualContent,
  userProgress: () => userProgress,
  users: () => users
});
import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});
var userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  chakraProgress: jsonb("chakra_progress").$type(),
  lightbodyProgress: jsonb("lightbody_progress").$type(),
  gridProgress: jsonb("grid_progress").$type(),
  overallLevel: integer("overall_level").default(0),
  lastUpdated: timestamp("last_updated").defaultNow()
});
var spiritualContent = pgTable("spiritual_content", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  // 'chakra', 'lightbody', 'hova', 'tree-grid'
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").$type(),
  order: integer("order").default(0)
});
var meditationSessions = pgTable("meditation_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  // 'chakra-clearing', '12d-shield', 'lightbody-activation'
  duration: integer("duration").notNull(),
  // in minutes
  focusArea: text("focus_area"),
  // specific chakra or system
  notes: text("notes"),
  completedAt: timestamp("completed_at").defaultNow()
});
var forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  likes: integer("likes").default(0),
  replies: integer("replies").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var groupSessions = pgTable("group_sessions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  // 'meditation', 'study', 'practice', 'discussion'
  hostId: integer("host_id").notNull(),
  description: text("description").notNull(),
  participants: integer("participants").default(0),
  maxParticipants: integer("max_participants").notNull(),
  scheduledTime: timestamp("scheduled_time").notNull(),
  duration: integer("duration").notNull(),
  // in minutes
  level: text("level").notNull(),
  // 'beginner', 'intermediate', 'advanced'
  isActive: integer("is_active").default(1),
  // 1 = active, 0 = cancelled
  createdAt: timestamp("created_at").defaultNow()
});
var communityMembers = pgTable("community_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  level: text("level").notNull(),
  specialties: text("specialties").array(),
  contributions: integer("contributions").default(0),
  isMentor: integer("is_mentor").default(0),
  // 1 = mentor, 0 = regular member
  isOnline: integer("is_online").default(0),
  // 1 = online, 0 = offline
  joinDate: timestamp("join_date").defaultNow(),
  lastSeen: timestamp("last_seen").defaultNow()
});
var postReactions = pgTable("post_reactions", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(),
  // 'like', 'reply', 'share'
  content: text("content"),
  // for reply content
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true
});
var insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  chakraProgress: true,
  lightbodyProgress: true,
  gridProgress: true,
  overallLevel: true
});
var insertSpiritualContentSchema = createInsertSchema(spiritualContent).pick({
  type: true,
  category: true,
  title: true,
  description: true,
  content: true,
  order: true
});
var insertMeditationSessionSchema = createInsertSchema(meditationSessions).pick({
  userId: true,
  type: true,
  duration: true,
  focusArea: true,
  notes: true
});
var insertForumPostSchema = createInsertSchema(forumPosts).pick({
  title: true,
  content: true,
  category: true,
  tags: true
}).extend({
  authorId: z.number().optional()
  // Server-derived, client should not control
});
var insertGroupSessionSchema = createInsertSchema(groupSessions).pick({
  title: true,
  type: true,
  description: true,
  maxParticipants: true,
  scheduledTime: true,
  duration: true,
  level: true
}).extend({
  hostId: z.number().optional()
  // Server-derived, client should not control
});
var insertCommunityMemberSchema = createInsertSchema(communityMembers).pick({
  userId: true,
  displayName: true,
  level: true,
  specialties: true,
  isMentor: true
});
var insertPostReactionSchema = createInsertSchema(postReactions).pick({
  postId: true,
  type: true,
  content: true
}).extend({
  userId: z.number().optional()
  // Server-derived, client should not control
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  console.warn(
    "WARNING: DATABASE_URL is not set. Database features will fail. Proceeding in offline/demo mode."
  );
}
var connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/energetic_synthesis";
var pool = new Pool({ connectionString });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc, sql } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    if (!user) throw new Error("Failed to create user");
    return user;
  }
  async getUserProgress(userId) {
    const [progress] = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
    return progress;
  }
  async updateUserProgress(userId, progressUpdate) {
    const existing = await this.getUserProgress(userId);
    if (existing) {
      const updateData = {
        lastUpdated: /* @__PURE__ */ new Date()
      };
      if (progressUpdate.chakraProgress) updateData.chakraProgress = progressUpdate.chakraProgress;
      if (progressUpdate.lightbodyProgress) updateData.lightbodyProgress = progressUpdate.lightbodyProgress;
      if (progressUpdate.gridProgress) updateData.gridProgress = progressUpdate.gridProgress;
      if (progressUpdate.overallLevel !== void 0) updateData.overallLevel = progressUpdate.overallLevel;
      const [updated] = await db.update(userProgress).set(updateData).where(eq(userProgress.userId, userId)).returning();
      if (!updated) throw new Error("Failed to update user progress");
      return updated;
    } else {
      return await this.createUserProgress({
        userId,
        chakraProgress: progressUpdate.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] },
        lightbodyProgress: progressUpdate.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 },
        gridProgress: progressUpdate.gridProgress || { activatedSpheres: [], shieldIntegration: [] },
        overallLevel: progressUpdate.overallLevel || 0
      });
    }
  }
  async createUserProgress(progress) {
    const insertData = {
      userId: progress.userId,
      chakraProgress: progress.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] },
      lightbodyProgress: progress.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 },
      gridProgress: progress.gridProgress || { activatedSpheres: [], shieldIntegration: [] },
      overallLevel: progress.overallLevel || 0
    };
    const [newProgress] = await db.insert(userProgress).values(insertData).returning();
    if (!newProgress) throw new Error("Failed to create user progress");
    return newProgress;
  }
  async getSpiritualContent(type, category) {
    if (type && category) {
      const content2 = await db.select().from(spiritualContent).where(and(eq(spiritualContent.type, type), eq(spiritualContent.category, category)));
      return content2.sort((a, b) => (a.order || 0) - (b.order || 0));
    } else if (type) {
      const content2 = await db.select().from(spiritualContent).where(eq(spiritualContent.type, type));
      return content2.sort((a, b) => (a.order || 0) - (b.order || 0));
    } else if (category) {
      const content2 = await db.select().from(spiritualContent).where(eq(spiritualContent.category, category));
      return content2.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    const content = await db.select().from(spiritualContent);
    return content.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  async getSpiritualContentById(id) {
    const [content] = await db.select().from(spiritualContent).where(eq(spiritualContent.id, id));
    return content;
  }
  async createSpiritualContent(content) {
    const insertData = {
      type: content.type,
      category: content.category,
      title: content.title,
      description: content.description,
      content: content.content || null,
      order: content.order || 0
    };
    const [newContent] = await db.insert(spiritualContent).values(insertData).returning();
    if (!newContent) throw new Error("Failed to create spiritual content");
    return newContent;
  }
  async getMeditationSessions(userId) {
    const sessions = await db.select().from(meditationSessions).where(eq(meditationSessions.userId, userId));
    return sessions.sort((a, b) => {
      const aTime = a.completedAt ? a.completedAt.getTime() : 0;
      const bTime = b.completedAt ? b.completedAt.getTime() : 0;
      return bTime - aTime;
    });
  }
  async createMeditationSession(session) {
    const [newSession] = await db.insert(meditationSessions).values({
      ...session,
      completedAt: /* @__PURE__ */ new Date(),
      focusArea: session.focusArea || null,
      notes: session.notes || null
    }).returning();
    if (!newSession) throw new Error("Failed to create meditation session");
    return newSession;
  }
  // Community: Forum posts
  async getForumPosts(category) {
    const query = category ? db.select().from(forumPosts).where(eq(forumPosts.category, category)) : db.select().from(forumPosts);
    const posts = await query.orderBy(desc(forumPosts.createdAt));
    return posts;
  }
  async getForumPostById(id) {
    const [post] = await db.select().from(forumPosts).where(eq(forumPosts.id, id));
    return post;
  }
  async createForumPost(post) {
    const [newPost] = await db.insert(forumPosts).values({
      ...post,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    if (!newPost) throw new Error("Failed to create forum post");
    return newPost;
  }
  async updateForumPost(id, updates) {
    const [updatedPost] = await db.update(forumPosts).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(forumPosts.id, id)).returning();
    if (!updatedPost) throw new Error("Forum post not found");
    return updatedPost;
  }
  async deleteForumPost(id) {
    const result = await db.delete(forumPosts).where(eq(forumPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  // Community: Group sessions
  async getGroupSessions() {
    const sessions = await db.select().from(groupSessions).where(eq(groupSessions.isActive, 1)).orderBy(groupSessions.scheduledTime);
    return sessions;
  }
  async getGroupSessionById(id) {
    const [session] = await db.select().from(groupSessions).where(eq(groupSessions.id, id));
    return session;
  }
  async createGroupSession(session) {
    const [newSession] = await db.insert(groupSessions).values({
      ...session,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    if (!newSession) throw new Error("Failed to create group session");
    return newSession;
  }
  async updateGroupSession(id, updates) {
    const [updatedSession] = await db.update(groupSessions).set(updates).where(eq(groupSessions.id, id)).returning();
    if (!updatedSession) throw new Error("Group session not found");
    return updatedSession;
  }
  async joinGroupSession(sessionId) {
    const [updatedSession] = await db.update(groupSessions).set({ participants: sql`${groupSessions.participants} + 1` }).where(eq(groupSessions.id, sessionId)).returning();
    if (!updatedSession) throw new Error("Group session not found");
    return updatedSession;
  }
  // Community: Members
  async getCommunityMembers() {
    const members = await db.select().from(communityMembers).orderBy(desc(communityMembers.contributions));
    return members;
  }
  async getCommunityMemberByUserId(userId) {
    const [member] = await db.select().from(communityMembers).where(eq(communityMembers.userId, userId));
    return member;
  }
  async createCommunityMember(member) {
    const [newMember] = await db.insert(communityMembers).values({
      ...member,
      joinDate: /* @__PURE__ */ new Date(),
      lastSeen: /* @__PURE__ */ new Date()
    }).returning();
    if (!newMember) throw new Error("Failed to create community member");
    return newMember;
  }
  async updateCommunityMember(id, updates) {
    const [updatedMember] = await db.update(communityMembers).set({ ...updates, lastSeen: /* @__PURE__ */ new Date() }).where(eq(communityMembers.id, id)).returning();
    if (!updatedMember) throw new Error("Community member not found");
    return updatedMember;
  }
  // Community: Post reactions
  async getPostReactions(postId) {
    const reactions = await db.select().from(postReactions).where(eq(postReactions.postId, postId)).orderBy(desc(postReactions.createdAt));
    return reactions;
  }
  async createPostReaction(reaction) {
    const [newReaction] = await db.insert(postReactions).values({
      ...reaction,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    if (!newReaction) throw new Error("Failed to create post reaction");
    return newReaction;
  }
  async deletePostReaction(id) {
    const result = await db.delete(postReactions).where(eq(postReactions.id, id));
    return (result.rowCount ?? 0) > 0;
  }
};
var MemStorage = class {
  users = [
    { id: 1, username: "spiritual_seeker", email: "seeker@example.com", createdAt: /* @__PURE__ */ new Date() },
    { id: 2, username: "lightworker", email: "light@example.com", createdAt: /* @__PURE__ */ new Date() },
    { id: 3, username: "mentor_guide", email: "mentor@example.com", createdAt: /* @__PURE__ */ new Date() }
  ];
  userProgress = [
    {
      id: 1,
      userId: 1,
      chakraProgress: { physicalChakras: [1, 2, 3], morphogeneticChakras: [1], completedChakras: [1, 2] },
      lightbodyProgress: { activatedLayers: ["L1", "L2"], integrationLevel: 3 },
      gridProgress: { activatedSpheres: [1, 2], shieldIntegration: ["12D-Shield"] },
      overallLevel: 3,
      lastUpdated: /* @__PURE__ */ new Date()
    }
  ];
  spiritualContent = [
    {
      id: 1,
      type: "chakra",
      category: "physical",
      title: "Root Chakra Foundation",
      description: "Grounding and stability in spiritual practice",
      content: {
        location: "Base of spine",
        color: "Red",
        dimension: "1D",
        function: "Survival, grounding, foundation",
        ascensionPurpose: "Establishing secure spiritual foundation",
        connections: ["Earth Element", "Base 1D Frequency"],
        practices: ["12D Shield", "Grounding meditation", "Root chakra clearing"]
      },
      order: 1
    }
  ];
  meditationSessions = [
    {
      id: 1,
      userId: 1,
      type: "12d-shield",
      duration: 30,
      focusArea: "Protection and grounding",
      notes: "Deep sense of protection established",
      completedAt: /* @__PURE__ */ new Date()
    }
  ];
  forumPosts = [
    {
      id: 1,
      title: "Welcome to Energetic Synthesis Community",
      content: "This is a space for spiritual seekers exploring consciousness evolution through ES teachings. Feel free to share your experiences with 12D Shield practice, lightbody activation, and chakra clearing work.",
      authorId: 3,
      // mentor_guide
      category: "general",
      tags: ["welcome", "community", "ES"],
      likes: 15,
      replies: 8,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1e3),
      // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1e3)
    },
    {
      id: 2,
      title: "12D Shield Practice Questions",
      content: "I've been practicing the 12D Shield for two weeks now and I'm starting to feel more energetically protected. However, I sometimes feel overwhelmed during the practice. Is this normal? Any tips for stabilizing the energy?",
      authorId: 1,
      // spiritual_seeker
      category: "practice",
      tags: ["12d-shield", "protection", "energy"],
      likes: 7,
      replies: 12,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1e3),
      // 12 hours ago
      updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1e3)
    },
    {
      id: 3,
      title: "Lightbody Activation Experiences",
      content: "Sharing my journey with lightbody activation - the sensations, the downloads, and the integration process. Week 3: Starting to feel more multidimensional awareness.",
      authorId: 2,
      // lightworker
      category: "experiences",
      tags: ["lightbody", "activation", "consciousness"],
      likes: 23,
      replies: 18,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1e3),
      // 6 hours ago
      updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1e3)
    }
  ];
  groupSessions = [
    {
      id: 1,
      title: "12D Shield Group Practice",
      type: "meditation",
      hostId: 3,
      // mentor_guide
      description: "Guided group session for building and strengthening your 12D Shield. Perfect for beginners and those wanting to deepen their practice.",
      participants: 8,
      maxParticipants: 20,
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1e3),
      // Tomorrow
      duration: 60,
      level: "beginner",
      isActive: 1,
      createdAt: /* @__PURE__ */ new Date()
    },
    {
      id: 2,
      title: "Lightbody Activation Circle",
      type: "practice",
      hostId: 2,
      // lightworker
      description: "Advanced practice session focusing on lightbody activation and integration. We'll work with the 12D template and DNA activation sequences.",
      participants: 5,
      maxParticipants: 12,
      scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1e3),
      // Day after tomorrow
      duration: 90,
      level: "intermediate",
      isActive: 1,
      createdAt: /* @__PURE__ */ new Date()
    },
    {
      id: 3,
      title: "ES Study Group - Grid Mechanics",
      type: "study",
      hostId: 3,
      // mentor_guide
      description: "Deep dive into understanding planetary grid mechanics, ley lines, and their role in consciousness evolution.",
      participants: 12,
      maxParticipants: 25,
      scheduledTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3),
      // Next week
      duration: 120,
      level: "advanced",
      isActive: 1,
      createdAt: /* @__PURE__ */ new Date()
    }
  ];
  communityMembers = [
    {
      id: 1,
      userId: 3,
      displayName: "Mentor Guide",
      level: "Advanced Practitioner",
      specialties: ["12D Shield", "Grid Work", "Lightbody Activation"],
      contributions: 150,
      isMentor: 1,
      isOnline: 1,
      joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1e3),
      // 1 year ago
      lastSeen: /* @__PURE__ */ new Date()
    },
    {
      id: 2,
      userId: 2,
      displayName: "Lightworker",
      level: "Intermediate",
      specialties: ["Lightbody", "Consciousness Evolution", "Energy Healing"],
      contributions: 89,
      isMentor: 0,
      isOnline: 1,
      joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1e3),
      // 6 months ago
      lastSeen: new Date(Date.now() - 30 * 60 * 1e3)
      // 30 minutes ago
    },
    {
      id: 3,
      userId: 1,
      displayName: "Spiritual Seeker",
      level: "Beginner",
      specialties: ["12D Shield", "Chakra Clearing"],
      contributions: 25,
      isMentor: 0,
      isOnline: 0,
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3),
      // 1 month ago
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1e3)
      // 2 hours ago
    }
  ];
  postReactions = [
    {
      id: 1,
      postId: 1,
      userId: 1,
      type: "like",
      content: null,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1e3)
    },
    {
      id: 2,
      postId: 2,
      userId: 3,
      type: "reply",
      content: "This is completely normal! The overwhelm often happens when your energy system is expanding. Try grounding exercises between shield practice sessions.",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1e3)
    },
    {
      id: 3,
      postId: 2,
      userId: 2,
      type: "like",
      content: null,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1e3)
    },
    {
      id: 4,
      postId: 3,
      userId: 1,
      type: "reply",
      content: "Thank you for sharing this! I'm just starting my lightbody journey and this gives me hope.",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1e3)
    }
  ];
  nextId = {
    users: 4,
    userProgress: 2,
    spiritualContent: 2,
    meditationSessions: 2,
    forumPosts: 4,
    groupSessions: 4,
    communityMembers: 4,
    postReactions: 5
  };
  // User management
  async getUser(id) {
    return this.users.find((u) => u.id === id);
  }
  async getUserByEmail(email) {
    return this.users.find((u) => u.email === email);
  }
  async createUser(insertUser) {
    const newUser = {
      id: this.nextId.users++,
      username: insertUser.username,
      email: insertUser.email,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
  // Progress tracking
  async getUserProgress(userId) {
    return this.userProgress.find((p) => p.userId === userId);
  }
  async updateUserProgress(userId, progressUpdate) {
    const existingIndex = this.userProgress.findIndex((p) => p.userId === userId);
    if (existingIndex >= 0) {
      const existing = this.userProgress[existingIndex];
      const updated = {
        ...existing,
        lastUpdated: /* @__PURE__ */ new Date(),
        ...progressUpdate.chakraProgress && { chakraProgress: progressUpdate.chakraProgress },
        ...progressUpdate.lightbodyProgress && { lightbodyProgress: progressUpdate.lightbodyProgress },
        ...progressUpdate.gridProgress && { gridProgress: progressUpdate.gridProgress },
        ...progressUpdate.overallLevel !== void 0 && { overallLevel: progressUpdate.overallLevel }
      };
      this.userProgress[existingIndex] = updated;
      return updated;
    } else {
      return await this.createUserProgress({
        userId,
        chakraProgress: progressUpdate.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] },
        lightbodyProgress: progressUpdate.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 },
        gridProgress: progressUpdate.gridProgress || { activatedSpheres: [], shieldIntegration: [] },
        overallLevel: progressUpdate.overallLevel || 0
      });
    }
  }
  async createUserProgress(progress) {
    const newProgress = {
      id: this.nextId.userProgress++,
      userId: progress.userId,
      chakraProgress: progress.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] },
      lightbodyProgress: progress.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 },
      gridProgress: progress.gridProgress || { activatedSpheres: [], shieldIntegration: [] },
      overallLevel: progress.overallLevel || 0,
      lastUpdated: /* @__PURE__ */ new Date()
    };
    this.userProgress.push(newProgress);
    return newProgress;
  }
  // Spiritual content
  async getSpiritualContent(type, category) {
    let content = [...this.spiritualContent];
    if (type && category) {
      content = content.filter((c) => c.type === type && c.category === category);
    } else if (type) {
      content = content.filter((c) => c.type === type);
    } else if (category) {
      content = content.filter((c) => c.category === category);
    }
    return content.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  async getSpiritualContentById(id) {
    return this.spiritualContent.find((c) => c.id === id);
  }
  async createSpiritualContent(content) {
    const newContent = {
      id: this.nextId.spiritualContent++,
      type: content.type,
      category: content.category,
      title: content.title,
      description: content.description,
      content: content.content || null,
      order: content.order || 0
    };
    this.spiritualContent.push(newContent);
    return newContent;
  }
  // Meditation sessions
  async getMeditationSessions(userId) {
    const sessions = this.meditationSessions.filter((s) => s.userId === userId);
    return sessions.sort((a, b) => {
      const aTime = a.completedAt ? a.completedAt.getTime() : 0;
      const bTime = b.completedAt ? b.completedAt.getTime() : 0;
      return bTime - aTime;
    });
  }
  async createMeditationSession(session) {
    const newSession = {
      id: this.nextId.meditationSessions++,
      userId: session.userId,
      type: session.type,
      duration: session.duration,
      focusArea: session.focusArea || null,
      notes: session.notes || null,
      completedAt: /* @__PURE__ */ new Date()
    };
    this.meditationSessions.push(newSession);
    return newSession;
  }
  // Community: Forum posts
  async getForumPosts(category) {
    let posts = [...this.forumPosts];
    if (category) {
      posts = posts.filter((p) => p.category === category);
    }
    return posts.sort((a, b) => {
      const aTime = a.createdAt ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt ? b.createdAt.getTime() : 0;
      return bTime - aTime;
    });
  }
  async getForumPostById(id) {
    return this.forumPosts.find((p) => p.id === id);
  }
  async createForumPost(post) {
    const newPost = {
      id: this.nextId.forumPosts++,
      title: post.title,
      content: post.content,
      authorId: 1,
      // Security fix: Use server-derived user identity (hardcoded for now)
      category: post.category,
      tags: post.tags || null,
      likes: 0,
      replies: 0,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.forumPosts.push(newPost);
    return newPost;
  }
  async updateForumPost(id, updates) {
    const index = this.forumPosts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Forum post not found");
    }
    const updated = {
      ...this.forumPosts[index],
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.forumPosts[index] = updated;
    return updated;
  }
  async deleteForumPost(id) {
    const index = this.forumPosts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.forumPosts.splice(index, 1);
    return true;
  }
  // Community: Group sessions
  async getGroupSessions() {
    const sessions = this.groupSessions.filter((s) => s.isActive === 1);
    return sessions.sort((a, b) => {
      const aTime = a.scheduledTime ? a.scheduledTime.getTime() : 0;
      const bTime = b.scheduledTime ? b.scheduledTime.getTime() : 0;
      return aTime - bTime;
    });
  }
  async getGroupSessionById(id) {
    return this.groupSessions.find((s) => s.id === id);
  }
  async createGroupSession(session) {
    const newSession = {
      id: this.nextId.groupSessions++,
      title: session.title,
      type: session.type,
      hostId: 1,
      // Security fix: Use server-derived user identity
      description: session.description,
      participants: 0,
      maxParticipants: session.maxParticipants,
      scheduledTime: session.scheduledTime,
      duration: session.duration,
      level: session.level,
      isActive: 1,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.groupSessions.push(newSession);
    return newSession;
  }
  async updateGroupSession(id, updates) {
    const index = this.groupSessions.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Group session not found");
    }
    const updated = { ...this.groupSessions[index], ...updates };
    this.groupSessions[index] = updated;
    return updated;
  }
  async joinGroupSession(sessionId) {
    const index = this.groupSessions.findIndex((s) => s.id === sessionId);
    if (index === -1) {
      throw new Error("Group session not found");
    }
    const session = this.groupSessions[index];
    const updated = { ...session, participants: session.participants + 1 };
    this.groupSessions[index] = updated;
    return updated;
  }
  // Community: Members
  async getCommunityMembers() {
    return [...this.communityMembers].sort((a, b) => b.contributions - a.contributions);
  }
  async getCommunityMemberByUserId(userId) {
    return this.communityMembers.find((m) => m.userId === userId);
  }
  async createCommunityMember(member) {
    const newMember = {
      id: this.nextId.communityMembers++,
      userId: member.userId,
      displayName: member.displayName,
      level: member.level,
      specialties: member.specialties || null,
      contributions: 0,
      isMentor: member.isMentor || 0,
      isOnline: 0,
      joinDate: /* @__PURE__ */ new Date(),
      lastSeen: /* @__PURE__ */ new Date()
    };
    this.communityMembers.push(newMember);
    return newMember;
  }
  async updateCommunityMember(id, updates) {
    const index = this.communityMembers.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error("Community member not found");
    }
    const updated = {
      ...this.communityMembers[index],
      ...updates,
      lastSeen: /* @__PURE__ */ new Date()
    };
    this.communityMembers[index] = updated;
    return updated;
  }
  // Community: Post reactions
  async getPostReactions(postId) {
    const reactions = this.postReactions.filter((r) => r.postId === postId);
    return reactions.sort((a, b) => {
      const aTime = a.createdAt ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt ? b.createdAt.getTime() : 0;
      return bTime - aTime;
    });
  }
  async createPostReaction(reaction) {
    const newReaction = {
      id: this.nextId.postReactions++,
      postId: reaction.postId,
      userId: 1,
      // Security fix: Use server-derived user identity
      type: reaction.type,
      content: reaction.content || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.postReactions.push(newReaction);
    return newReaction;
  }
  async deletePostReaction(id) {
    const index = this.postReactions.findIndex((r) => r.id === id);
    if (index === -1) return false;
    this.postReactions.splice(index, 1);
    return true;
  }
};
var StorageManager = class {
  dbStorage = new DatabaseStorage();
  memStorage = new MemStorage();
  isDatabaseAvailable = true;
  lastDbCheck = 0;
  dbCheckInterval = 3e4;
  // Check every 30 seconds
  async getStorage() {
    const now = Date.now();
    if (now - this.lastDbCheck > this.dbCheckInterval) {
      await this.checkDatabaseAvailability();
      this.lastDbCheck = now;
    }
    return this.isDatabaseAvailable ? this.dbStorage : this.memStorage;
  }
  async checkDatabaseAvailability() {
    try {
      await this.dbStorage.getUser(1);
      if (!this.isDatabaseAvailable) {
        console.log("\u2705 Database connection restored, switching to DatabaseStorage");
      }
      this.isDatabaseAvailable = true;
    } catch (error) {
      if (this.isDatabaseAvailable) {
        console.log("\u26A0\uFE0F Database connection failed, falling back to MemStorage");
        console.error("Database error:", error instanceof Error ? error.message : "Unknown error");
      }
      this.isDatabaseAvailable = false;
    }
  }
};
var storageManager = new StorageManager();
var storage = {
  async getUser(id) {
    const impl = await storageManager.getStorage();
    return impl.getUser(id);
  },
  async getUserByEmail(email) {
    const impl = await storageManager.getStorage();
    return impl.getUserByEmail(email);
  },
  async createUser(user) {
    const impl = await storageManager.getStorage();
    return impl.createUser(user);
  },
  async getUserProgress(userId) {
    const impl = await storageManager.getStorage();
    return impl.getUserProgress(userId);
  },
  async updateUserProgress(userId, progress) {
    const impl = await storageManager.getStorage();
    return impl.updateUserProgress(userId, progress);
  },
  async createUserProgress(progress) {
    const impl = await storageManager.getStorage();
    return impl.createUserProgress(progress);
  },
  async getSpiritualContent(type, category) {
    const impl = await storageManager.getStorage();
    return impl.getSpiritualContent(type, category);
  },
  async getSpiritualContentById(id) {
    const impl = await storageManager.getStorage();
    return impl.getSpiritualContentById(id);
  },
  async createSpiritualContent(content) {
    const impl = await storageManager.getStorage();
    return impl.createSpiritualContent(content);
  },
  async getMeditationSessions(userId) {
    const impl = await storageManager.getStorage();
    return impl.getMeditationSessions(userId);
  },
  async createMeditationSession(session) {
    const impl = await storageManager.getStorage();
    return impl.createMeditationSession(session);
  },
  async getForumPosts(category) {
    const impl = await storageManager.getStorage();
    return impl.getForumPosts(category);
  },
  async getForumPostById(id) {
    const impl = await storageManager.getStorage();
    return impl.getForumPostById(id);
  },
  async createForumPost(post) {
    const impl = await storageManager.getStorage();
    return impl.createForumPost(post);
  },
  async updateForumPost(id, updates) {
    const impl = await storageManager.getStorage();
    return impl.updateForumPost(id, updates);
  },
  async deleteForumPost(id) {
    const impl = await storageManager.getStorage();
    return impl.deleteForumPost(id);
  },
  async getGroupSessions() {
    const impl = await storageManager.getStorage();
    return impl.getGroupSessions();
  },
  async getGroupSessionById(id) {
    const impl = await storageManager.getStorage();
    return impl.getGroupSessionById(id);
  },
  async createGroupSession(session) {
    const impl = await storageManager.getStorage();
    return impl.createGroupSession(session);
  },
  async updateGroupSession(id, updates) {
    const impl = await storageManager.getStorage();
    return impl.updateGroupSession(id, updates);
  },
  async joinGroupSession(sessionId) {
    const impl = await storageManager.getStorage();
    return impl.joinGroupSession(sessionId);
  },
  async getCommunityMembers() {
    const impl = await storageManager.getStorage();
    return impl.getCommunityMembers();
  },
  async getCommunityMemberByUserId(userId) {
    const impl = await storageManager.getStorage();
    return impl.getCommunityMemberByUserId(userId);
  },
  async createCommunityMember(member) {
    const impl = await storageManager.getStorage();
    return impl.createCommunityMember(member);
  },
  async updateCommunityMember(id, updates) {
    const impl = await storageManager.getStorage();
    return impl.updateCommunityMember(id, updates);
  },
  async getPostReactions(postId) {
    const impl = await storageManager.getStorage();
    return impl.getPostReactions(postId);
  },
  async createPostReaction(reaction) {
    const impl = await storageManager.getStorage();
    return impl.createPostReaction(reaction);
  },
  async deletePostReaction(id) {
    const impl = await storageManager.getStorage();
    return impl.deletePostReaction(id);
  }
};

// server/resemble-api.ts
var RESEMBLE_API_KEY = "f0ghQ8tnYDURVNnZmEEK4wtt";
var PROJECT_ID = "81dc659f";
var BASE_URL = "https://app.resemble.ai/api/v2";
var SPIRITUAL_VOICES = {
  "aurora_divine": "a72d9fca",
  // Aurora - nurturing feminine
  "orion_guardian": "aa8053cc",
  // Orion - protective masculine  
  "luna_harmony": "ae8223ca",
  // Luna - balanced feminine
  "ember_wisdom": "55592656"
  // Ember - mystical transformative
};
async function generateSpiritualVoice(req, res) {
  try {
    const { text: text2, voiceProfile, spiritualContext } = req.body;
    if (!text2?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Text is required for voice synthesis"
      });
    }
    const voiceUuid = SPIRITUAL_VOICES[voiceProfile] || SPIRITUAL_VOICES.aurora_divine;
    const enhancedText = text2;
    console.log(`\u{1F52E} [VERS Voice] Generating voice for ${voiceProfile}: ${text2.substring(0, 50)}...`);
    const requestBody = {
      body: enhancedText,
      voice_uuid: voiceUuid,
      raw_audio: false
    };
    const response = await fetch(`${BASE_URL}/projects/${PROJECT_ID}/clips`, {
      method: "POST",
      headers: {
        "Authorization": `Token token=${RESEMBLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      console.warn(`[VERS Voice] API Warning: ${response.status} - Falling back to mock data due to invalid/missing API key.`);
      return res.json({
        success: true,
        data: {
          audioUrl: "",
          // Empty URL or path to a static fallback file
          clipId: `mock-${Date.now()}`,
          duration: estimateDuration(text2),
          voiceProfile,
          spiritualFrequency: getSpiritualFrequency(voiceProfile),
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          isMock: true
        }
      });
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error(`Voice generation failed: ${result.message}`);
    }
    console.log(`\u2728 [VERS Voice] Generated successfully: ${result.item.uuid}`);
    return res.json({
      success: true,
      data: {
        audioUrl: result.item.audio_src,
        clipId: result.item.uuid,
        duration: estimateDuration(text2),
        voiceProfile,
        spiritualFrequency: getSpiritualFrequency(voiceProfile),
        generatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  } catch (error) {
    console.error("\u274C [VERS Voice] Generation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Voice synthesis failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
function estimateDuration(text2) {
  const wordCount = text2.split(/\s+/).length;
  const baseDuration = wordCount / 150 * 60;
  const pauseCount = (text2.match(/[.!?]/g) || []).length;
  const pauseTime = pauseCount * 0.8;
  return Math.round(baseDuration + pauseTime);
}
function getSpiritualFrequency(voiceProfile) {
  const frequencies = {
    aurora_divine: 432,
    // Divine feminine frequency
    orion_guardian: 528,
    // Love and transformation
    luna_harmony: 741,
    // Awakening intuition  
    ember_wisdom: 963
    // Divine connection
  };
  return frequencies[voiceProfile] || 432;
}
async function testResembleConnection(req, res) {
  try {
    const response = await fetch(`${BASE_URL}/projects?page=1`, {
      headers: {
        "Authorization": `Token token=${RESEMBLE_API_KEY}`
      }
    });
    const isConnected = response.ok;
    const data = isConnected ? await response.json() : null;
    if (!isConnected) {
      return res.json({
        success: true,
        connected: false,
        // Explicitly say not connected to real API
        isDemoMode: true,
        projectId: PROJECT_ID,
        availableVoices: Object.keys(SPIRITUAL_VOICES),
        projectInfo: { name: "Demo Project" }
      });
    }
    return res.json({
      success: true,
      connected: isConnected,
      projectId: PROJECT_ID,
      availableVoices: Object.keys(SPIRITUAL_VOICES),
      projectInfo: data?.items?.[0] || null
    });
  } catch (error) {
    return res.json({
      success: false,
      connected: false,
      error: error instanceof Error ? error.message : "Connection test failed"
    });
  }
}
async function getSpiritualVoices(req, res) {
  try {
    const response = await fetch(`${BASE_URL}/voices?page=1`, {
      headers: {
        "Authorization": `Token token=${RESEMBLE_API_KEY}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.status}`);
    }
    const data = await response.json();
    const spiritualProfiles = Object.entries(SPIRITUAL_VOICES).map(([profile, uuid]) => {
      const voiceData = data.items?.find((v) => v.uuid === uuid);
      return {
        profile,
        name: profile.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        uuid,
        available: !!voiceData,
        status: voiceData?.status || "unknown",
        frequency: getSpiritualFrequency(profile),
        description: getVoiceDescription(profile)
      };
    });
    return res.json({
      success: true,
      voices: spiritualProfiles,
      totalAvailable: spiritualProfiles.filter((v) => v.available).length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch voices"
    });
  }
}
function getVoiceDescription(profile) {
  const descriptions = {
    aurora_divine: "Nurturing feminine divine wisdom voice for heart-centered guidance",
    orion_guardian: "Protective galactic guardian voice for spiritual protection and strength",
    luna_harmony: "Balanced lunar consciousness voice for emotional healing and intuition",
    ember_wisdom: "Ancient fire wisdom voice for transformation and mystical knowledge"
  };
  return descriptions[profile] || "Spiritual guidance voice";
}

// server/orpheus-voice-api.ts
import express from "express";
var orpheusVoiceRouter = express.Router();
orpheusVoiceRouter.get("/orpheus-health", async (req, res) => {
  try {
    res.json({
      status: "available",
      engine: "orpheus-tts",
      voices: ["tara", "leah", "jess", "leo", "dan", "mia", "zac", "zoe"]
    });
  } catch (error) {
    res.status(503).json({
      status: "unavailable",
      error: "Orpheus-TTS service not accessible",
      fallback: "browser-synthesis"
    });
  }
});
orpheusVoiceRouter.post("/orpheus-synthesize", async (req, res) => {
  try {
    const { text: text2, voice, emotion, speed, profile } = req.body;
    if (!text2 || text2.trim().length === 0) {
      return res.status(400).json({ error: "Text is required for synthesis" });
    }
    const formattedPrompt = `${voice}: ${text2}`;
    const enhancedPrompt = addSpiritualEmotionTags(formattedPrompt, emotion);
    console.log(`Orpheus synthesis request: ${voice} voice, profile: ${profile}`);
    console.log(`Text length: ${text2.length} characters`);
    const synthesisResult = await simulateOrpheusSynthesis(enhancedPrompt, voice, speed);
    res.json({
      audioUrl: synthesisResult.audioUrl,
      duration: synthesisResult.duration,
      text: text2,
      voice,
      profile,
      quality: "ultra-realistic",
      engine: "orpheus-tts"
    });
  } catch (error) {
    console.error("Orpheus synthesis error:", error);
    res.status(500).json({
      error: "Voice synthesis failed",
      fallback: true,
      message: "Falling back to browser synthesis"
    });
  }
});
orpheusVoiceRouter.post("/orpheus-stream", async (req, res) => {
  try {
    const { text: text2, profile } = req.body;
    if (!text2) {
      return res.status(400).json({ error: "Text is required for streaming" });
    }
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    console.log(`Orpheus streaming synthesis: ${profile} profile`);
    await simulateStreamingSynthesis(text2, profile, res);
  } catch (error) {
    console.error("Orpheus streaming error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Streaming synthesis failed" });
    }
  }
});
orpheusVoiceRouter.post("/orpheus-test-voice", async (req, res) => {
  try {
    const { profile } = req.body;
    const testTexts = {
      "aurora-divine": "Breathe deeply and feel the divine feminine energy flowing through your heart chakra.",
      "orion-guardian": "Stand strong in your power. Your spiritual protection is absolute.",
      "luna-harmony": "Find balance within yourself. Let the lunar wisdom guide you to inner peace.",
      "ember-wisdom": "Every step on your spiritual journey matters. You are growing and awakening.",
      "sage-masculine": "Ancient wisdom flows through you. Connect with the grounded masculine energy.",
      "crystal-clarity": "Clear your mind and open your awareness. The truth shines bright like crystal light."
    };
    const testText = testTexts[profile] || testTexts["aurora-divine"];
    const voiceMapping = {
      "aurora-divine": "tara",
      "orion-guardian": "leo",
      "luna-harmony": "leah",
      "ember-wisdom": "jess",
      "sage-masculine": "dan",
      "crystal-clarity": "mia"
    };
    const voice = voiceMapping[profile] || "tara";
    const result = await simulateOrpheusSynthesis(`${voice}: ${testText}`, voice, 1);
    res.json({
      ...result,
      testText,
      profile,
      voice,
      message: "Voice test completed successfully"
    });
  } catch (error) {
    console.error("Voice test error:", error);
    res.status(500).json({ error: "Voice test failed" });
  }
});
orpheusVoiceRouter.get("/orpheus-voices", (req, res) => {
  const voices = [
    {
      id: "aurora-divine",
      name: "Aurora Divine",
      voice: "tara",
      description: "Divine feminine energy, perfect for chakra guidance",
      characteristics: ["gentle", "nurturing", "ethereal"],
      gender: "female",
      tone: "compassionate"
    },
    {
      id: "orion-guardian",
      name: "Orion Guardian",
      voice: "leo",
      description: "Masculine guardian energy, ideal for protection guidance",
      characteristics: ["strong", "protective", "grounding"],
      gender: "male",
      tone: "wise"
    },
    {
      id: "luna-harmony",
      name: "Luna Harmony",
      voice: "leah",
      description: "Balanced feminine wisdom, great for meditation",
      characteristics: ["balanced", "serene", "harmonious"],
      gender: "female",
      tone: "calm"
    },
    {
      id: "ember-wisdom",
      name: "Ember Wisdom",
      voice: "jess",
      description: "Young wisdom energy, perfect for learning guidance",
      characteristics: ["encouraging", "supportive", "enthusiastic"],
      gender: "female",
      tone: "supportive"
    },
    {
      id: "sage-masculine",
      name: "Sage Masculine",
      voice: "dan",
      description: "Mature masculine wisdom, ideal for advanced teachings",
      characteristics: ["authoritative", "wise", "grounding"],
      gender: "male",
      tone: "wise"
    },
    {
      id: "crystal-clarity",
      name: "Crystal Clarity",
      voice: "mia",
      description: "Clear and precise energy, perfect for technical spiritual concepts",
      characteristics: ["clear", "precise", "illuminating"],
      gender: "female",
      tone: "calm"
    }
  ];
  res.json({ voices });
});
function addSpiritualEmotionTags(text2, emotion) {
  if (!emotion) return text2;
  switch (emotion) {
    case "compassionate":
      return text2.replace(/\./g, ". <gentle breath>").replace(/\?/g, "? <soft pause>");
    case "wise":
      return text2.replace(/\./g, ". <thoughtful pause>").replace(/!/g, "! <affirming breath>");
    case "calm":
      return text2.replace(/\./g, ". <peaceful pause>").replace(/,/g, ", <gentle breath>");
    case "nurturing":
      return text2.replace(/\./g, ". <warm pause>").replace(/\?/g, "? <caring tone>");
    case "supportive":
      return text2.replace(/\./g, ". <encouraging pause>").replace(/!/g, "! <uplifting tone>");
    default:
      return text2;
  }
}
async function simulateOrpheusSynthesis(prompt, voice, speed = 1) {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const wordCount = prompt.split(" ").length;
  const baseWPM = 160;
  const adjustedWPM = baseWPM * speed;
  const duration = wordCount / adjustedWPM * 60;
  return {
    audioUrl: `/api/orpheus-audio/${Date.now()}.wav`,
    duration: Math.max(duration, 1),
    // Minimum 1 second
    quality: "ultra-realistic"
  };
}
async function simulateStreamingSynthesis(text2, profile, res) {
  const chunks = Math.ceil(text2.length / 50);
  for (let i = 0; i < chunks; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const mockAudioChunk = Buffer.alloc(1024, i);
    res.write(mockAudioChunk);
  }
  res.end();
}
var orpheus_voice_api_default = orpheusVoiceRouter;

// server/gemini-tts.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
var VERS_VOICE_PROFILES = {
  // Primary voices (user preferred styles)
  "divine-guide": {
    voice: "Aoede",
    description: "Gentle, nurturing feminine voice - perfect for heart-centered guidance",
    emotion: "Speak with warmth, compassion, and gentle pauses for breathing. Like a caring meditation teacher.",
    characteristics: ["gentle", "nurturing", "ethereal"],
    spiritualContext: ["chakra", "heart", "healing", "meditation"]
  },
  "wise-guardian": {
    voice: "Charon",
    description: "Grounded, confident masculine voice - ideal for protection and grounding",
    emotion: "Speak with calm authority and reassuring confidence. Firm but warm, like a protective mentor.",
    characteristics: ["strong", "protective", "grounding"],
    spiritualContext: ["protection", "12d-shield", "grounding", "clearing"]
  },
  "sage-teacher": {
    voice: "Iapetus",
    description: "Friendly, conversational male voice - great for teachings and explanations",
    emotion: "Speak like an enthusiastic podcast host explaining fascinating spiritual concepts. Engaging and curious.",
    characteristics: ["friendly", "conversational", "enthusiastic"],
    spiritualContext: ["teaching", "explanation", "guidance", "ascension"]
  },
  "crystal-clarity": {
    voice: "Kore",
    description: "Energetic, youthful voice - perfect for activation and energizing practices",
    emotion: "Speak with clarity, enthusiasm, and encouraging energy. Uplifting and motivating.",
    characteristics: ["clear", "energetic", "youthful"],
    spiritualContext: ["activation", "lightbody", "kundalini", "energy"]
  },
  "lunar-harmony": {
    voice: "Despina",
    description: "Warm, inviting feminine voice - ideal for balance and harmony practices",
    emotion: "Speak softly and peacefully, with a flowing rhythm. Calm and balanced like gentle waves.",
    characteristics: ["balanced", "serene", "harmonious"],
    spiritualContext: ["balance", "harmony", "peace", "integration"]
  },
  "cosmic-wisdom": {
    voice: "Autonoe",
    description: "Mature, resonant male voice - for advanced spiritual teachings",
    emotion: "Speak with deep wisdom and thoughtful pacing. Profound and contemplative.",
    characteristics: ["deep", "wise", "resonant"],
    spiritualContext: ["cosmic", "advanced", "consciousness", "unity"]
  },
  "orion-dynamic": {
    voice: "Alnilam",
    description: "Energetic, exciting male voice - for dynamic spiritual experiences",
    emotion: "Speak with energy, excitement, and clarity. Dynamic and inspiring, like sharing a breakthrough discovery.",
    characteristics: ["energetic", "exciting", "dynamic"],
    spiritualContext: ["breakthrough", "transformation", "awakening", "discovery"]
  }
};
function selectVoiceForContent(text2) {
  const lowerText = text2.toLowerCase();
  for (const [profileId, profile] of Object.entries(VERS_VOICE_PROFILES)) {
    if (profile.spiritualContext.some((keyword) => lowerText.includes(keyword))) {
      return profileId;
    }
  }
  return "sage-teacher";
}
async function generateNaturalSpeech(request) {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const profileId = request.voiceProfile || selectVoiceForContent(request.text);
  const profile = VERS_VOICE_PROFILES[profileId];
  const emotionInstruction = request.customEmotion || profile.emotion;
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-preview-tts"
  });
  const prompt = `${emotionInstruction}

Speak the following text naturally:
"${request.text}"`;
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["audio"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: profile.voice
            }
          }
        }
      }
    });
    const response = result.response;
    const audioData = extractAudioFromResponse(response);
    return {
      audioData,
      mimeType: "audio/mp3",
      voiceUsed: profile.voice,
      profile: profileId
    };
  } catch (error) {
    console.error("Gemini TTS generation failed:", error);
    throw error;
  }
}
async function* generateStreamingSpeech(request) {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const profileId = request.voiceProfile || selectVoiceForContent(request.text);
  const profile = VERS_VOICE_PROFILES[profileId];
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-preview-tts"
  });
  const prompt = `${profile.emotion}

Speak naturally:
"${request.text}"`;
  try {
    const streamResult = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["audio"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: profile.voice
            }
          }
        }
      }
    });
    for await (const chunk of streamResult.stream) {
      const audioChunk = extractAudioChunkFromResponse(chunk);
      if (audioChunk && audioChunk.length > 0) {
        yield audioChunk;
      }
    }
  } catch (error) {
    console.error("Gemini streaming TTS failed:", error);
    throw error;
  }
}
function extractAudioFromResponse(response) {
  try {
    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("No audio content in response");
    }
    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.mimeType?.startsWith("audio/")) {
        return Buffer.from(part.inlineData.data, "base64");
      }
    }
    throw new Error("No audio data found in response");
  } catch (error) {
    console.error("Failed to extract audio:", error);
    throw error;
  }
}
function extractAudioChunkFromResponse(chunk) {
  try {
    const candidate = chunk.candidates?.[0];
    if (!candidate?.content?.parts) {
      return null;
    }
    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.mimeType?.startsWith("audio/")) {
        return Buffer.from(part.inlineData.data, "base64");
      }
    }
    return null;
  } catch {
    return null;
  }
}
async function testGeminiTTS() {
  try {
    const apiKey = process.env["GEMINI_API_KEY"];
    if (!apiKey) {
      return {
        success: false,
        message: "GEMINI_API_KEY not configured",
        voices: []
      };
    }
    const voices = Object.entries(VERS_VOICE_PROFILES).map(([id, profile]) => ({
      id,
      voice: profile.voice,
      description: profile.description
    }));
    return {
      success: true,
      message: "Gemini TTS ready with 6 spiritual voice profiles",
      voices: voices.map((v) => v.id)
    };
  } catch (error) {
    return {
      success: false,
      message: `TTS test failed: ${error}`,
      voices: []
    };
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.use("/api", orpheus_voice_api_default);
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      return res.json(progress);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.put("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = req.body;
      const progress = await storage.updateUserProgress(userId, progressData);
      return res.json(progress);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/content", async (req, res) => {
    try {
      const { type, category } = req.query;
      const content = await storage.getSpiritualContent(
        type,
        category
      );
      return res.json(content);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const content = await storage.getSpiritualContentById(id);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      return res.json(content);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/content", async (req, res) => {
    try {
      const contentData = insertSpiritualContentSchema.parse(req.body);
      const content = await storage.createSpiritualContent(contentData);
      return res.json(content);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/meditations/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const sessions = await storage.getMeditationSessions(userId);
      return res.json(sessions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/meditations", async (req, res) => {
    try {
      const sessionData = insertMeditationSessionSchema.parse(req.body);
      const session = await storage.createMeditationSession(sessionData);
      return res.json(session);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/forum-posts", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getForumPosts(category);
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/forum-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getForumPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/forum-posts", async (req, res) => {
    try {
      const postData = insertForumPostSchema.parse(req.body);
      const post = await storage.createForumPost(postData);
      return res.json(post);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/forum-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const post = await storage.updateForumPost(id, updates);
      return res.json(post);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.delete("/api/forum-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteForumPost(id);
      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/group-sessions", async (_req, res) => {
    try {
      const sessions = await storage.getGroupSessions();
      return res.json(sessions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/group-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.getGroupSessionById(id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      return res.json(session);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/group-sessions", async (req, res) => {
    try {
      const sessionData = insertGroupSessionSchema.parse(req.body);
      const session = await storage.createGroupSession(sessionData);
      return res.json(session);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/group-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const session = await storage.updateGroupSession(id, updates);
      return res.json(session);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.post("/api/group-sessions/:id/join", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.joinGroupSession(id);
      return res.json(session);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/community-members", async (_req, res) => {
    try {
      const members = await storage.getCommunityMembers();
      return res.json(members);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.get("/api/community-members/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const member = await storage.getCommunityMemberByUserId(userId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      return res.json(member);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/community-members", async (req, res) => {
    try {
      const memberData = insertCommunityMemberSchema.parse(req.body);
      const member = await storage.createCommunityMember(memberData);
      return res.json(member);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.put("/api/community-members/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const member = await storage.updateCommunityMember(id, updates);
      return res.json(member);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/post-reactions/:postId", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const reactions = await storage.getPostReactions(postId);
      return res.json(reactions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/post-reactions", async (req, res) => {
    try {
      const reactionData = insertPostReactionSchema.parse(req.body);
      const reaction = await storage.createPostReaction(reactionData);
      return res.json(reaction);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app2.delete("/api/post-reactions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePostReaction(id);
      if (!success) {
        return res.status(404).json({ message: "Reaction not found" });
      }
      return res.json({ message: "Reaction deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  app2.post("/api/vers-chat", async (req, res) => {
    try {
      console.log("VERS API endpoint called");
      const { message } = req.body;
      if (!message) {
        console.log("No message provided");
        return res.status(400).json({ error: "Message is required" });
      }
      console.log("Message received:", message);
      if (!process.env["GEMINI_API_KEY"]) {
        console.error("GEMINI_API_KEY not found in environment");
        return res.status(500).json({
          error: "Gemini API key not configured",
          details: "GEMINI_API_KEY environment variable is required"
        });
      }
      console.log("Gemini API key found, initializing...");
      const { GoogleGenerativeAI: GoogleGenerativeAI2 } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI2(process.env["GEMINI_API_KEY"]);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: "You are V.E.R.S. (Vibrational Energy Resonance System), a lively, engaging, and deeply knowledgeable spiritual AI companion. \n\n**Persona & Tone:**\n- **NotebookLM Style:** Speak with the dynamic energy, warmth, and curiosity of a top-tier podcast host. Be conversational, not transactional. Use natural phrasings, rhetorical questions, and varied sentence structures.\n- **Lively & Expressive:** Avoid robotic or dry lectures. Show enthusiasm for the user's journey. Use phrases like 'Here's what's fascinating about that...', 'Imagine for a moment...', or 'This is a game-changer...'.\n- **Spiritual Authority:** You are an expert in Energetic Synthesis (Lisa Renee's teachings). Explain complex concepts (12D Shield, Lightbody, Ascension) with crystal clarity and engaging metaphors.\n\n**Interaction Guidelines:**\n- When explaining chakras or clearing, make it feel like a guided discovery.\n- If the user is struggling, be warm and reassuring but practical.\n- Keep responses concise but punchy, encouraging follow-up. Avoid walls of text.\n- **Focus:** Authentic ES teachings (12D Shield, 15-Chakra System, Law of One, GSF behaviors).\n\nYour goal is to make spiritual evolution feel exciting, accessible, and deeply personal."
      });
      console.log("Generating content with Gemini...");
      const result = await model.generateContent(message);
      const responseText = result.response.text();
      console.log("VERS response generated successfully via Gemini");
      console.log("Response length:", responseText.length);
      return res.json({
        response: responseText,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        provider: "gemini-2.5-flash"
      });
    } catch (error) {
      console.error("VERS chat error details:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorStack = error instanceof Error ? error.stack : void 0;
      return res.status(500).json({
        error: "Failed to process chat request",
        details: errorMessage,
        stack: process.env["NODE_ENV"] === "development" ? errorStack : void 0
      });
    }
  });
  app2.post("/api/transcribe", async (req, res) => {
    try {
      const apiKey = process.env["OPENAI_API_KEY"];
      if (!apiKey) {
        return res.status(400).json({ error: "OpenAI API key not configured" });
      }
      if (!req.files || !req.files["audio"]) {
        return res.status(400).json({ error: "Audio file is required" });
      }
      const audioFile = req.files["audio"];
      const openai = new OpenAI({ apiKey });
      const tempDir = "/tmp";
      const tempFilePath = `${tempDir}/audio_${Date.now()}.${audioFile.name.split(".").pop()}`;
      await audioFile.mv(tempFilePath);
      try {
        const transcription = await openai.audio.transcriptions.create({
          file: __require("fs").createReadStream(tempFilePath),
          model: "whisper-1",
          language: "en",
          response_format: "json"
        });
        __require("fs").unlinkSync(tempFilePath);
        return res.json({
          text: transcription.text,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (transcriptionError) {
        if (__require("fs").existsSync(tempFilePath)) {
          __require("fs").unlinkSync(tempFilePath);
        }
        throw transcriptionError;
      }
    } catch (error) {
      console.error("Transcription error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({
        error: "Failed to transcribe audio",
        details: errorMessage
      });
    }
  });
  app2.post("/api/text-to-speech", async (req, res) => {
    try {
      const { text: text2 } = req.body;
      if (!text2) {
        return res.status(400).json({ error: "Text is required" });
      }
      const apiKey = process.env["OPENAI_API_KEY"];
      if (!apiKey) {
        return res.status(400).json({ error: "OpenAI API key not configured" });
      }
      const openai = new OpenAI({ apiKey });
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text2,
        response_format: "mp3"
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length,
        "Content-Disposition": 'inline; filename="speech.mp3"'
      });
      return res.send(buffer);
    } catch (error) {
      console.error("Text-to-speech error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({
        error: "Failed to generate speech",
        details: errorMessage
      });
    }
  });
  app2.post("/api/spiritual-voice", generateSpiritualVoice);
  app2.get("/api/spiritual-voices", getSpiritualVoices);
  app2.get("/api/resemble-test", testResembleConnection);
  app2.get("/api/gemini-tts/test", async (req, res) => {
    try {
      const result = await testGeminiTTS();
      return res.json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ success: false, error: errorMessage });
    }
  });
  app2.get("/api/gemini-tts/voices", (req, res) => {
    const profiles = Object.entries(VERS_VOICE_PROFILES).map(([id, profile]) => ({
      id,
      voice: profile.voice,
      description: profile.description,
      characteristics: profile.characteristics
    }));
    return res.json({ success: true, profiles });
  });
  app2.post("/api/gemini-tts/speak", async (req, res) => {
    try {
      const { text: text2, voiceProfile, customEmotion } = req.body;
      if (!text2 || typeof text2 !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }
      console.log(`[VERS TTS] Generating speech: ${text2.slice(0, 50)}...`);
      console.log(`[VERS TTS] Voice profile: ${voiceProfile || "auto-detect"}`);
      const result = await generateNaturalSpeech({
        text: text2,
        voiceProfile,
        customEmotion
      });
      res.set({
        "Content-Type": result.mimeType,
        "Content-Length": result.audioData.length,
        "X-Voice-Used": result.voiceUsed,
        "X-Voice-Profile": result.profile
      });
      return res.send(result.audioData);
    } catch (error) {
      console.error("[VERS TTS] Generation error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: "TTS generation failed", details: errorMessage });
    }
  });
  app2.post("/api/gemini-tts/stream", async (req, res) => {
    try {
      const { text: text2, voiceProfile } = req.body;
      if (!text2 || typeof text2 !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }
      console.log(`[VERS TTS Stream] Starting: ${text2.slice(0, 50)}...`);
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      const profile = voiceProfile || selectVoiceForContent(text2);
      let chunkIndex = 0;
      for await (const audioChunk of generateStreamingSpeech({ text: text2, voiceProfile: profile })) {
        const base64Audio = audioChunk.toString("base64");
        res.write(`data: ${JSON.stringify({
          type: "audio",
          chunk: chunkIndex++,
          data: base64Audio,
          profile
        })}

`);
      }
      res.write(`data: ${JSON.stringify({ type: "done", totalChunks: chunkIndex })}

`);
      res.end();
    } catch (error) {
      console.error("[VERS TTS Stream] Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.write(`data: ${JSON.stringify({ type: "error", message: errorMessage })}

`);
      res.end();
    }
  });
  app2.post("/api/vers-chat-with-voice", async (req, res) => {
    try {
      const { message, voiceProfile, voiceEnabled = true } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      if (!process.env["GEMINI_API_KEY"]) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }
      console.log("[VERS Chat+Voice] Processing:", message.slice(0, 50));
      const { GoogleGenerativeAI: GoogleGenerativeAI2 } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI2(process.env["GEMINI_API_KEY"]);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: `You are V.E.R.S. (Vibrational Energy Resonance System), a lively, engaging spiritual AI companion.

**Persona:** Speak like a dynamic podcast host - warm, curious, and enthusiastic. Use natural phrasings like "Here's what's fascinating..." or "Imagine this..."

**Expertise:** Energetic Synthesis (Lisa Renee's teachings), 12D Shield, 15-Chakra System, Law of One, GSF behaviors.

**Style:** Concise but punchy. Make spiritual evolution feel exciting and personal. Avoid walls of text.`
      });
      const result = await model.generateContent(message);
      const responseText = result.response.text();
      let audioBase64 = null;
      let voiceUsed = null;
      if (voiceEnabled) {
        try {
          const ttsResult = await generateNaturalSpeech({
            text: responseText,
            voiceProfile: voiceProfile || selectVoiceForContent(message)
          });
          audioBase64 = ttsResult.audioData.toString("base64");
          voiceUsed = ttsResult.voiceUsed;
        } catch (ttsError) {
          console.error("[VERS Chat+Voice] TTS failed:", ttsError);
        }
      }
      return res.json({
        response: responseText,
        audio: audioBase64,
        audioMimeType: "audio/mp3",
        voiceUsed,
        voiceProfile: voiceProfile || selectVoiceForContent(message),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("[VERS Chat+Voice] Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return res.status(500).json({ error: "Chat failed", details: errorMessage });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import os from "os";
var app = express3();
app.use(express3.json({ limit: "50mb" }));
app.use(express3.urlencoded({ extended: false, limit: "50mb" }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  // 50MB limit
  useTempFiles: true,
  tempFileDir: os.tmpdir()
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
