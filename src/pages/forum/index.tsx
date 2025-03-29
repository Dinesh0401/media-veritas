
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { mockDiscussions, latestNews, trendingTags } from "./data/mockData";
import { getCategoryColor } from "./utils/helpers";

// Components
import ForumCategories from "./components/ForumCategories";
import DiscussionList from "./components/DiscussionList";
import LatestNews from "./components/LatestNews";
import SidebarStats from "./components/SidebarStats";

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("latest");
  const [newsTab, setNewsTab] = useState("all");
  
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

  const filteredNews = latestNews.filter((news) => {
    return newsTab === "all" || news.category === newsTab;
  });
  
  const clearFilters = () => {
    setSearchTerm(""); 
    setCategoryFilter("all"); 
    setActiveTab("latest");
  };

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
          <Button>
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
