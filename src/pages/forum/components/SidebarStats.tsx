
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  MessageCircle, 
  Shield, 
  BarChart2, 
  Image, 
  Video, 
  UserCircle, 
  ThumbsUp, 
  CheckCircle 
} from "lucide-react";

interface SidebarStatsProps {
  trendingTags: string[];
}

export default function SidebarStats({ trendingTags }: SidebarStatsProps) {
  return (
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
          <CardTitle>Latest AI Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <Image className="h-4 w-4 mt-1 text-fakenik-blue" />
              <div>
                <p className="text-sm">New AI model achieves 94% accuracy in detecting synthetic images</p>
                <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <Video className="h-4 w-4 mt-1 text-fakenik-teal" />
              <div>
                <p className="text-sm">Researchers develop algorithm to identify deepfake videos in real-time</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserCircle className="h-4 w-4 mt-1 text-fakenik-blue" />
              <div>
                <p className="text-sm">New legislation proposed to regulate AI-generated content</p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full text-sm">View All Updates</Button>
        </CardFooter>
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
  );
}
