
import { Shield, Link as LinkIcon, Lock, Server, Database, Share2, FileDigit, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function VerificationTechnology() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-fakenik-blue/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-fakenik-blue" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Immutable Evidence Ledger & Verifiable Watermarking</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            FakeniX's patentable technology combines blockchain-based evidence hashing, verifiable watermarking, 
            and federated learning to create legally admissible media provenance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/report">
              <Button size="lg">
                Submit Media for Verification
              </Button>
            </Link>
            <Link to="/verify">
              <Button variant="outline" size="lg">
                Verify Media
              </Button>
            </Link>
          </div>
        </div>
        
        {/* System Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">System Architecture</h2>
          <div className="bg-muted rounded-lg p-8 mb-8 relative overflow-hidden">
            {/* Simplified Architecture Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center bg-background p-4 rounded-lg shadow-sm">
                <div className="bg-fakenik-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FileDigit className="h-8 w-8 text-fakenik-blue" />
                </div>
                <h3 className="font-semibold mb-2">Media Ingestion & Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Media is uploaded, analyzed by AI detection algorithms, and prepared for verification
                </p>
                <div className="mt-auto pt-4">
                  <Clock className="h-5 w-5 mx-auto text-muted-foreground" />
                  <p className="text-xs mt-1 text-muted-foreground">Step 1</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center bg-background p-4 rounded-lg shadow-sm">
                <div className="bg-fakenik-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-8 w-8 text-fakenik-teal" />
                </div>
                <h3 className="font-semibold mb-2">Blockchain Ledger & Watermarking</h3>
                <p className="text-sm text-muted-foreground">
                  Media hash is recorded on blockchain and an invisible watermark with transaction ID is embedded
                </p>
                <div className="mt-auto pt-4">
                  <Clock className="h-5 w-5 mx-auto text-muted-foreground" />
                  <p className="text-xs mt-1 text-muted-foreground">Step 2</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center bg-background p-4 rounded-lg shadow-sm">
                <div className="bg-fakenik-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-fakenik-blue" />
                </div>
                <h3 className="font-semibold mb-2">Verification & Certification</h3>
                <p className="text-sm text-muted-foreground">
                  Media can be verified by extracting watermark and comparing blockchain records for authenticity
                </p>
                <div className="mt-auto pt-4">
                  <Clock className="h-5 w-5 mx-auto text-muted-foreground" />
                  <p className="text-xs mt-1 text-muted-foreground">Step 3</p>
                </div>
              </div>
            </div>
            
            {/* Connecting arrows */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/6 h-px bg-muted-foreground/30 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/6 h-px bg-muted-foreground/30 transform -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* Key Technologies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Key Technologies</h2>
          <div className="grid grid-cols-1 gap-8">
            {/* On-Chain Evidence Hashing */}
            <Card>
              <CardHeader>
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <LinkIcon className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>On-Chain Evidence Hashing</CardTitle>
                <CardDescription>Immutable blockchain records of media analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Every uploaded media file undergoes SHA-256 hashing along with its AI analysis report.
                    This cryptographic hash is then recorded on a permissioned blockchain with a
                    timestamped transaction, ensuring an immutable record of the original content and analysis.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Technical Specifications</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>SHA-256 cryptographic hashing</li>
                        <li>Hyperledger Fabric permissioned blockchain</li>
                        <li>Quantum-resistant digital signatures</li>
                        <li>Tamper-evident transaction logs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Legal Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Court-admissible evidence trail</li>
                        <li>Timestamped proof of existence</li>
                        <li>Auditable chain of custody</li>
                        <li>Non-repudiation capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Verifiable Watermarking */}
            <Card>
              <CardHeader>
                <div className="bg-fakenik-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-fakenik-teal" />
                </div>
                <CardTitle>Verifiable Watermarking</CardTitle>
                <CardDescription>Cryptographic content origin verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    FakeniX embeds an imperceptible, AI-generated watermark into media before returning it 
                    to the user. This watermark encodes the blockchain transaction ID and key analysis results, 
                    providing a public extraction API so third parties can verify the watermark and link the media 
                    back to its on-chain record.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Watermark Features</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Perceptually invisible embedding</li>
                        <li>Resilient to compression and editing</li>
                        <li>Encodes blockchain transaction IDs</li>
                        <li>Multi-format support (image, video, audio)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Verification Process</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Public extraction API for authorities</li>
                        <li>One-click verification tool</li>
                        <li>Chain-of-custody visualization</li>
                        <li>Expert witness report generation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Federated Detection Network */}
            <Card>
              <CardHeader>
                <div className="bg-fakenik-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-fakenik-blue" />
                </div>
                <CardTitle>Federated Detection Network</CardTitle>
                <CardDescription>Collaborative AI model training with model provenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our federated learning network allows multiple organizations to contribute to model training 
                    without sharing raw data. Each node's model updates are digitally signed and recorded on the 
                    blockchain to ensure transparent, tamper-proof model evolution and ownership tracking.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Privacy Preservation</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Zero-knowledge proof verification</li>
                        <li>Differential privacy guarantees</li>
                        <li>Private federated learning protocols</li>
                        <li>Granular access control policies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Network Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Rapid detection model improvements</li>
                        <li>Cross-organizational collaboration</li>
                        <li>Transparent model provenance</li>
                        <li>High-confidence detection results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Legal & Compliance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Legal & Compliance Considerations</h2>
          <div className="bg-muted rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Evidentiary Standards</h3>
                <p className="text-muted-foreground mb-4">
                  FakeniX's verification system is designed to meet rigorous evidentiary standards required 
                  by courts worldwide, providing cryptographic proof of media authenticity that can withstand 
                  legal scrutiny.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Chain of custody documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Expert witness support materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Technical validation reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Digital signature verification</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Privacy & Access Controls</h3>
                <p className="text-muted-foreground mb-4">
                  Our system implements robust privacy-preserving measures and granular access controls 
                  for the blockchain ledger, ensuring compliance with global data protection regulations 
                  while maintaining security.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">GDPR and CCPA compliant processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Role-based access control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Data minimization techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Secure multi-party computation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Verification Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Verification Process</h2>
          <Card>
            <CardHeader>
              <CardTitle>How Media Verification Works</CardTitle>
              <CardDescription>
                Experience the step-by-step verification process used by FakeniX to ensure media authenticity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <ol className="relative border-l border-muted-foreground/20">
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-fakenik-blue/10 rounded-full -left-4 ring-4 ring-background">
                      <span className="text-fakenik-blue font-medium">1</span>
                    </span>
                    <h3 className="font-semibold mb-1">Media Submission</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Media is uploaded to the platform through secure channels and processed by our AI detection algorithms
                    </p>
                    <Link to="/report" className="text-sm text-fakenik-blue hover:underline inline-flex items-center">
                      Submit Media
                      <svg className="w-3 h-3 ml-1" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 14 10">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </Link>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-fakenik-blue/10 rounded-full -left-4 ring-4 ring-background">
                      <span className="text-fakenik-blue font-medium">2</span>
                    </span>
                    <h3 className="font-semibold mb-1">Blockchain Registration</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      A cryptographic hash of the media and analysis report is created and recorded on our permissioned blockchain
                    </p>
                    <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      SHA256: e7d81afc7b0a0f765760fb332798c4f87eb4f3124379eb5843165c7c79700126
                    </span>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-fakenik-blue/10 rounded-full -left-4 ring-4 ring-background">
                      <span className="text-fakenik-blue font-medium">3</span>
                    </span>
                    <h3 className="font-semibold mb-1">Watermark Embedding</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      An imperceptible watermark containing the blockchain transaction ID is embedded in the media
                    </p>
                    <div className="p-2 bg-background border rounded-md flex gap-2 items-center text-xs">
                      <Lock className="h-4 w-4 text-fakenik-teal" />
                      <span className="font-mono">TX: 0xf7b8c49d2e991f3...</span>
                    </div>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-fakenik-blue/10 rounded-full -left-4 ring-4 ring-background">
                      <span className="text-fakenik-blue font-medium">4</span>
                    </span>
                    <h3 className="font-semibold mb-1">Verification</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Media can be verified at any time by extracting the watermark and validating against blockchain records
                    </p>
                    <Link to="/verify" className="text-sm text-fakenik-blue hover:underline inline-flex items-center">
                      Verify Media
                      <svg className="w-3 h-3 ml-1" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 14 10">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </Link>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-br from-fakenik-blue/10 to-fakenik-teal/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Implement FakeniX's Patentable Technology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join the growing network of organizations using FakeniX's immutable evidence ledger and 
            verifiable watermarking technology to combat deepfakes and ensure media authenticity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg">
                Request Implementation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Our Experts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
