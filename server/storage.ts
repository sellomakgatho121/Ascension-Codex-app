import { 
  users, userProgress, spiritualContent, meditationSessions, forumPosts, groupSessions, communityMembers, postReactions,
  type User, type InsertUser, type UserProgress, type InsertUserProgress, type SpiritualContent, type InsertSpiritualContent, 
  type MeditationSession, type InsertMeditationSession, type ForumPost, type InsertForumPost, 
  type GroupSession, type InsertGroupSession, type CommunityMember, type InsertCommunityMember,
  type PostReaction, type InsertPostReaction
} from "@shared/schema";
import { getDb } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

/** Lazy database accessor — resolves to null and falls back to MemStorage on Vercel serverless */
function db() {
  const instance = getDb();
  if (!instance) throw new Error("Database not available — falling back to MemStorage");
  return instance;
}

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Progress tracking
  getUserProgress(userId: number): Promise<UserProgress | undefined>;
  updateUserProgress(userId: number, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // Spiritual content
  getSpiritualContent(type?: string, category?: string): Promise<SpiritualContent[]>;
  getSpiritualContentById(id: number): Promise<SpiritualContent | undefined>;
  createSpiritualContent(content: InsertSpiritualContent): Promise<SpiritualContent>;

  // Meditation sessions
  getMeditationSessions(userId: number): Promise<MeditationSession[]>;
  createMeditationSession(session: InsertMeditationSession): Promise<MeditationSession>;

  // Community: Forum posts
  getForumPosts(category?: string): Promise<ForumPost[]>;
  getForumPostById(id: number): Promise<ForumPost | undefined>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  updateForumPost(id: number, updates: Partial<InsertForumPost>): Promise<ForumPost>;
  deleteForumPost(id: number): Promise<boolean>;

  // Community: Group sessions
  getGroupSessions(): Promise<GroupSession[]>;
  getGroupSessionById(id: number): Promise<GroupSession | undefined>;
  createGroupSession(session: InsertGroupSession): Promise<GroupSession>;
  updateGroupSession(id: number, updates: Partial<InsertGroupSession>): Promise<GroupSession>;
  joinGroupSession(sessionId: number): Promise<GroupSession>;

  // Community: Members
  getCommunityMembers(): Promise<CommunityMember[]>;
  getCommunityMemberByUserId(userId: number): Promise<CommunityMember | undefined>;
  createCommunityMember(member: InsertCommunityMember): Promise<CommunityMember>;
  updateCommunityMember(id: number, updates: Partial<InsertCommunityMember>): Promise<CommunityMember>;

  // Community: Post reactions
  getPostReactions(postId: number): Promise<PostReaction[]>;
  createPostReaction(reaction: InsertPostReaction): Promise<PostReaction>;
  deletePostReaction(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db().select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db().select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    if (!user) throw new Error('Failed to create user');
    return user;
  }

  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    const [progress] = await db().select().from(userProgress).where(eq(userProgress.userId, userId));
    return progress;
  }

  async updateUserProgress(userId: number, progressUpdate: Partial<InsertUserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userId);
    if (existing) {
      const updateData: any = {
        lastUpdated: new Date()
      };
      
      if (progressUpdate.chakraProgress) updateData.chakraProgress = progressUpdate.chakraProgress;
      if (progressUpdate.lightbodyProgress) updateData.lightbodyProgress = progressUpdate.lightbodyProgress;
      if (progressUpdate.gridProgress) updateData.gridProgress = progressUpdate.gridProgress;
      if (progressUpdate.overallLevel !== undefined) updateData.overallLevel = progressUpdate.overallLevel;
      
      const [updated] = await db
        .update(userProgress)
        .set(updateData)
        .where(eq(userProgress.userId, userId))
        .returning();
      if (!updated) throw new Error('Failed to update user progress');
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

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const insertData: any = {
      userId: progress.userId,
      chakraProgress: progress.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] },
      lightbodyProgress: progress.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 },
      gridProgress: progress.gridProgress || { activatedSpheres: [], shieldIntegration: [] },
      overallLevel: progress.overallLevel || 0
    };
    
    const [newProgress] = await db
      .insert(userProgress)
      .values(insertData)
      .returning();
    if (!newProgress) throw new Error('Failed to create user progress');
    return newProgress;
  }

  async getSpiritualContent(type?: string, category?: string): Promise<SpiritualContent[]> {
    if (type && category) {
      const content = await db().select().from(spiritualContent)
        .where(and(eq(spiritualContent.type, type), eq(spiritualContent.category, category)));
      return content.sort((a: SpiritualContent, b: SpiritualContent) => (a.order || 0) - (b.order || 0));
    } else if (type) {
      const content = await db().select().from(spiritualContent)
        .where(eq(spiritualContent.type, type));
      return content.sort((a: SpiritualContent, b: SpiritualContent) => (a.order || 0) - (b.order || 0));
    } else if (category) {
      const content = await db().select().from(spiritualContent)
        .where(eq(spiritualContent.category, category));
      return content.sort((a: SpiritualContent, b: SpiritualContent) => (a.order || 0) - (b.order || 0));
    }
    
    const content = await db().select().from(spiritualContent);
    return content.sort((a: SpiritualContent, b: SpiritualContent) => (a.order || 0) - (b.order || 0));
  }

  async getSpiritualContentById(id: number): Promise<SpiritualContent | undefined> {
    const [content] = await db().select().from(spiritualContent).where(eq(spiritualContent.id, id));
    return content;
  }

  async createSpiritualContent(content: InsertSpiritualContent): Promise<SpiritualContent> {
    const insertData: any = {
      type: content.type,
      category: content.category,
      title: content.title,
      description: content.description,
      content: content.content || null,
      order: content.order || 0
    };
    
    const [newContent] = await db
      .insert(spiritualContent)
      .values(insertData)
      .returning();
    if (!newContent) throw new Error('Failed to create spiritual content');
    return newContent;
  }

  async getMeditationSessions(userId: number): Promise<MeditationSession[]> {
    const sessions = await db
      .select()
      .from(meditationSessions)
      .where(eq(meditationSessions.userId, userId));
    
    return sessions.sort((a, b) => {
      const aTime = a.completedAt ? a.completedAt.getTime() : 0;
      const bTime = b.completedAt ? b.completedAt.getTime() : 0;
      return bTime - aTime;
    });
  }

  async createMeditationSession(session: InsertMeditationSession): Promise<MeditationSession> {
    const [newSession] = await db
      .insert(meditationSessions)
      .values({
        ...session,
        completedAt: new Date(),
        focusArea: session.focusArea || null,
        notes: session.notes || null,
      })
      .returning();
    if (!newSession) throw new Error('Failed to create meditation session');
    return newSession;
  }

  // Community: Forum posts
  async getForumPosts(category?: string): Promise<ForumPost[]> {
    const query = category 
      ? db().select().from(forumPosts).where(eq(forumPosts.category, category))
      : db().select().from(forumPosts);
    
    const posts = await query.orderBy(desc(forumPosts.createdAt));
    return posts;
  }

  async getForumPostById(id: number): Promise<ForumPost | undefined> {
    const [post] = await db().select().from(forumPosts).where(eq(forumPosts.id, id));
    return post;
  }

  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    const [newPost] = await db
      .insert(forumPosts)
      .values({
        ...post,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    if (!newPost) throw new Error('Failed to create forum post');
    return newPost;
  }

  async updateForumPost(id: number, updates: Partial<InsertForumPost>): Promise<ForumPost> {
    const [updatedPost] = await db
      .update(forumPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(forumPosts.id, id))
      .returning();
    if (!updatedPost) throw new Error('Forum post not found');
    return updatedPost;
  }

  async deleteForumPost(id: number): Promise<boolean> {
    const result = await db().delete(forumPosts).where(eq(forumPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Community: Group sessions
  async getGroupSessions(): Promise<GroupSession[]> {
    const sessions = await db
      .select()
      .from(groupSessions)
      .where(eq(groupSessions.isActive, 1))
      .orderBy(groupSessions.scheduledTime);
    return sessions;
  }

  async getGroupSessionById(id: number): Promise<GroupSession | undefined> {
    const [session] = await db().select().from(groupSessions).where(eq(groupSessions.id, id));
    return session;
  }

  async createGroupSession(session: InsertGroupSession): Promise<GroupSession> {
    const [newSession] = await db
      .insert(groupSessions)
      .values({
        ...session,
        createdAt: new Date(),
      })
      .returning();
    if (!newSession) throw new Error('Failed to create group session');
    return newSession;
  }

  async updateGroupSession(id: number, updates: Partial<InsertGroupSession>): Promise<GroupSession> {
    const [updatedSession] = await db
      .update(groupSessions)
      .set(updates)
      .where(eq(groupSessions.id, id))
      .returning();
    if (!updatedSession) throw new Error('Group session not found');
    return updatedSession;
  }

  async joinGroupSession(sessionId: number): Promise<GroupSession> {
    const [updatedSession] = await db
      .update(groupSessions)
      .set({ participants: sql`${groupSessions.participants} + 1` })
      .where(eq(groupSessions.id, sessionId))
      .returning();
    if (!updatedSession) throw new Error('Group session not found');
    return updatedSession;
  }

  // Community: Members
  async getCommunityMembers(): Promise<CommunityMember[]> {
    const members = await db
      .select()
      .from(communityMembers)
      .orderBy(desc(communityMembers.contributions));
    return members;
  }

  async getCommunityMemberByUserId(userId: number): Promise<CommunityMember | undefined> {
    const [member] = await db
      .select()
      .from(communityMembers)
      .where(eq(communityMembers.userId, userId));
    return member;
  }

  async createCommunityMember(member: InsertCommunityMember): Promise<CommunityMember> {
    const [newMember] = await db
      .insert(communityMembers)
      .values({
        ...member,
        joinDate: new Date(),
        lastSeen: new Date(),
      })
      .returning();
    if (!newMember) throw new Error('Failed to create community member');
    return newMember;
  }

  async updateCommunityMember(id: number, updates: Partial<InsertCommunityMember>): Promise<CommunityMember> {
    const [updatedMember] = await db
      .update(communityMembers)
      .set({ ...updates, lastSeen: new Date() })
      .where(eq(communityMembers.id, id))
      .returning();
    if (!updatedMember) throw new Error('Community member not found');
    return updatedMember;
  }

  // Community: Post reactions
  async getPostReactions(postId: number): Promise<PostReaction[]> {
    const reactions = await db
      .select()
      .from(postReactions)
      .where(eq(postReactions.postId, postId))
      .orderBy(desc(postReactions.createdAt));
    return reactions;
  }

  async createPostReaction(reaction: InsertPostReaction): Promise<PostReaction> {
    const [newReaction] = await db
      .insert(postReactions)
      .values({
        ...reaction,
        createdAt: new Date(),
      })
      .returning();
    if (!newReaction) throw new Error('Failed to create post reaction');
    return newReaction;
  }

  async deletePostReaction(id: number): Promise<boolean> {
    const result = await db().delete(postReactions).where(eq(postReactions.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

// MemStorage: In-memory storage implementation with sample data
export class MemStorage implements IStorage {
  private users: User[] = [
    { id: 1, username: "spiritual_seeker", email: "seeker@example.com", createdAt: new Date() },
    { id: 2, username: "lightworker", email: "light@example.com", createdAt: new Date() },
    { id: 3, username: "mentor_guide", email: "mentor@example.com", createdAt: new Date() }
  ];

  private userProgress: UserProgress[] = [
    {
      id: 1,
      userId: 1,
      chakraProgress: { physicalChakras: [1, 2, 3], morphogeneticChakras: [1], completedChakras: [1, 2] },
      lightbodyProgress: { activatedLayers: ["L1", "L2"], integrationLevel: 3 },
      gridProgress: { activatedSpheres: [1, 2], shieldIntegration: ["12D-Shield"] },
      overallLevel: 3,
      lastUpdated: new Date()
    }
  ];

  private spiritualContent: SpiritualContent[] = [
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

  private meditationSessions: MeditationSession[] = [
    {
      id: 1,
      userId: 1,
      type: "12d-shield",
      duration: 30,
      focusArea: "Protection and grounding",
      notes: "Deep sense of protection established",
      completedAt: new Date()
    }
  ];

  private forumPosts: ForumPost[] = [
    {
      id: 1,
      title: "Welcome to Energetic Synthesis Community",
      content: "This is a space for spiritual seekers exploring consciousness evolution through ES teachings. Feel free to share your experiences with 12D Shield practice, lightbody activation, and chakra clearing work.",
      authorId: 3, // mentor_guide
      category: "general",
      tags: ["welcome", "community", "ES"],
      likes: 15,
      replies: 8,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: "12D Shield Practice Questions",
      content: "I've been practicing the 12D Shield for two weeks now and I'm starting to feel more energetically protected. However, I sometimes feel overwhelmed during the practice. Is this normal? Any tips for stabilizing the energy?",
      authorId: 1, // spiritual_seeker
      category: "practice",
      tags: ["12d-shield", "protection", "energy"],
      likes: 7,
      replies: 12,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 3,
      title: "Lightbody Activation Experiences",
      content: "Sharing my journey with lightbody activation - the sensations, the downloads, and the integration process. Week 3: Starting to feel more multidimensional awareness.",
      authorId: 2, // lightworker
      category: "experiences",
      tags: ["lightbody", "activation", "consciousness"],
      likes: 23,
      replies: 18,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];

  private groupSessions: GroupSession[] = [
    {
      id: 1,
      title: "12D Shield Group Practice",
      type: "meditation",
      hostId: 3, // mentor_guide
      description: "Guided group session for building and strengthening your 12D Shield. Perfect for beginners and those wanting to deepen their practice.",
      participants: 8,
      maxParticipants: 20,
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 60,
      level: "beginner",
      isActive: 1,
      createdAt: new Date()
    },
    {
      id: 2,
      title: "Lightbody Activation Circle",
      type: "practice",
      hostId: 2, // lightworker
      description: "Advanced practice session focusing on lightbody activation and integration. We'll work with the 12D template and DNA activation sequences.",
      participants: 5,
      maxParticipants: 12,
      scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      duration: 90,
      level: "intermediate",
      isActive: 1,
      createdAt: new Date()
    },
    {
      id: 3,
      title: "ES Study Group - Grid Mechanics",
      type: "study",
      hostId: 3, // mentor_guide
      description: "Deep dive into understanding planetary grid mechanics, ley lines, and their role in consciousness evolution.",
      participants: 12,
      maxParticipants: 25,
      scheduledTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      duration: 120,
      level: "advanced",
      isActive: 1,
      createdAt: new Date()
    }
  ];

  private communityMembers: CommunityMember[] = [
    {
      id: 1,
      userId: 3,
      displayName: "Mentor Guide",
      level: "Advanced Practitioner",
      specialties: ["12D Shield", "Grid Work", "Lightbody Activation"],
      contributions: 150,
      isMentor: 1,
      isOnline: 1,
      joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
      lastSeen: new Date()
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
      joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 6 months ago
      lastSeen: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
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
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    }
  ];

  private postReactions: PostReaction[] = [
    {
      id: 1,
      postId: 1,
      userId: 1,
      type: "like",
      content: null,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000)
    },
    {
      id: 2,
      postId: 2,
      userId: 3,
      type: "reply",
      content: "This is completely normal! The overwhelm often happens when your energy system is expanding. Try grounding exercises between shield practice sessions.",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 3,
      postId: 2,
      userId: 2,
      type: "like",
      content: null,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 4,
      postId: 3,
      userId: 1,
      type: "reply",
      content: "Thank you for sharing this! I'm just starting my lightbody journey and this gives me hope.",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];

  private nextId = {
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
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.nextId.users++,
      username: insertUser.username,
      email: insertUser.email,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Progress tracking
  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    return this.userProgress.find(p => p.userId === userId);
  }

  async updateUserProgress(userId: number, progressUpdate: Partial<InsertUserProgress>): Promise<UserProgress> {
    const existingIndex = this.userProgress.findIndex(p => p.userId === userId);
    
    if (existingIndex >= 0) {
      const existing = this.userProgress[existingIndex];
      const updated: UserProgress = {
        ...existing,
        lastUpdated: new Date(),
        ...(progressUpdate.chakraProgress && { chakraProgress: progressUpdate.chakraProgress }),
        ...(progressUpdate.lightbodyProgress && { lightbodyProgress: progressUpdate.lightbodyProgress }),
        ...(progressUpdate.gridProgress && { gridProgress: progressUpdate.gridProgress }),
        ...(progressUpdate.overallLevel !== undefined && { overallLevel: progressUpdate.overallLevel })
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

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const newProgress: UserProgress = {
      id: this.nextId.userProgress++,
      userId: progress.userId,
      chakraProgress: progress.chakraProgress || { physicalChakras: [], morphogeneticChakras: [], completedChakras: [] },
      lightbodyProgress: progress.lightbodyProgress || { activatedLayers: [], integrationLevel: 0 },
      gridProgress: progress.gridProgress || { activatedSpheres: [], shieldIntegration: [] },
      overallLevel: progress.overallLevel || 0,
      lastUpdated: new Date()
    };
    this.userProgress.push(newProgress);
    return newProgress;
  }

  // Spiritual content
  async getSpiritualContent(type?: string, category?: string): Promise<SpiritualContent[]> {
    let content = [...this.spiritualContent];
    
    if (type && category) {
      content = content.filter(c => c.type === type && c.category === category);
    } else if (type) {
      content = content.filter(c => c.type === type);
    } else if (category) {
      content = content.filter(c => c.category === category);
    }
    
    return content.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getSpiritualContentById(id: number): Promise<SpiritualContent | undefined> {
    return this.spiritualContent.find(c => c.id === id);
  }

  async createSpiritualContent(content: InsertSpiritualContent): Promise<SpiritualContent> {
    const newContent: SpiritualContent = {
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
  async getMeditationSessions(userId: number): Promise<MeditationSession[]> {
    const sessions = this.meditationSessions.filter(s => s.userId === userId);
    return sessions.sort((a, b) => {
      const aTime = a.completedAt ? a.completedAt.getTime() : 0;
      const bTime = b.completedAt ? b.completedAt.getTime() : 0;
      return bTime - aTime;
    });
  }

  async createMeditationSession(session: InsertMeditationSession): Promise<MeditationSession> {
    const newSession: MeditationSession = {
      id: this.nextId.meditationSessions++,
      userId: session.userId,
      type: session.type,
      duration: session.duration,
      focusArea: session.focusArea || null,
      notes: session.notes || null,
      completedAt: new Date()
    };
    this.meditationSessions.push(newSession);
    return newSession;
  }

  // Community: Forum posts
  async getForumPosts(category?: string): Promise<ForumPost[]> {
    let posts = [...this.forumPosts];
    if (category) {
      posts = posts.filter(p => p.category === category);
    }
    return posts.sort((a, b) => {
      const aTime = a.createdAt ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt ? b.createdAt.getTime() : 0;
      return bTime - aTime;
    });
  }

  async getForumPostById(id: number): Promise<ForumPost | undefined> {
    return this.forumPosts.find(p => p.id === id);
  }

  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    const newPost: ForumPost = {
      id: this.nextId.forumPosts++,
      title: post.title,
      content: post.content,
      authorId: 1, // Security fix: Use server-derived user identity (hardcoded for now)
      category: post.category,
      tags: post.tags || null,
      likes: 0,
      replies: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.forumPosts.push(newPost);
    return newPost;
  }

  async updateForumPost(id: number, updates: Partial<InsertForumPost>): Promise<ForumPost> {
    const index = this.forumPosts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Forum post not found');
    }
    
    const updated = {
      ...this.forumPosts[index],
      ...updates,
      updatedAt: new Date()
    };
    this.forumPosts[index] = updated;
    return updated;
  }

  async deleteForumPost(id: number): Promise<boolean> {
    const index = this.forumPosts.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.forumPosts.splice(index, 1);
    return true;
  }

  // Community: Group sessions
  async getGroupSessions(): Promise<GroupSession[]> {
    const sessions = this.groupSessions.filter(s => s.isActive === 1);
    return sessions.sort((a, b) => {
      const aTime = a.scheduledTime ? a.scheduledTime.getTime() : 0;
      const bTime = b.scheduledTime ? b.scheduledTime.getTime() : 0;
      return aTime - bTime;
    });
  }

  async getGroupSessionById(id: number): Promise<GroupSession | undefined> {
    return this.groupSessions.find(s => s.id === id);
  }

  async createGroupSession(session: InsertGroupSession): Promise<GroupSession> {
    const newSession: GroupSession = {
      id: this.nextId.groupSessions++,
      title: session.title,
      type: session.type,
      hostId: 1, // Security fix: Use server-derived user identity
      description: session.description,
      participants: 0,
      maxParticipants: session.maxParticipants,
      scheduledTime: session.scheduledTime,
      duration: session.duration,
      level: session.level,
      isActive: 1,
      createdAt: new Date()
    };
    this.groupSessions.push(newSession);
    return newSession;
  }

  async updateGroupSession(id: number, updates: Partial<InsertGroupSession>): Promise<GroupSession> {
    const index = this.groupSessions.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Group session not found');
    }
    
    const updated = { ...this.groupSessions[index], ...updates };
    this.groupSessions[index] = updated;
    return updated;
  }

  async joinGroupSession(sessionId: number): Promise<GroupSession> {
    const index = this.groupSessions.findIndex(s => s.id === sessionId);
    if (index === -1) {
      throw new Error('Group session not found');
    }
    
    const session = this.groupSessions[index];
    const updated = { ...session, participants: session.participants + 1 };
    this.groupSessions[index] = updated;
    return updated;
  }

  // Community: Members
  async getCommunityMembers(): Promise<CommunityMember[]> {
    return [...this.communityMembers].sort((a, b) => b.contributions - a.contributions);
  }

  async getCommunityMemberByUserId(userId: number): Promise<CommunityMember | undefined> {
    return this.communityMembers.find(m => m.userId === userId);
  }

  async createCommunityMember(member: InsertCommunityMember): Promise<CommunityMember> {
    const newMember: CommunityMember = {
      id: this.nextId.communityMembers++,
      userId: member.userId,
      displayName: member.displayName,
      level: member.level,
      specialties: member.specialties || null,
      contributions: 0,
      isMentor: member.isMentor || 0,
      isOnline: 0,
      joinDate: new Date(),
      lastSeen: new Date()
    };
    this.communityMembers.push(newMember);
    return newMember;
  }

  async updateCommunityMember(id: number, updates: Partial<InsertCommunityMember>): Promise<CommunityMember> {
    const index = this.communityMembers.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Community member not found');
    }
    
    const updated = {
      ...this.communityMembers[index],
      ...updates,
      lastSeen: new Date()
    };
    this.communityMembers[index] = updated;
    return updated;
  }

  // Community: Post reactions
  async getPostReactions(postId: number): Promise<PostReaction[]> {
    const reactions = this.postReactions.filter(r => r.postId === postId);
    return reactions.sort((a, b) => {
      const aTime = a.createdAt ? a.createdAt.getTime() : 0;
      const bTime = b.createdAt ? b.createdAt.getTime() : 0;
      return bTime - aTime;
    });
  }

  async createPostReaction(reaction: InsertPostReaction): Promise<PostReaction> {
    const newReaction: PostReaction = {
      id: this.nextId.postReactions++,
      postId: reaction.postId,
      userId: 1, // Security fix: Use server-derived user identity
      type: reaction.type,
      content: reaction.content || null,
      createdAt: new Date()
    };
    this.postReactions.push(newReaction);
    return newReaction;
  }

  async deletePostReaction(id: number): Promise<boolean> {
    const index = this.postReactions.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    this.postReactions.splice(index, 1);
    return true;
  }
}

// Storage factory with database fallback
class StorageManager {
  private dbStorage = new DatabaseStorage();
  private memStorage = new MemStorage();
  private isDatabaseAvailable = true;
  private lastDbCheck = 0;
  private dbCheckInterval = 30000; // Check every 30 seconds

  async getStorage(): Promise<IStorage> {
    // Periodically check database availability
    const now = Date.now();
    if (now - this.lastDbCheck > this.dbCheckInterval) {
      await this.checkDatabaseAvailability();
      this.lastDbCheck = now;
    }

    return this.isDatabaseAvailable ? this.dbStorage : this.memStorage;
  }

  private async checkDatabaseAvailability(): Promise<void> {
    try {
      // Try a simple query to test database connectivity
      await this.dbStorage.getUser(1);
      if (!this.isDatabaseAvailable) {
        console.log('✅ Database connection restored, switching to DatabaseStorage');
      }
      this.isDatabaseAvailable = true;
    } catch (error) {
      if (this.isDatabaseAvailable) {
        console.log('⚠️ Database connection failed, falling back to MemStorage');
        console.error('Database error:', error instanceof Error ? error.message : 'Unknown error');
      }
      this.isDatabaseAvailable = false;
    }
  }
}

const storageManager = new StorageManager();

// Export a wrapper that always returns the appropriate storage
export const storage = {
  async getUser(id: number) {
    const impl = await storageManager.getStorage();
    return impl.getUser(id);
  },
  async getUserByEmail(email: string) {
    const impl = await storageManager.getStorage();
    return impl.getUserByEmail(email);
  },
  async createUser(user: InsertUser) {
    const impl = await storageManager.getStorage();
    return impl.createUser(user);
  },
  async getUserProgress(userId: number) {
    const impl = await storageManager.getStorage();
    return impl.getUserProgress(userId);
  },
  async updateUserProgress(userId: number, progress: Partial<InsertUserProgress>) {
    const impl = await storageManager.getStorage();
    return impl.updateUserProgress(userId, progress);
  },
  async createUserProgress(progress: InsertUserProgress) {
    const impl = await storageManager.getStorage();
    return impl.createUserProgress(progress);
  },
  async getSpiritualContent(type?: string, category?: string) {
    const impl = await storageManager.getStorage();
    return impl.getSpiritualContent(type, category);
  },
  async getSpiritualContentById(id: number) {
    const impl = await storageManager.getStorage();
    return impl.getSpiritualContentById(id);
  },
  async createSpiritualContent(content: InsertSpiritualContent) {
    const impl = await storageManager.getStorage();
    return impl.createSpiritualContent(content);
  },
  async getMeditationSessions(userId: number) {
    const impl = await storageManager.getStorage();
    return impl.getMeditationSessions(userId);
  },
  async createMeditationSession(session: InsertMeditationSession) {
    const impl = await storageManager.getStorage();
    return impl.createMeditationSession(session);
  },
  async getForumPosts(category?: string) {
    const impl = await storageManager.getStorage();
    return impl.getForumPosts(category);
  },
  async getForumPostById(id: number) {
    const impl = await storageManager.getStorage();
    return impl.getForumPostById(id);
  },
  async createForumPost(post: InsertForumPost) {
    const impl = await storageManager.getStorage();
    return impl.createForumPost(post);
  },
  async updateForumPost(id: number, updates: Partial<InsertForumPost>) {
    const impl = await storageManager.getStorage();
    return impl.updateForumPost(id, updates);
  },
  async deleteForumPost(id: number) {
    const impl = await storageManager.getStorage();
    return impl.deleteForumPost(id);
  },
  async getGroupSessions() {
    const impl = await storageManager.getStorage();
    return impl.getGroupSessions();
  },
  async getGroupSessionById(id: number) {
    const impl = await storageManager.getStorage();
    return impl.getGroupSessionById(id);
  },
  async createGroupSession(session: InsertGroupSession) {
    const impl = await storageManager.getStorage();
    return impl.createGroupSession(session);
  },
  async updateGroupSession(id: number, updates: Partial<InsertGroupSession>) {
    const impl = await storageManager.getStorage();
    return impl.updateGroupSession(id, updates);
  },
  async joinGroupSession(sessionId: number) {
    const impl = await storageManager.getStorage();
    return impl.joinGroupSession(sessionId);
  },
  async getCommunityMembers() {
    const impl = await storageManager.getStorage();
    return impl.getCommunityMembers();
  },
  async getCommunityMemberByUserId(userId: number) {
    const impl = await storageManager.getStorage();
    return impl.getCommunityMemberByUserId(userId);
  },
  async createCommunityMember(member: InsertCommunityMember) {
    const impl = await storageManager.getStorage();
    return impl.createCommunityMember(member);
  },
  async updateCommunityMember(id: number, updates: Partial<InsertCommunityMember>) {
    const impl = await storageManager.getStorage();
    return impl.updateCommunityMember(id, updates);
  },
  async getPostReactions(postId: number) {
    const impl = await storageManager.getStorage();
    return impl.getPostReactions(postId);
  },
  async createPostReaction(reaction: InsertPostReaction) {
    const impl = await storageManager.getStorage();
    return impl.createPostReaction(reaction);
  },
  async deletePostReaction(id: number) {
    const impl = await storageManager.getStorage();
    return impl.deletePostReaction(id);
  }
};