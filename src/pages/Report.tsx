
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Info, CheckCircle2, AlertCircle } from "lucide-react";

export default function Report() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportData, setReportData] = useState({
    type: "",
    source: "",
    description: "",
    contact: "",
  });
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Generate random confidence score between 65-95 for demo
      const score = Math.floor(Math.random() * 31) + 65;
      setConfidenceScore(score);
      setIsAnalyzing(false);
      setStep(2);

      if (score > 80) {
        toast({
          title: "High probability of manipulation",
          description: `Our AI detected that this content is likely manipulated with ${score}% confidence.`,
          variant: "destructive",
        });
      } else if (score > 60) {
        toast({
          title: "Possible manipulation detected",
          description: `Our AI detected possible signs of manipulation with ${score}% confidence.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Low probability of manipulation",
          description: `Our AI detected low likelihood of manipulation with ${score}% confidence.`,
          variant: "default",
        });
      }
    }, 3000);
  };

  const handleSubmitReport = () => {
    if (!reportData.type || !reportData.description) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      
      toast({
        title: "Report submitted",
        description: "Your deepfake report has been submitted successfully.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Report Deepfake Content</h1>
          <p className="text-muted-foreground">
            Help combat misinformation by reporting suspected manipulated media
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-fakenik-blue text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>
                Upload & Analyze
              </span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-muted">
              <div 
                className="h-full bg-fakenik-blue" 
                style={{ width: `${step > 1 ? "100%" : "0%"}` }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-fakenik-blue text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>
                Report Details
              </span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-muted">
              <div 
                className="h-full bg-fakenik-blue" 
                style={{ width: `${step > 2 ? "100%" : "0%"}` }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? "bg-fakenik-blue text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-muted-foreground/30 rounded-lg mb-6">
                {fileUrl ? (
                  <div className="text-center">
                    {file?.type.startsWith("image/") ? (
                      <img
                        src={fileUrl}
                        alt="Uploaded media"
                        className="max-h-64 max-w-full mb-4 rounded-lg"
                      />
                    ) : file?.type.startsWith("video/") ? (
                      <video
                        src={fileUrl}
                        controls
                        className="max-h-64 max-w-full mb-4 rounded-lg"
                      />
                    ) : (
                      <div className="p-4 bg-muted rounded-lg mb-4">
                        Unsupported file type
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mb-2">
                      {file?.name} ({(file?.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFile(null);
                        setFileUrl(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload suspicious media</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                      Drag and drop or browse to upload images or videos for analysis.
                      We support JPG, PNG, MP4, and MOV files up to 50MB.
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*, video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-fakenik-blue text-white h-10 px-4 py-2"
                    >
                      Choose File
                    </Label>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg mb-6">
                <Info className="h-5 w-5 text-fakenik-blue flex-shrink-0" />
                <p className="text-sm">
                  Our AI will analyze the content for manipulations such as face swapping,
                  voice cloning, or other alterations. The higher the confidence score,
                  the more likely the content is manipulated.
                </p>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!file || isAnalyzing}
                  className="min-w-[120px]"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="mr-2">Analyzing</span>
                      <Progress value={50} className="w-12" />
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Analysis Results</h3>
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  {fileUrl && (
                    <div className="flex-shrink-0">
                      {file?.type.startsWith("image/") ? (
                        <img
                          src={fileUrl}
                          alt="Uploaded media"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        <video
                          src={fileUrl}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Manipulation confidence</span>
                      <span className="text-sm font-medium">{confidenceScore}%</span>
                    </div>
                    <Progress 
                      value={confidenceScore || 0} 
                      className="h-2 mb-2"
                      indicatorClassName={
                        (confidenceScore || 0) > 80 
                          ? "bg-fakenik-danger" 
                          : (confidenceScore || 0) > 60 
                          ? "bg-orange-500" 
                          : "bg-green-500"
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      {(confidenceScore || 0) > 80 
                        ? "High probability of manipulation" 
                        : (confidenceScore || 0) > 60 
                        ? "Possible manipulation detected" 
                        : "Low probability of manipulation"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium mb-2">Report Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type of Content</Label>
                  <Select
                    value={reportData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="face-swap">Face Swap</SelectItem>
                      <SelectItem value="voice-clone">Voice Clone</SelectItem>
                      <SelectItem value="full-body">Full Body Manipulation</SelectItem>
                      <SelectItem value="scene-manipulation">Scene Manipulation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="source">
                    Source URL (optional)
                  </Label>
                  <Input
                    id="source"
                    name="source"
                    placeholder="https://example.com/content"
                    value={reportData.source}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the suspected manipulated content and why you believe it's manipulated"
                    value={reportData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">
                    Contact Email (optional)
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    type="email"
                    placeholder="your@email.com"
                    value={reportData.contact}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll only use this to update you on your report status
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmitReport} 
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report Submitted Successfully</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Thank you for your contribution to combat deepfakes. Your report has been 
                  received and will be reviewed by our team.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-6 mx-auto max-w-md text-left">
                  <h4 className="font-medium mb-2">Report ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium">Status:</span> Pending Review
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Submitted:</span> {new Date().toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/track">Track Your Reports</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/report">Submit Another Report</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
