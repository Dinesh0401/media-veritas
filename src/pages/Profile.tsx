
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar, Shield, Loader, EditIcon } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, userDetails, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [creationDate, setCreationDate] = useState<string | null>(null);

  useEffect(() => {
    if (user?.created_at) {
      setCreationDate(format(new Date(user.created_at), 'MMMM dd, yyyy'));
    }
  }, [user]);

  const getInitials = (name: string) => {
    if (!name) return "FN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-fakenik-blue" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userDetails?.avatar_url} />
              <AvatarFallback className="text-lg">
                {getInitials(userDetails?.full_name || user.email || "")}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{userDetails?.full_name || "User"}</CardTitle>
            <CardDescription className="text-center">{user.email}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <Button variant="outline" className="w-full">
              <EditIcon className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
            <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={handleSignOut} disabled={isLoading}>
              {isLoading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : null}
              Sign Out
            </Button>
          </CardFooter>
        </Card>

        {/* User Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal information and account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-2">
              <User className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium">Full Name</p>
                <p className="text-muted-foreground">{userDetails?.full_name || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium">Account Created</p>
                <p className="text-muted-foreground">{creationDate || "Unknown"}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="font-medium">Account Status</p>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-muted-foreground">Active</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional account sections could be added here */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Report History</CardTitle>
            <CardDescription>Your deepfake detection reports and activities</CardDescription>
          </CardHeader>
          <CardContent>
            {/* This could be populated with actual report data */}
            <p className="text-muted-foreground">Your report history will appear here when you submit your first report.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Reports</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
