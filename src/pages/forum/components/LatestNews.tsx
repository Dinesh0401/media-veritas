
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Heart, MessageCircle, Share2, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { NewsItemProps } from "../types";

interface LatestNewsProps {
  newsTab: string;
  setNewsTab: (value: string) => void;
  filteredNews: NewsItemProps[];
  onLike: (newsId: string) => void;
}

export default function LatestNews({ newsTab, setNewsTab, filteredNews, onLike }: LatestNewsProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const autoScrollTimerRef = useRef<number | null>(null);

  // Auto-scroll news items
  useEffect(() => {
    if (autoScroll && filteredNews.length > 1) {
      const timer = window.setInterval(() => {
        setCurrentNewsIndex((prevIndex) => 
          prevIndex === filteredNews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change news every 5 seconds
      
      autoScrollTimerRef.current = timer;
      
      return () => {
        if (autoScrollTimerRef.current) {
          clearInterval(autoScrollTimerRef.current);
        }
      };
    }
  }, [autoScroll, filteredNews.length]);

  // Pause auto-scroll when user interacts with news
  const pauseAutoScroll = () => {
    setAutoScroll(false);
    // Resume after 30 seconds of inactivity
    setTimeout(() => setAutoScroll(true), 30000);
  };

  const handlePrevNews = () => {
    pauseAutoScroll();
    setCurrentNewsIndex((prevIndex) => 
      prevIndex === 0 ? filteredNews.length - 1 : prevIndex - 1
    );
  };

  const handleNextNews = () => {
    pauseAutoScroll();
    setCurrentNewsIndex((prevIndex) => 
      prevIndex === filteredNews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const displayedNews = filteredNews.length > 0 
    ? [filteredNews[currentNewsIndex]] 
    : [];

  return (
    <div>
      <Tabs value={newsTab} onValueChange={setNewsTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Deepfake">Deepfake</TabsTrigger>
          <TabsTrigger value="AI">AI</TabsTrigger>
          <TabsTrigger value="Tech">Tech</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredNews.length > 0 ? (
        <div className="space-y-4 relative">
          {displayedNews.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={news.authorAvatar} />
                      <AvatarFallback>{news.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{news.author}</span>
                        {news.verified && (
                          <CheckCircle className="ml-1 h-3.5 w-3.5 text-fakenik-blue fill-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span>@{news.handle}</span>
                        <span>•</span>
                        <span>{news.timePosted}</span>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline">{news.category}</Badge>
                    </div>
                  </div>
                  
                  <p className="mb-4">{news.content}</p>
                  
                  {news.hasImage && news.imageUrl ? (
                    <div className="mb-4 rounded-md overflow-hidden">
                      <img 
                        src={news.imageUrl} 
                        alt={news.content} 
                        className="w-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="mb-4 bg-muted/30 rounded-md p-2 text-center text-sm text-muted-foreground">
                      AI is generating an image for this news...
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button 
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          pauseAutoScroll();
                          onLike(news.id);
                        }}
                      >
                        <Heart className="h-4 w-4" />
                        <span>{news.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{news.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Share2 className="h-4 w-4" />
                        <span>{news.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredNews.length > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-background/80"
                onClick={handlePrevNews}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center justify-center w-full gap-1 mt-2">
                {filteredNews.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index === currentNewsIndex 
                        ? "w-4 bg-fakenik-blue" 
                        : "w-1.5 bg-muted"
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-background/80"
                onClick={handleNextNews}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No news found</h3>
              <p className="text-muted-foreground mb-4">
                There are no news items in this category.
              </p>
              <Button onClick={() => setNewsTab("all")}>
                Show All News
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
