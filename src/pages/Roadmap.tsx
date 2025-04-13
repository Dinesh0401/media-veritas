
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Image, Video, Award, FileText, ImageIcon, Languages, Accessibility, 
  Smartphone, Link, BarChart3, GraduationCap, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomProgress } from "@/components/ui/custom-progress";
import { useState } from "react";

const featureCategories = [
  { id: "all", name: "All Features" },
  { id: "detection", name: "Detection" },
  { id: "community", name: "Community" },
  { id: "analytics", name: "Analytics" },
  { id: "accessibility", name: "Accessibility" },
  { id: "mobile", name: "Mobile" },
  { id: "enterprise", name: "Enterprise" }
];

interface FeatureData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "planned" | "in-progress" | "completed";
  progressPercent: number;
  category: string[];
  components: string[];
  timeline: string;
  techStack: string[];
}

export default function Roadmap() {
  const [activeCategory, setActiveCategory] = useState("all");

  const features: FeatureData[] = [
    {
      id: 1,
      title: "Interactive Real-Time Deepfake Scanner Widget",
      description: "Drag-and-drop or URL input for images/videos with WebSocket-powered live analysis updates and animated confidence gauge.",
      icon: <Image className="h-8 w-8 text-blue-500" />,
      status: "in-progress",
      progressPercent: 65,
      category: ["detection"],
      components: [
        "Drag-and-drop file uploader",
        "URL input validator",
        "WebSocket connection handler",
        "Animated confidence meter",
        "Results panel"
      ],
      timeline: "Q2 2025",
      techStack: ["React", "WebSockets", "TensorFlow.js", "Canvas API"]
    },
    {
      id: 2,
      title: "Trust Score Gamification & Leaderboard",
      description: "Points awarded for reporting, forum contributions, and verifications with public leaderboard and achievement badges.",
      icon: <Award className="h-8 w-8 text-amber-500" />,
      status: "planned",
      progressPercent: 20,
      category: ["community"],
      components: [
        "Point scoring system",
        "Achievement badges (Deepfake Hunter, Forum Champion)",
        "Public leaderboard",
        "User profiles with achievements"
      ],
      timeline: "Q3 2025",
      techStack: ["React", "Supabase", "Realtime DB", "Redux"]
    },
    {
      id: 3,
      title: "AI-Generated Explainable Reports",
      description: "Heatmap overlays highlighting anomalies with human-readable bullet explanations and downloadable PDF reports.",
      icon: <FileText className="h-8 w-8 text-green-500" />,
      status: "planned",
      progressPercent: 35,
      category: ["detection", "analytics"],
      components: [
        "Grad-CAM visualization layer",
        "Explanation generator",
        "PDF report builder",
        "Sharing options"
      ],
      timeline: "Q2 2025",
      techStack: ["React", "TensorFlow.js", "pdfmake", "Canvas API"]
    },
    {
      id: 4,
      title: "Immersive Storytelling & Case Studies",
      description: "Multimedia gallery with interactive maps and timelines showcasing notable deepfake cases and their impacts.",
      icon: <ImageIcon className="h-8 w-8 text-purple-500" />,
      status: "planned",
      progressPercent: 10,
      category: ["community"],
      components: [
        "Hall of Fame & Shame gallery",
        "Interactive timeline component",
        "Geographic map visualization",
        "Case study content manager"
      ],
      timeline: "Q4 2025",
      techStack: ["React", "Leaflet/MapBox", "React-Timeline", "Headless CMS"]
    },
    {
      id: 5,
      title: "Multilingual Support & Localized News Feed",
      description: "i18n implementation with geo-detected localized deepfake news via RSS aggregation.",
      icon: <Languages className="h-8 w-8 text-red-500" />,
      status: "planned",
      progressPercent: 5,
      category: ["accessibility", "community"],
      components: [
        "Language switcher",
        "Translated interface elements",
        "Geo-detection service",
        "RSS feed aggregator and parser"
      ],
      timeline: "Q1 2026",
      techStack: ["React-i18next", "Geo-location API", "RSS Parser"]
    },
    {
      id: 6,
      title: "Accessibility & Inclusive Design",
      description: "WCAG 2.1 compliance with high-contrast mode, keyboard navigation, and voice command integration.",
      icon: <Accessibility className="h-8 w-8 text-teal-500" />,
      status: "planned",
      progressPercent: 15,
      category: ["accessibility"],
      components: [
        "Accessibility audit and compliance fixes",
        "High-contrast theme",
        "Keyboard navigation handlers",
        "Voice command processor"
      ],
      timeline: "Q3 2025",
      techStack: ["ARIA", "Web Speech API", "Color Contrast APIs", "Focus Trap"]
    },
    {
      id: 7,
      title: "Mobile App Companion & PWA",
      description: "Service worker for offline scans, push notifications, and simplified mobile UI with quick-access tabs.",
      icon: <Smartphone className="h-8 w-8 text-indigo-500" />,
      status: "planned",
      progressPercent: 25,
      category: ["mobile"],
      components: [
        "Service worker configuration",
        "Push notification system",
        "Mobile-optimized UI",
        "Offline detection capabilities"
      ],
      timeline: "Q4 2025",
      techStack: ["PWA", "Service Workers", "Push API", "Capacitor"]
    },
    {
      id: 8,
      title: "Social & Enterprise Integrations",
      description: "Browser extension for one-click scanning on any webpage and public API with SDKs for enterprise integration.",
      icon: <Link className="h-8 w-8 text-blue-700" />,
      status: "planned",
      progressPercent: 5,
      category: ["enterprise"],
      components: [
        "Browser extension (Chrome, Firefox, Edge)",
        "Public API documentation",
        "SDK packages for Node.js and Python",
        "Enterprise dashboard"
      ],
      timeline: "Q2 2026",
      techStack: ["WebExtensions API", "RESTful API", "SDK Generators", "OAuth"]
    },
    {
      id: 9,
      title: "Real-Time Analytics & Monitoring Dashboard",
      description: "Event streaming feeding React-based charts with admin views for scans/hour, geographic heatmaps, and AI performance.",
      icon: <BarChart3 className="h-8 w-8 text-orange-500" />,
      status: "in-progress",
      progressPercent: 45,
      category: ["analytics", "enterprise"],
      components: [
        "Real-time data pipeline",
        "Interactive visualization components",
        "Admin dashboard",
        "Performance metrics tracking"
      ],
      timeline: "Q3 2025",
      techStack: ["Redis/Kafka", "WebSockets", "Recharts", "D3.js"]
    },
    {
      id: 10,
      title: "Community & Education Hub",
      description: "Built-in Learning Management System with interactive quizzes, certificates, legal guidelines, and tutorials.",
      icon: <GraduationCap className="h-8 w-8 text-emerald-500" />,
      status: "planned",
      progressPercent: 10,
      category: ["community", "enterprise"],
      components: [
        "Course content management",
        "Quiz engine",
        "PDF certificate generator",
        "Progress tracking"
      ],
      timeline: "Q1 2026",
      techStack: ["React", "LMS API", "PDF Generation", "Gamification Elements"]
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "planned": return "bg-amber-100 text-amber-800 border-amber-300";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getProgressColor = (status: string) => {
    switch(status) {
      case "planned": return "bg-amber-500";
      case "in-progress": return "bg-blue-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const filteredFeatures = activeCategory === "all" 
    ? features 
    : features.filter(feature => feature.category.includes(activeCategory));

  return (
    <div className="container py-12 mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">FakeniX Product Roadmap</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Our vision for building the next-generation deepfake detection platform
        </p>
        <div className="flex justify-center">
          <Badge variant="outline" className="text-md px-4 py-2 border-2 border-fakenik-blue text-fakenik-blue">
            Last updated: April 2025
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2">
            {featureCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="px-4 py-2"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredFeatures.map(feature => (
              <Card key={feature.id} className="overflow-hidden border-2 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-background border">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={`capitalize ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{feature.progressPercent}%</span>
                    </div>
                    <CustomProgress 
                      value={feature.progressPercent} 
                      className="h-2"
                      indicatorClassName={getProgressColor(feature.status)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">Timeline</p>
                      <p>{feature.timeline}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">Categories</p>
                      <div className="flex flex-wrap gap-1">
                        {feature.category.map(cat => (
                          <Badge key={cat} variant="outline" className="capitalize">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Key Components</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {feature.components.slice(0, 3).map((component, idx) => (
                        <li key={idx} className="text-muted-foreground">{component}</li>
                      ))}
                      {feature.components.length > 3 && (
                        <li className="text-muted-foreground">
                          +{feature.components.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 pt-3 pb-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-wrap gap-2">
                      {feature.techStack.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
