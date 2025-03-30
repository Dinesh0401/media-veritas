
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Loader, AlertTriangle } from "lucide-react";
import { mockDiscussions, trendingTags } from "./data/mockData";
import { getCategoryColor } from "./utils/helpers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { generateNewsImageWithAI } from "@/utils/generateNewsImage";

// Components
import ForumCategories from "./components/ForumCategories";
import DiscussionList from "./components/DiscussionList";
import LatestNews from "./components/LatestNews";
import SidebarStats from "./components/SidebarStats";
import { NewsItemProps } from "./types";

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("latest");
  const [newsTab, setNewsTab] = useState("all");
  const [newsItems, setNewsItems] = useState<NewsItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        const mappedNewsPromises = (data || []).map(async (item: any) => {
          const hasImage = !!item.image_url;
          let imageUrl = item.image_url;
          
          // Generate an image for news without images
          if (!hasImage) {
            imageUrl = await generateNewsImageWithAI(item.content, item.category);
          }
          
          return {
            id: item.id,
            author: item.author,
            handle: item.author_handle,
            authorAvatar: item.author_avatar,
            content: item.content,
            timePosted: new Date(item.created_at).toLocaleString(),
            likes: item.likes,
            comments: item.comments,
            shares: item.shares,
            verified: item.verified,
            hasImage: true, // We now provide an image for all news items
            imageUrl: imageUrl,
            category: item.category,
            metadata: item
          };
        });
        
        const formattedNews = await Promise.all(mappedNewsPromises);
        setNewsItems(formattedNews);
      } catch (error: any) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error fetching news",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, [toast]);
  
  const filteredDiscussions = mockDiscussions.filter((discussion) => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || discussion.category === categoryFilter;
    
    if (activeTab === "pinned" && !discussion.pinned) {
      return false;
    }
    
    return matchesSearch && matchesCategory;
  });
  
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (activeTab === "popular") {
      return b.views - a.views;
    }
    return 0;
  });

  const filteredNews = newsItems.filter((news) => {
    return newsTab === "all" || news.category === newsTab;
  });
  
  const clearFilters = () => {
    setSearchTerm(""); 
    setCategoryFilter("all"); 
    setActiveTab("latest");
  };

  const handleLikeNews = async (newsId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like news items",
        variant: "destructive",
      });
      return;
    }

    try {
      const newsItem = newsItems.find(item => item.id === newsId);
      if (!newsItem) return;

      const { error } = await supabase
        .from('news')
        .update({ likes: newsItem.likes + 1 })
        .eq('id', newsId);

      if (error) {
        throw error;
      }

      setNewsItems(newsItems.map(item => 
        item.id === newsId ? { ...item, likes: item.likes + 1 } : item
      ));

      toast({
        title: "Liked!",
        description: "You've liked this news item.",
      });
    } catch (error: any) {
      console.error('Error liking news:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-fakenik-blue" />
          <p className="text-muted-foreground">Loading forum data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discussion Forum</h1>
            <p className="text-muted-foreground">
              Discuss deepfake incidents, share knowledge, and stay updated with the latest news
            </p>
          </div>
          <Button onClick={() => {
            if (!user) {
              toast({
                title: "Authentication required",
                description: "Please sign in to create a discussion",
                variant: "destructive",
              });
              return;
            }
          }}>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="discussions" className="mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="discussions" className="flex-1">Discussions</TabsTrigger>
                <TabsTrigger value="news" className="flex-1">Latest News</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussions">
                <ForumCategories 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  sortedDiscussions={sortedDiscussions}
                  setActiveTab={setActiveTab}
                />
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="pinned">Pinned</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <DiscussionList 
                  sortedDiscussions={sortedDiscussions}
                  getCategoryColor={getCategoryColor}
                  clearFilters={clearFilters}
                />
              </TabsContent>
              
              <TabsContent value="news">
                <LatestNews
                  newsTab={newsTab}
                  setNewsTab={setNewsTab}
                  filteredNews={filteredNews}
                  onLike={handleLikeNews}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <SidebarStats trendingTags={trendingTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
