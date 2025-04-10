import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Shield, 
  Check, 
  AlertTriangle, 
  BarChart3, 
  Search, 
  Lock, 
  Users, 
  Fingerprint, 
  Database, 
  Layers, 
  Network, 
  LineChart 
} from "lucide-react";
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
          <h1 className="text-4xl font-bold mb-4">Advanced Deepfake Detection Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            FakeniX combines breakthrough technologies to detect, track, and mitigate deepfake media
            across platforms, offering proprietary verification methods, attribution tracking, and
            comprehensive protection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/report">
              <Button size="lg">
                Report Deepfake
              </Button>
            </Link>
            <Link to="/verification-technology">
              <Button variant="outline" size="lg">
                Explore Verification Technology
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Core Innovations Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Core Innovations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Fingerprint className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>Multi-Modal Trust Verification</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Proprietary system combining digital fingerprinting, blockchain-based provenance tracking, 
                  temporal consistency analysis, and our patent-pending Trust Score Generator.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-fakenik-teal" />
                </div>
                <CardTitle>Neural Watermarking Defense</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Our invisible neural watermarking technology embeds imperceptible signatures that survive 
                  compression and manipulation, with specialized extraction algorithms and countermeasure generation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>Behavioral Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Advanced analysis of micro-expressions, physiological consistency verification, and 
                  environmental physics validation to detect unnatural elements in manipulated media.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-fakenik-teal" />
                </div>
                <CardTitle>Adaptive Deepfake Resilience</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Self-improving system with adversarial training networks, distributed detection consensus, 
                  and temporal detection memory to build immunity against evolving deepfake techniques.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border hover:shadow-md transition-shadow col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>Cross-Platform Tracking & Attribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Cutting-edge technology for manipulation signature identification, propagation network mapping, 
                  and statistical attribution confidence scoring to determine deepfake origins and track spread.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* User Journey Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">User Journey</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-2">Content Protection</h3>
                <p className="text-muted-foreground mb-4">
                  Content creators can register original works to receive digital fingerprints, 
                  apply neural watermarking protection, and obtain blockchain-registered authenticity certificates.
                </p>
              </div>
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-2">Deepfake Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Upload suspicious media for multi-layer analysis using our five proprietary technologies, 
                  receive detailed reports with visualization of detected anomalies, and submit structured complaints.
                </p>
              </div>
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-2">Attribution & Intelligence</h3>
                <p className="text-muted-foreground">
                  Access personal media monitoring, global threat intelligence, deepfake source analysis, 
                  and interact with spread visualization showing content propagation across platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* About FakeniX */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Technical Excellence</h2>
              <p className="text-muted-foreground mb-4">
                FakeniX is built with cutting-edge technologies including Python/Django REST Framework
                and React.js, with a distributed systems architecture designed for high performance 
                and scalability.
              </p>
              <p className="text-muted-foreground mb-4">
                Our AI and machine learning pipeline combines ensemble models with proprietary 
                feature extraction layers for behavioral anomaly detection, supported by distributed
                training and continual learning capabilities.
              </p>
              <p className="text-muted-foreground">
                We maintain strict performance standards with &lt;3s response times for standard analysis,
                &gt;98% detection accuracy, and comprehensive security measures including SOC2 compliance
                and GDPR-ready data handling.
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
                  We achieve &gt;98% detection rate with &lt;0.5% false positives through our 
                  multi-layered proprietary technologies.
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
                  We foster research collaboration and threat intelligence sharing through
                  our Community Defense forum.
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
                  We implement zero-knowledge verification options and encrypted processing
                  to preserve content confidentiality.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-fakenik-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously develop patentable technologies and improve our systems
                  to combat evolving deepfake threats.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* New Verification Technology Highlight */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-fakenik-blue/5 to-fakenik-teal/5">
            <CardHeader>
              <CardTitle className="text-2xl">Immutable Evidence Ledger</CardTitle>
              <CardDescription>
                Our patentable blockchain-based verification system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-2/3">
                  <p className="text-muted-foreground mb-4">
                    FakeniX now features our revolutionary Immutable Evidence Ledger and Verifiable Watermarking 
                    system, combining blockchain technology with advanced watermarking to create legally admissible 
                    media provenance solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Link to="/verification-technology">
                      <Button>
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/3 bg-muted p-6 rounded-lg">
                  <div className="flex flex-col items-center text-center gap-4">
                    <Shield className="h-12 w-12 text-fakenik-blue" />
                    <div>
                      <h4 className="font-medium mb-1">Blockchain-Powered</h4>
                      <p className="text-sm text-muted-foreground">
                        Cryptographically secure verification for legal and investigative use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-br from-fakenik-blue/10 to-fakenik-teal/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Fight Against Deepfakes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Whether you're a content creator seeking protection, a platform concerned about manipulated media,
            or a researcher interested in deepfake detection, FakeniX provides the advanced tools and resources you need.
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
