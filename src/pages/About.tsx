
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Shield, Check, AlertTriangle, BarChart3, Search, Lock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-fakenik-blue/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-fakenik-blue" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            FakeniX is dedicated to combating the spread of deepfakes by empowering individuals 
            and organizations with tools to detect, report, and track manipulated media.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/report">
              <Button size="lg">
                Report Deepfake
              </Button>
            </Link>
            <Link to="/forum">
              <Button variant="outline" size="lg">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Key Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">How We Combat Deepfakes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>Advanced Detection</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <p className="text-muted-foreground">
                  Our AI-powered system analyzes images and videos to identify signs of 
                  manipulation with high accuracy, helping users verify content authenticity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-fakenik-teal" />
                </div>
                <CardTitle>Reporting System</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <p className="text-muted-foreground">
                  Submit formal complaints against deepfake content through our streamlined reporting 
                  process that ensures appropriate action is taken.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>Transparent Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <p className="text-muted-foreground">
                  Monitor the status of reported content with our real-time tracking system, 
                  providing transparency throughout the review process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* About FakeniX */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About FakeniX</h2>
              <p className="text-muted-foreground mb-4">
                FakeniX was established in 2023 by a team of technologists, cybersecurity experts, 
                and digital rights advocates concerned about the rising threat of deepfake technology.
              </p>
              <p className="text-muted-foreground mb-4">
                Our platform combines cutting-edge AI detection methods with a community-driven 
                approach to create a comprehensive solution for identifying and addressing 
                manipulated media across the internet.
              </p>
              <p className="text-muted-foreground">
                We believe in creating a more trustworthy digital environment where people can 
                confidently distinguish between authentic and manipulated content.
              </p>
            </div>
            <div className="bg-gradient-to-br from-fakenik-blue/10 to-fakenik-teal/10 rounded-lg p-8 flex items-center justify-center">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-20 w-20 text-fakenik-blue" />
                </div>
                <div className="absolute top-1/4 right-1/4 h-24 w-24 bg-fakenik-teal/10 rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/4 h-32 w-32 bg-fakenik-blue/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-fakenik-blue" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
                <p className="text-muted-foreground">
                  We prioritize the accuracy of our detection systems to ensure reliable results
                  and avoid false positives.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-fakenik-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a collaborative environment where users can share knowledge and
                  work together to combat deepfakes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Lock className="h-6 w-6 text-fakenik-blue" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  We respect user privacy and maintain secure handling of all uploaded content
                  and personal information.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-fakenik-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Protection</h3>
                <p className="text-muted-foreground">
                  We are committed to protecting individuals from the harmful impacts of 
                  deepfakes and digital manipulation.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-br from-fakenik-blue/10 to-fakenik-teal/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Fight Against Deepfakes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Whether you're concerned about deepfakes, want to report manipulated content, 
            or wish to contribute to our community, FakeniX provides the tools and resources you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg">
                Create Free Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
