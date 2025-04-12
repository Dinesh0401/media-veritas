
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, ImageIcon, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import DemoResultCard from "@/components/demo/DemoResultCard";
import ImageUploader from "@/components/demo/ImageUploader";

export default function DetectionDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleFileChange = (uploadedFile: File | null) => {
    if (!uploadedFile) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    
    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    setPreviewUrl(url);
    setAnalysisResult(null);
  };
  
  const resetDemo = () => {
    setFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setAnalysisProgress(0);
  };
  
  const simulateAnalysis = async () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progressive analysis
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 300);
    
    try {
      // Simulate API call with 3-5 second delay
      await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
      
      // Generate a semi-random result for demo purposes
      // In a real implementation, this would be the result of an actual API call
      const isFake = Math.random() > 0.5;
      const confidenceScore = isFake 
        ? 70 + Math.floor(Math.random() * 25) 
        : 10 + Math.floor(Math.random() * 30);
      
      const result = {
        isFake,
        confidenceScore,
        analysisDate: new Date().toISOString(),
        detectedManipulations: isFake ? [
          "Face manipulation",
          "Inconsistent lighting",
          "Unnatural facial features"
        ].slice(0, 1 + Math.floor(Math.random() * 2)) : [],
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      };
      
      // Complete the progress bar
      clearInterval(interval);
      setAnalysisProgress(100);
      
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 500);
      
      // If user is logged in, save the result to their history
      if (user) {
        try {
          await supabase.from("detection_history").insert({
            user_id: user.id,
            result: result,
            image_name: file.name,
            is_fake: isFake,
            confidence_score: confidenceScore,
          });
        } catch (error) {
          console.error("Failed to save to history:", error);
        }
      }
      
    } catch (error) {
      clearInterval(interval);
      setIsAnalyzing(false);
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Deepfake Detection Demo</h1>
      <p className="text-muted-foreground mb-8">
        Upload an image to see how our detection technology works. 
        This demo uses simulated results for educational purposes.
      </p>
      
      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="demo">Try the Demo</TabsTrigger>
          <TabsTrigger value="learn">How It Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border overflow-hidden">
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[300px] flex flex-col items-center justify-center">
                {!previewUrl ? (
                  <ImageUploader onFileChange={handleFileChange} />
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-[300px] object-contain rounded-md"
                    />
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleFileChange(null)}
                      >
                        Change Image
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={resetDemo}
                  disabled={isAnalyzing || !file}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={simulateAnalysis}
                  disabled={isAnalyzing || !file}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[300px] flex flex-col">
                {isAnalyzing ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <Progress value={analysisProgress} className="w-full mb-4" />
                    <p className="text-center text-muted-foreground">
                      Analyzing image... {Math.round(analysisProgress)}%
                    </p>
                  </div>
                ) : analysisResult ? (
                  <DemoResultCard result={analysisResult} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                    <p>Upload and analyze an image to see the results here</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Note: This is a demonstration with simulated results. For actual deepfake detection, 
                  please use the full Report feature.
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="learn">
          <Card>
            <CardHeader>
              <CardTitle>How Our Detection Technology Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 py-4">
              <div>
                <h3 className="font-medium mb-2">Visual Inconsistency Detection</h3>
                <p className="text-muted-foreground">
                  Our algorithm analyzes minute details in images to detect inconsistencies that are 
                  invisible to the human eye, including lighting inconsistencies, unnatural facial features, 
                  and irregular shadow patterns.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Metadata Analysis</h3>
                <p className="text-muted-foreground">
                  We examine image metadata for signs of manipulation, looking for editing software artifacts 
                  and comparing the image against known deepfake patterns from our extensive database.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Neural Network Processing</h3>
                <p className="text-muted-foreground">
                  Our convolutional neural networks have been trained on millions of real and fake images, 
                  allowing them to identify even the most sophisticated deepfakes with high accuracy.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = "/resources"}>
                Learn More About Deepfake Detection
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
