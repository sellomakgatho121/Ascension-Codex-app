
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThreeFoldFlameLogo } from "@/components/three-fold-flame-logo";
import { 
  timelineShiftBlogPosts, 
  getBlogPostsByCategory,
  getBlogPostsByLevel,
  searchBlogPosts,
  getBlogNavigationStructure,
  blogContentCategories,
  type BlogPost 
} from "@/lib/blog-integration";
import { renderSafeContent } from "@/lib/html-sanitizer";
import { Clock, Search, BookOpen, Users, TrendingUp, Filter } from "lucide-react";

export default function BlogTimelineShiftPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const navigation = getBlogNavigationStructure();

  const filteredPosts = useMemo(() => {
    let posts = timelineShiftBlogPosts;

    if (searchQuery) {
      posts = searchBlogPosts(searchQuery);
    }

    if (selectedCategory !== "all") {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    if (selectedLevel !== "all") {
      posts = posts.filter(post => post.progressionLevel === selectedLevel);
    }

    return posts;
  }, [searchQuery, selectedCategory, selectedLevel]);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-cosmic-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setSelectedPost(null)}
            className="mb-6 bg-cosmic-700 hover:bg-cosmic-600"
          >
            ← Back to Blog Posts
          </Button>
          
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge 
                  variant="outline" 
                  className={`text-white border-cosmic-600 bg-gradient-to-r ${blogContentCategories[selectedPost.category]?.color}`}
                >
                  {blogContentCategories[selectedPost.category]?.icon} {blogContentCategories[selectedPost.category]?.title}
                </Badge>
                <Badge variant="secondary" className="bg-cosmic-700">
                  {selectedPost.progressionLevel}
                </Badge>
                <span className="text-cosmic-300 text-sm">{selectedPost.date}</span>
              </div>
              
              <h1 className="text-4xl font-sacred font-bold mb-4 text-sacred-gold">
                {selectedPost.title}
              </h1>
              
              <p className="text-xl text-cosmic-200 leading-relaxed">
                {selectedPost.summary}
              </p>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="bg-cosmic-800/50 p-6 rounded-lg mb-8">
                <h3 className="text-sacred-gold mb-4">Key Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.keyTopics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="border-sacred-gold text-sacred-gold">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div 
                className="text-cosmic-100 leading-relaxed"
                dangerouslySetInnerHTML={renderSafeContent(selectedPost.content)}
              />

              <div className="bg-cosmic-800/50 p-6 rounded-lg mt-8">
                <h3 className="text-sacred-gold mb-4">Practical Applications</h3>
                <ul className="space-y-2">
                  {selectedPost.practicalApplications.map((application, index) => (
                    <li key={index} className="text-cosmic-200">
                      • {application}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cosmic-800/50 p-6 rounded-lg mt-6">
                <h3 className="text-sacred-gold mb-4">Related Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.relatedConcepts.map((concept, index) => (
                    <Badge key={index} variant="secondary" className="bg-cosmic-700">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <ThreeFoldFlameLogo 
              size={60} 
              animated={true}
              className="mr-4"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Timeline Shift Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Comprehensive insights into consciousness evolution, timeline navigation, and spiritual transformation
          </p>
        </div>
      </section>

      {/* Navigation and Filters */}
      <section className="py-8 bg-cosmic-800/50">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-cosmic-700/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="progression">Progression</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Total Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-cosmic-100">{timelineShiftBlogPosts.length}</p>
                    <p className="text-cosmic-300">Comprehensive articles</p>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-cosmic-100">{navigation.categories.length}</p>
                    <p className="text-cosmic-300">Topic areas covered</p>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardHeader>
                    <CardTitle className="text-sacred-gold flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Levels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-cosmic-100">{navigation.progressionLevels.length}</p>
                    <p className="text-cosmic-300">Progression stages</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {navigation.categories.map((category) => (
                  <Card key={category.id} className="sacred-card">
                    <CardHeader>
                      <CardTitle className={`text-white bg-gradient-to-r ${blogContentCategories[category.id]?.color} bg-clip-text text-transparent`}>
                        {blogContentCategories[category.id]?.icon} {category.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-300 mb-4">{category.description}</p>
                      <Badge variant="secondary" className="bg-cosmic-700">
                        {getBlogPostsByCategory(category.id).length} posts
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progression">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {navigation.progressionLevels.map((level) => (
                  <Card key={level.id} className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-sacred-gold">{level.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-cosmic-300 mb-4">{level.description}</p>
                      <Badge variant="secondary" className="bg-cosmic-700">
                        {getBlogPostsByLevel(level.id).length} posts
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="search">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search blog posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-cosmic-800 border-cosmic-600 text-white"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48 bg-cosmic-800 border-cosmic-600">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-cosmic-800 border-cosmic-600">
                      <SelectItem value="all">All Categories</SelectItem>
                      {navigation.categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full md:w-48 bg-cosmic-800 border-cosmic-600">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-cosmic-800 border-cosmic-600">
                      <SelectItem value="all">All Levels</SelectItem>
                      {navigation.progressionLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>{level.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="sacred-card cursor-pointer transform hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`text-white border-cosmic-600 bg-gradient-to-r ${blogContentCategories[post.category]?.color}`}
                    >
                      {blogContentCategories[post.category]?.icon} {blogContentCategories[post.category]?.title}
                    </Badge>
                    <span className="text-cosmic-400 text-sm">{post.date}</span>
                  </div>
                  <CardTitle className="text-sacred-gold text-lg leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-300 mb-4 line-clamp-3">{post.summary}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.keyTopics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-cosmic-700">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-sacred-silver text-sacred-silver">
                      {post.progressionLevel}
                    </Badge>
                    <Button 
                      onClick={() => setSelectedPost(post)}
                      size="sm" 
                      className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cosmic-400 text-lg">No blog posts found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
                className="mt-4 bg-cosmic-700 hover:bg-cosmic-600"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
