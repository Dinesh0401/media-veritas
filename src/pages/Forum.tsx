
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MessageSquare, 
  Search, 
  Eye, 
  MessageCircle, 
  Clock, 
  AlertTriangle,
  ThumbsUp,
  BarChart2,
  Shield,
  CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Mock data for forum discussions
const mockDiscussions = [
  {
    id: 1,
    title: "Dangerous new deepfake technology just released - What we need to know",
    author: "techexpert",
    avatar: "TE",
    date: "2 hours ago",
    views: 352,
    replies: 24,
    category: "technology",
    tags: ["new-tech", "warning"],
    pinned: true,
  },
  {
    id: 2,
    title: "I think I found a deepfake of a politician - How to report properly?",
    author: "concerned_citizen",
    avatar: "CC",
    date: "5 hours ago",
    views: 178,
    replies: 12,
    category: "reporting",
    tags: ["politics", "help"],
  },
  {
    id: 3,
    title: "Research: 75% increase in voice cloning deepfakes in last quarter",
    author: "data_analyst",
    avatar: "DA",
    date: "1 day ago",
    views: 421,
    replies: 32,
    category: "research",
    tags: ["statistics", "voice-clone"],
  },
  {
    id: 4,
    title: "Guide: How to identify AI-generated images vs. real photos",
    author: "mediaexpert",
    avatar: "ME",
    date: "2 days ago",
    views: 645,
    replies: 47,
    category: "guides",
    tags: ["tutorial", "detection"],
    pinned: true,
  },
  {
    id: 5,
    title: "My experience reporting a deepfake - Timeline and outcome",
    author: "user123",
    avatar: "U1",
    date: "3 days ago",
    views: 302,
    replies: 28,
    category: "stories",
    tags: ["experience", "success-story"],
  },
  {
    id: 6,
    title: "New legal framework for deepfake accountability in EU",
    author: "legal_eagle",
    avatar: "LE",
    date: "4 days ago",
    views: 289,
    replies: 19,
    category: "legal",
    tags: ["law", "EU", "regulation"],
  },
  {
    id: 7,
    title: "Tools to protect yourself from being used in deepfakes",
    author: "security_pro",
    avatar: "SP",
    date: "5 days ago",
    views: 512,
    replies: 36,
    category: "tools",
    tags: ["protection", "prevention"],
  },
  {
    id: 8,
    title: "Celebrity deepfakes - The growing problem and what fans can do",
    author: "entertainment_watch",
    avatar: "EW",
    date: "1 week ago",
    views: 728,
    replies: 53,
    category: "discussion",
    tags: ["celebrity", "entertainment"],
  },
];

const trendingTags = [
  "detection", "politics", "technology", "protection", "voice-clone", 
  "celebrity", "tutorial", "law", "new-tech", "research"
];

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("latest");
  
  // Filter discussions based on search, category, and active tab
  const filteredDiscussions = mockDiscussions.filter((discussion) => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || discussion.category === categoryFilter;
    
    // For "pinned" tab, only show pinned discussions
    if (activeTab === "pinned" && !discussion.pinned) {
      return false;
    }
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort discussions based on active tab
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (activeTab === "popular") {
      return b.views - a.views;
    }
    return 0; // Default sorting (latest) is already in the mock data
  });
  
  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technology":
        return "bg-blue-100 text-blue-800";
      case "reporting":
        return "bg-green-100 text-green-800";
      case "research":
        return "bg-purple-100 text-purple-800";
      case "guides":
        return "bg-amber-100 text-amber-800";
      case "stories":
        return "bg-pink-100 text-pink-800";
      case "legal":
        return "bg-gray-100 text-gray-800";
      case "tools":
        return "bg-indigo-100 text-indigo-800";
      case "discussion":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discussion Forum</h1>
            <p className="text-muted-foreground">
              Discuss deepfake incidents, share knowledge, and learn from the community
            </p>
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content - Discussions */}
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search discussions..."
                      className="pl-9 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="reporting">Reporting</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="guides">Guides</SelectItem>
                      <SelectItem value="stories">Stories</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="discussion">Discussion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="pinned">Pinned</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {sortedDiscussions.length > 0 ? (
              <div className="space-y-4">
                {sortedDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="hidden sm:flex h-10 w-10">
                          <AvatarImage src="" alt={discussion.author} />
                          <AvatarFallback>{discussion.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            {discussion.pinned && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" /> Pinned
                              </Badge>
                            )}
                            <Badge variant="outline" className={`${getCategoryColor(discussion.category)} capitalize`}>
                              {discussion.category}
                            </Badge>
                          </div>
                          <Link to={`/forum/${discussion.id}`} className="mt-2 block">
                            <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                              {discussion.title}
                            </h3>
                          </Link>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              by <span className="font-medium text-foreground">{discussion.author}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {discussion.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" /> {discussion.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3.5 w-3.5" /> {discussion.replies}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="py-8">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any discussions matching your search criteria.
                    </p>
                    <Button 
                      onClick={() => { 
                        setSearchTerm(""); 
                        setCategoryFilter("all"); 
                        setActiveTab("latest");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Forum Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-fakenik-blue" />
                    <span>Total Discussions</span>
                  </div>
                  <span className="font-semibold">2,541</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-fakenik-teal" />
                    <span>Total Replies</span>
                  </div>
                  <span className="font-semibold">18,925</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-fakenik-blue" />
                    <span>Reports Submitted</span>
                  </div>
                  <span className="font-semibold">3,872</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-fakenik-teal" />
                    <span>Detection Rate</span>
                  </div>
                  <span className="font-semibold">86%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trending Tags</CardTitle>
                <CardDescription>
                  Popular topics in the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm cursor-pointer hover:bg-secondary/80">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>TE</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">techexpert</p>
                    <p className="text-xs text-muted-foreground">324 contributions</p>
                  </div>
                  <ThumbsUp className="h-4 w-4 text-fakenik-blue" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">mediaexpert</p>
                    <p className="text-xs text-muted-foreground">287 contributions</p>
                  </div>
                  <ThumbsUp className="h-4 w-4 text-fakenik-blue" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>DA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">data_analyst</p>
                    <p className="text-xs text-muted-foreground">213 contributions</p>
                  </div>
                  <ThumbsUp className="h-4 w-4 text-fakenik-blue" />
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">security_pro</p>
                    <p className="text-xs text-muted-foreground">189 contributions</p>
                  </div>
                  <ThumbsUp className="h-4 w-4 text-fakenik-blue" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-sm">View All Contributors</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  To maintain a respectful and productive community, please follow these guidelines:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Be respectful to other members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Share only verified information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Don't post or link to manipulated content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Protect privacy of individuals</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-sm">Read Full Guidelines</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
