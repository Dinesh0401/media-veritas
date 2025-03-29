
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { AlertTriangle, Clock, Eye, MessageCircle, Search } from "lucide-react";
import { DiscussionProps } from "../types";

interface DiscussionListProps {
  sortedDiscussions: DiscussionProps[];
  getCategoryColor: (category: string) => string;
  clearFilters: () => void;
}

export default function DiscussionList({ 
  sortedDiscussions, 
  getCategoryColor,
  clearFilters 
}: DiscussionListProps) {
  return (
    <>
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
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </>
  );
}
