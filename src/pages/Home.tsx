import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Shield, Award, MessageSquare, Heart, Share2, MessageCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        const {
          data,
          error
        } = await supabase.from('news').select('*').order('created_at', {
          ascending: false
        });
        if (error) {
          throw error;
        }
        setNewsItems(data || []);
      } catch (error: any) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error fetching news",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, [toast]);

  const handleLike = async (newsId: string, currentLikes: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like news items",
        variant: "destructive"
      });
      return;
    }
    try {
      const {
        error
      } = await supabase.from('news').update({
        likes: currentLikes + 1
      }).eq('id', newsId);
      if (error) {
        throw error;
      }
      setNewsItems(newsItems.map(item => item.id === newsId ? {
        ...item,
        likes: item.likes + 1
      } : item));
    } catch (error: any) {
      console.error('Error liking news:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return <div className="flex flex-col min-h-screen">
      <section className="relative py-20 px-4 md:py-32 overflow-hidden bg-gradient-to-br from-background to-accent bg-zinc-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Combat <span className="text-fakenik-blue">Deepfake Media</span> With Trustworthy Analysis
              </h1>
              <p className="text-xl text-muted-foreground">
                FakeniX helps detect, report, and track manipulated content to create a safer online environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/demo">
                  <Button size="lg" className="w-full sm:w-auto">
                    Try Detection Demo
                  </Button>
                </Link>
                <Link to="/report">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Report Deepfake
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-fakenik-blue/20 to-fakenik-teal/20 rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-violet-100">
                <img src="/lovable-uploads/af23f064-609a-4dce-baca-652d175a6cec.png" alt="Digital Security Shield" className="h-64 w-64 object-contain animate-float" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent bg-purple-100"></div>
      </section>

      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold">Latest News & Updates</h2>
            <Link to="/forum">
              <Button variant="outline">
                View All News
                <span className="sr-only">View all news</span>
              </Button>
            </Link>
          </div>

          {isLoading ? <div className="flex justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border-4 border-fakenik-blue/30 border-t-fakenik-blue animate-spin"></div>
                <p className="text-muted-foreground">Loading latest news...</p>
              </div>
            </div> : newsItems.length > 0 ? <div className="space-y-8">
              <div className="relative overflow-hidden rounded-xl">
                <div className="relative h-[400px] md:h-[500px] bg-black">
                  <img src={newsItems[0]?.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475"} alt={newsItems[0]?.title} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent bg-blue-200"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="mb-4">
                      <Badge className="bg-red-600 hover:bg-red-700">Breaking News</Badge>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{newsItems[0]?.title}</h3>
                    <p className="text-white/90 mb-4 line-clamp-2">{newsItems[0]?.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={newsItems[0]?.author_avatar} />
                          <AvatarFallback>{newsItems[0]?.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <span className="text-white text-sm font-medium">{newsItems[0]?.author}</span>
                            {newsItems[0]?.verified && <CheckCircle className="ml-1 h-3.5 w-3.5 text-fakenik-blue fill-white" />}
                          </div>
                          <span className="text-white/70 text-xs">@{newsItems[0]?.author_handle}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleLike(newsItems[0]?.id, newsItems[0]?.likes)} className="flex items-center gap-1 text-white/80 hover:text-white">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">{newsItems[0]?.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-white/80 hover:text-white">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs">{newsItems[0]?.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 text-white/80 hover:text-white">
                          <Share2 className="h-4 w-4" />
                          <span className="text-xs">{newsItems[0]?.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {newsItems.slice(1).map(news => <CarouselItem key={news.id} className="sm:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card className="overflow-hidden">
                            <div className="relative h-48">
                              <img src={news.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"} alt={news.title} className="w-full h-full object-cover" />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-black/70 text-white hover:bg-black/80">{news.category}</Badge>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h4 className="text-lg font-bold line-clamp-2 mb-2">{news.title}</h4>
                              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{news.content}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={news.author_avatar} />
                                    <AvatarFallback>{news.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex items-center">
                                    <span className="text-xs font-medium">{news.author}</span>
                                    {news.verified && <CheckCircle className="ml-1 h-3 w-3 text-fakenik-blue fill-background" />}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button onClick={() => handleLike(news.id, news.likes)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                    <Heart className="h-3 w-3" />
                                    <span className="text-xs">{news.likes}</span>
                                  </button>
                                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                    <MessageCircle className="h-3 w-3" />
                                    <span className="text-xs">{news.comments}</span>
                                  </button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>)}
                  </CarouselContent>
                  <div className="hidden sm:flex">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            </div> : <div className="flex justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No news items found</p>
              </div>
            </div>}
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How FakeniX Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform uses advanced technology to detect manipulated media and provides tools for reporting and tracking deepfakes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fakenik-blue/10 text-fakenik-blue mb-5">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Detect</h3>
                <p className="text-muted-foreground">
                  Upload suspicious media and let our AI analyze it for signs of manipulation with state-of-the-art detection.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fakenik-teal/10 text-fakenik-teal mb-5">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report</h3>
                <p className="text-muted-foreground">
                  Submit formal complaints for suspected deepfakes and help create accountability for manipulated content.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fakenik-blue/10 text-fakenik-blue mb-5">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track</h3>
                <p className="text-muted-foreground">
                  Monitor the status of your submissions with real-time updates on the review and resolution process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with others concerned about digital manipulation and stay informed about the latest deepfake threats.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fakenik-teal/10 text-fakenik-teal mb-5">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Discussion Forum</h3>
                <p className="text-muted-foreground mb-4">
                  Engage in moderated discussions about deepfake incidents, share knowledge, and learn from experts in the field.
                </p>
                <Link to="/forum">
                  <Button variant="outline" className="w-full h-10">Visit Forum</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-fakenik-blue/10 text-fakenik-blue mb-5">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
                <p className="text-muted-foreground mb-4">
                  Access guides, research, and tools to help you understand and identify manipulated media in your daily life.
                </p>
                <Link to="/resources">
                  <Button variant="outline" className="w-full h-10">Explore Resources</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-fakenik-blue/10 to-fakenik-teal/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who are already helping to combat deepfakes and create a more trustworthy online environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link to="/report">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Report Anonymously
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>;
}
