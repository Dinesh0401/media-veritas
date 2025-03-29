
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  MessageCircle, 
  Repeat, 
  Heart, 
  Bookmark, 
  Share2, 
  RefreshCw 
} from "lucide-react";
import { NewsItemProps } from "../types";

interface LatestNewsProps {
  newsTab: string;
  setNewsTab: (tab: string) => void;
  filteredNews: NewsItemProps[];
}

export default function LatestNews({ newsTab, setNewsTab, filteredNews }: LatestNewsProps) {
  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-4">
          <Tabs value={newsTab} onValueChange={setNewsTab}>
            <TabsList className="w-full">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="deepfake">Deepfake</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {filteredNews.map((news) => (
          <Card key={news.id} className="hover:bg-accent/10 transition-colors">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src="" alt={news.author} />
                  <AvatarFallback>{news.authorAvatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{news.author}</span>
                    {news.verified && (
                      <span className="text-fakenik-blue">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <span className="text-muted-foreground text-sm">{news.handle}</span>
                    <span className="text-muted-foreground text-sm">· {news.timePosted}</span>
                  </div>
                  
                  <p className="mt-1 text-sm sm:text-base">{news.content}</p>
                  
                  {news.hasImage && (
                    <div className="mt-3 rounded-lg overflow-hidden border">
                      <img 
                        src={news.imageUrl} 
                        alt="News content" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex mt-3 justify-between text-muted-foreground">
                    <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{news.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs hover:text-green-500 transition-colors">
                      <Repeat className="h-3.5 w-3.5" />
                      <span>{news.shares}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs hover:text-red-500 transition-colors">
                      <Heart className="h-3.5 w-3.5" />
                      <span>{news.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-center py-4">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Load More News
          </Button>
        </div>
      </div>
    </>
  );
}
