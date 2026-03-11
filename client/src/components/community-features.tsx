import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  Heart, 
  Share2,
  Star,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Plus,
  Send
} from "lucide-react";

export function CommunityFeatures() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { toast } = useToast();

  // Fetch forum posts
  const { data: forumPosts = [], isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['/api/forum-posts'],
    queryFn: async () => {
      const res = await fetch('/api/forum-posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  });

  // Fetch group sessions
  const { data: groupSessions = [], isLoading: sessionsLoading, error: sessionsError } = useQuery({
    queryKey: ['/api/group-sessions'],
    queryFn: async () => {
      const res = await fetch('/api/group-sessions');
      if (!res.ok) throw new Error('Failed to fetch sessions');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  });

  // Fetch community members
  const { data: communityMembers = [], isLoading: membersLoading, error: membersError } = useQuery({
    queryKey: ['/api/community-members'],
    queryFn: async () => {
      const res = await fetch('/api/community-members');
      if (!res.ok) throw new Error('Failed to fetch members');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    }
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: {title: string, content: string, category: string, tags: string[]}) => {
      const res = await fetch('/api/forum-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          authorId: 1, // TODO: Get from user context
          category: postData.category,
          tags: postData.tags || []
        })
      });
      if (!res.ok) throw new Error('Failed to create post');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/forum-posts'] });
      setNewPostTitle('');
      setNewPostContent('');
      toast({
        title: "Success",
        description: "Your post has been created successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error", 
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Handle post submission
  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
      return;
    }

    createPostMutation.mutate({
      title: newPostTitle,
      content: newPostContent,
      category: selectedCategory,
      tags: []
    });
  };

  const formatTimeAgo = (date: string | Date | null | undefined) => {
    if (!date) return 'Unknown time';
    
    const timestamp = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(timestamp.getTime())) return 'Unknown time';
    
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  const formatScheduledTime = (date: string | Date | null | undefined) => {
    if (!date) return 'Time TBD';
    
    const timestamp = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(timestamp.getTime())) return 'Time TBD';
    
    const now = new Date();
    const diffMs = timestamp.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `In ${diffDays} days`;
    if (diffHours > 0) return `In ${diffHours} hours`;
    return 'Starting soon';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      chakras: 'bg-red-500/20 text-red-400 border-red-500/30',
      protection: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      lightbody: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'tree-grid': 'bg-green-500/20 text-green-400 border-green-500/30',
      meditation: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      general: 'bg-cosmic-500/20 text-cosmic-400 border-cosmic-500/30'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'meditation': return <Clock className="w-4 h-4" />;
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <Star className="w-4 h-4" />;
      case 'discussion': return <MessageCircle className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-cosmic-500/20 text-cosmic-400';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
            <Users className="w-6 h-6 mr-3" />
            Spiritual Community
          </CardTitle>
          <p className="text-cosmic-100">
            Connect with fellow practitioners on the path of consciousness evolution
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="sessions">Group Sessions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          {/* Create New Post */}
          <Card className="sacred-card">
            <CardHeader>
              <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Start a Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Discussion title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="bg-cosmic-800 border-cosmic-600"
                data-testid="input-post-title"
              />
              <Textarea
                placeholder="Share your thoughts, questions, or experiences..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="bg-cosmic-800 border-cosmic-600 min-h-[100px]"
                data-testid="input-post-content"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {['general', 'chakras', 'protection', 'lightbody', 'tree-grid', 'meditation'].map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className="text-xs"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="sacred-button" 
                  onClick={handleSubmitPost}
                  disabled={createPostMutation.isPending}
                  data-testid="button-submit-post"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {createPostMutation.isPending ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Forum Posts */}
          <div className="space-y-4">
            {postsLoading && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">Loading discussions...</div>
                </CardContent>
              </Card>
            )}
            {postsError && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">Unable to load discussions. Please try again later.</div>
                </CardContent>
              </Card>
            )}
            {!postsLoading && !postsError && forumPosts.length === 0 && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">No discussions yet. Be the first to start a conversation!</div>
                </CardContent>
              </Card>
            )}
            {Array.isArray(forumPosts) && forumPosts.map((post: any) => (
              <Card key={post.id} className="sacred-card hover:border-sacred-gold/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-cosmic-700 text-sacred-gold">
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{post.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-cosmic-300 mb-2">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(post.timestamp)}</span>
                          </div>
                          <p className="text-cosmic-100 text-sm leading-relaxed mb-3">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className={getCategoryColor(post.category)}>
                              {post.category}
                            </Badge>
                            {post.tags?.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-cosmic-700">
                      <div className="flex items-center space-x-4 text-sm text-cosmic-400">
                        <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.replies}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-cosmic-400 hover:text-white">
                        View Discussion
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="grid gap-6">
            {sessionsLoading && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">Loading group sessions...</div>
                </CardContent>
              </Card>
            )}
            {sessionsError && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">Unable to load group sessions. Please try again later.</div>
                </CardContent>
              </Card>
            )}
            {!sessionsLoading && !sessionsError && groupSessions.length === 0 && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">No group sessions scheduled. Check back soon!</div>
                </CardContent>
              </Card>
            )}
            {Array.isArray(groupSessions) && groupSessions.map((session: any) => (
              <Card key={session.id} className="sacred-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 rounded-lg bg-cosmic-700">
                        <div className="text-sacred-gold">
                          {getSessionTypeIcon(session.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-white">{session.title}</h3>
                          <Badge variant="outline" className={getLevelColor(session.level)}>
                            {session.level}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-cosmic-300 mb-3">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {session.participants}/{session.maxParticipants}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.duration}m
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatScheduledTime(session.scheduledTime)}
                          </span>
                        </div>
                        <p className="text-cosmic-100 text-sm mb-3">{session.description}</p>
                        <div className="text-xs text-cosmic-400">
                          Hosted by <span className="text-sacred-gold">{session.host}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="sacred-button w-full">
                        Join Session
                      </Button>
                      <div className="text-xs text-center text-cosmic-400">
                        {session.maxParticipants - session.participants} spots left
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membersLoading && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">Loading community members...</div>
                </CardContent>
              </Card>
            )}
            {membersError && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">Unable to load community members. Please try again later.</div>
                </CardContent>
              </Card>
            )}
            {!membersLoading && !membersError && communityMembers.length === 0 && (
              <Card className="sacred-card">
                <CardContent className="p-6 text-center">
                  <div className="text-cosmic-300">No community members found. Join the community to be the first!</div>
                </CardContent>
              </Card>
            )}
            {Array.isArray(communityMembers) && communityMembers.map((member: any) => (
              <Card key={member.id} className="sacred-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-cosmic-700 text-sacred-gold text-lg">
                            {member.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-cosmic-900"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white">{member.name}</h3>
                          {member.isMentor && (
                            <Badge variant="outline" className="text-sacred-gold border-sacred-gold/50 text-xs">
                              Mentor
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-cosmic-300">{member.level}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-cosmic-400">Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties?.map((specialty: string) => (
                          <Badge key={specialty} variant="outline" className="text-xs border-cosmic-500/30 text-cosmic-400">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-cosmic-400">
                      <span className="flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {member.contributions} contributions
                      </span>
                      <span>Joined {member.joinDate.getFullYear()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Message
                      </Button>
                      {member.isMentor && (
                        <Button variant="outline" size="sm" className="flex-1 text-xs border-sacred-gold text-sacred-gold">
                          Request Guidance
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-silver">
                  Find a Mentor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-cosmic-100 text-sm">
                  Connect with experienced practitioners who can guide your spiritual development journey.
                </p>
                <div className="space-y-3">
                  {communityMembers.filter(m => m.isMentor).map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between p-3 rounded-lg bg-cosmic-700/30">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-cosmic-700 text-sacred-gold text-sm">
                            {mentor.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white text-sm">{mentor.name}</div>
                          <div className="text-xs text-cosmic-400">{mentor.specialties[0]}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="sacred-card">
              <CardHeader>
                <CardTitle className="text-lg font-sacred text-sacred-silver">
                  Become a Mentor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-cosmic-100 text-sm">
                  Share your knowledge and help guide others on their spiritual path.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-cosmic-700/30">
                    <div className="text-sm font-medium text-white mb-1">Requirements:</div>
                    <ul className="text-xs text-cosmic-300 space-y-1">
                      <li>• Advanced level in at least one spiritual system</li>
                      <li>• 6+ months of consistent practice</li>
                      <li>• 50+ community contributions</li>
                      <li>• Commitment to regular guidance sessions</li>
                    </ul>
                  </div>
                  <Button className="w-full sacred-button">
                    Apply to Become Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}