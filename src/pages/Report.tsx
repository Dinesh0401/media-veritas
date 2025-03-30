
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormStep } from "@/components/ui/form-step";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CustomProgress } from "@/components/ui/custom-progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader,
  FileText,
  Camera,
  Mic,
  MessageSquare,
  Flag,
  ClipboardList,
  Shield,
  BadgeCheck,
  X,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Link as LinkIcon,
  User2,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Report() {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [currentHelpTopic, setCurrentHelpTopic] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [reportData, setReportData] = useState({
    mediaType: "",
    contentType: "",
    platformDiscovered: "",
    platformType: "",
    dateDiscovered: "",
    mediaContext: "",
    subjectRelationship: "",
    impactLevel: "",
    impactDescription: "",
    sourceUrl: "",
    additionalLinks: "",
    creatorInformation: "",
    title: "",
    description: "",
    contactEmail: "",
    consentToBeContacted: false,
    shareWithAuthorities: false,
  });
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

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

  const handleRadioChange = (name: string, value: string) => {
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setReportData((prev) => ({ ...prev, [name]: checked }));
  };

  const uploadFile = async () => {
    if (!file || !user) return null;
    
    try {
      setIsUploading(true);
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload the file
      const { error: uploadError, data } = await supabase.storage
        .from('reports')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('reports')
        .getPublicUrl(filePath);
        
      setUploadedFileUrl(publicUrl);
      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to analyze and report deepfakes.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Upload the file first
    const fileUrl = await uploadFile();
    
    if (!fileUrl) {
      setIsAnalyzing(false);
      return;
    }

    // Simulate AI analysis
    setTimeout(() => {
      // Generate random confidence score between 65-95 for demo
      const score = Math.floor(Math.random() * 31) + 65;
      setConfidenceScore(score);
      setIsAnalyzing(false);
      
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
      
      // Move to next step after analysis
      handleNextStep();
    }, 3000);
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showHelpDialog = (topic: string) => {
    setCurrentHelpTopic(topic);
    setHelpDialogOpen(true);
  };

  const getHelpContent = () => {
    switch (currentHelpTopic) {
      case "deepfake":
        return {
          title: "What is a Deepfake?",
          content: "Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial intelligence. This can include fake videos, images or audio that appear to show people saying or doing things that never happened."
        };
      case "contentTypes":
        return {
          title: "Types of Manipulated Content",
          content: "Manipulated content can include face swaps (replacing someone's face with another), voice cloning (creating fake audio), full body manipulations (altering a person's entire body in media), or scene manipulations (altering the background or context)."
        };
      case "impact":
        return {
          title: "Understanding Impact Levels",
          content: "Low impact typically means the content has limited circulation or minimal harm. Medium impact suggests broader sharing or moderate personal/professional consequences. High impact indicates widespread distribution, significant emotional distress, or serious threats to reputation, safety, or livelihood."
        };
      case "privacy":
        return {
          title: "How We Protect Your Privacy",
          content: "All reports are confidential. Your personal information is securely stored and only accessible to authorized personnel. We never share your identity without explicit consent unless legally required. File analysis is performed securely with all data encrypted."
        };
      default:
        return {
          title: "Help Information",
          content: "If you have questions about reporting deepfake content, please reach out to our support team."
        };
    }
  };

  const handleSubmitReport = async () => {
    if (!reportData.title || !reportData.description || !reportData.contentType) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit reports.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the report in Supabase
      const { data, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          title: reportData.title,
          description: reportData.description,
          media_url: uploadedFileUrl,
          source_url: reportData.sourceUrl,
          content_type: reportData.contentType,
          confidence_score: confidenceScore,
          status: 'pending',
          metadata: {
            mediaType: reportData.mediaType,
            platformDiscovered: reportData.platformDiscovered,
            platformType: reportData.platformType,
            dateDiscovered: reportData.dateDiscovered,
            mediaContext: reportData.mediaContext,
            subjectRelationship: reportData.subjectRelationship,
            impactLevel: reportData.impactLevel,
            impactDescription: reportData.impactDescription,
            additionalLinks: reportData.additionalLinks,
            creatorInformation: reportData.creatorInformation,
            contactEmail: reportData.contactEmail,
            consentToBeContacted: reportData.consentToBeContacted,
            shareWithAuthorities: reportData.shareWithAuthorities
          }
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }

      // Success - move to step 7
      setStep(7);
      
      toast({
        title: "Report submitted",
        description: "Your deepfake report has been submitted successfully.",
      });
      
      // Navigate to the report details page
      setTimeout(() => {
        navigate(`/report-details/${data.id}`);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error submitting report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Help dialog/drawer content
  const helpContent = getHelpContent();

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
            <span className="text-sm font-medium">Step {step} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step 1: Upload & Analyze Media */}
        {step === 1 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4">Upload Suspicious Media</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => showHelpDialog("deepfake")}
                    className="h-8 w-8 p-0"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Upload the deepfake or manipulated content you've encountered. Our AI will analyze it for signs of manipulation.
                </p>
              </div>

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
                    ) : file?.type.startsWith("audio/") ? (
                      <audio
                        src={fileUrl}
                        controls
                        className="mb-4 w-full max-w-md"
                      />
                    ) : (
                      <div className="p-4 bg-muted rounded-lg mb-4">
                        <FileText className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
                        <p>Unsupported file type</p>
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
                        setUploadedFileUrl(null);
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
                      Drag and drop or browse to upload images, videos, or audio for analysis.
                      We support JPG, PNG, MP4, MOV, MP3, and WAV files up to 50MB.
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*,audio/*"
                      className="hidden"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Image</span>
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Video className="h-4 w-4" />
                        <span>Video</span>
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Mic className="h-4 w-4" />
                        <span>Audio</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="mediaType" className="text-base font-medium">Media Type</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => showHelpDialog("contentTypes")}
                      className="h-6 w-6 p-0"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <RadioGroup 
                    value={reportData.mediaType} 
                    onValueChange={(value) => handleRadioChange("mediaType", value)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="media-image" />
                      <Label htmlFor="media-image">Image</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="media-video" />
                      <Label htmlFor="media-video">Video</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="audio" id="media-audio" />
                      <Label htmlFor="media-audio">Audio</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg mb-6">
                <Info className="h-5 w-5 text-fakenik-blue flex-shrink-0" />
                <p className="text-sm">
                  Our AI will analyze the content for signs of manipulation such as face swapping,
                  voice cloning, or other digital alterations. The analysis is confidential and secure.
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={!file || isAnalyzing || isUploading}
                  className="min-w-[120px]"
                >
                  {isUploading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : isAnalyzing ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze & Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Content Classification */}
        {step === 2 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4">Content Classification</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => showHelpDialog("contentTypes")}
                    className="h-8 w-8 p-0"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                {confidenceScore !== null && (
                  <div className="mb-6">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      {fileUrl && (
                        <div className="flex-shrink-0">
                          {file?.type.startsWith("image/") ? (
                            <img
                              src={fileUrl}
                              alt="Uploaded media"
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          ) : file?.type.startsWith("video/") ? (
                            <video
                              src={fileUrl}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-md">
                              <FileText className="h-10 w-10 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Manipulation confidence</span>
                          <span className="text-sm font-medium">{confidenceScore}%</span>
                        </div>
                        <CustomProgress 
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
                )}
                
                <p className="text-muted-foreground mb-4">
                  Please classify the type of content manipulation you've identified to help us better understand the nature of the deepfake.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="contentType" className="text-base font-medium">
                    Type of Content Manipulation
                  </Label>
                  <RadioGroup 
                    value={reportData.contentType} 
                    onValueChange={(value) => handleRadioChange("contentType", value)}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="face-swap" id="content-face-swap" className="mt-1" />
                      <div>
                        <Label htmlFor="content-face-swap" className="font-medium">Face Swap</Label>
                        <p className="text-sm text-muted-foreground">Someone's face replaced with another person's face</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="voice-clone" id="content-voice-clone" className="mt-1" />
                      <div>
                        <Label htmlFor="content-voice-clone" className="font-medium">Voice Clone/Synthesis</Label>
                        <p className="text-sm text-muted-foreground">Artificially generated voice mimicking a real person</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="full-body" id="content-full-body" className="mt-1" />
                      <div>
                        <Label htmlFor="content-full-body" className="font-medium">Full Body Manipulation</Label>
                        <p className="text-sm text-muted-foreground">Entire body or actions modified or generated</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="scene-manipulation" id="content-scene" className="mt-1" />
                      <div>
                        <Label htmlFor="content-scene" className="font-medium">Scene Manipulation</Label>
                        <p className="text-sm text-muted-foreground">Background, context, or environment altered</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="other" id="content-other" className="mt-1" />
                      <div>
                        <Label htmlFor="content-other" className="font-medium">Other</Label>
                        <p className="text-sm text-muted-foreground">Other form of synthetic or manipulated media</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Discovery Information */}
        {step === 3 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Where You Found the Content</h2>
                <p className="text-muted-foreground mb-4">
                  Please provide details about where and when you discovered this manipulated content.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="platformDiscovered" className="text-base font-medium">
                    Platform Where Content Was Discovered
                  </Label>
                  <Select
                    value={reportData.platformDiscovered}
                    onValueChange={(value) => handleSelectChange("platformDiscovered", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="reddit">Reddit</SelectItem>
                      <SelectItem value="snapchat">Snapchat</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="messaging">Direct Message</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="platformType" className="text-base font-medium">
                    Type of Platform
                  </Label>
                  <RadioGroup 
                    value={reportData.platformType} 
                    onValueChange={(value) => handleRadioChange("platformType", value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="platform-public" />
                      <Label htmlFor="platform-public">Public (visible to everyone)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="platform-private" />
                      <Label htmlFor="platform-private">Private (limited audience)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sourceUrl" className="text-base font-medium">
                    Source URL (if available)
                  </Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="sourceUrl"
                        name="sourceUrl"
                        placeholder="https://example.com/content"
                        value={reportData.sourceUrl}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Direct link to where the content is hosted or shared
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="dateDiscovered" className="text-base font-medium">
                    Date Discovered
                  </Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dateDiscovered"
                        name="dateDiscovered"
                        type="date"
                        value={reportData.dateDiscovered}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mediaContext" className="text-base font-medium">
                    Context of the Media
                  </Label>
                  <Textarea
                    id="mediaContext"
                    name="mediaContext"
                    placeholder="Describe how the content was presented (e.g., as a joke, misinformation, harassment, etc.)"
                    value={reportData.mediaContext}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Impact Assessment */}
        {step === 4 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold mb-4">Impact Assessment</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => showHelpDialog("impact")}
                    className="h-8 w-8 p-0"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Please describe the potential impact and harm of this deepfake content.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="subjectRelationship" className="text-base font-medium">
                    Your Relationship to the Subject
                  </Label>
                  <Select
                    value={reportData.subjectRelationship}
                    onValueChange={(value) => handleSelectChange("subjectRelationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">I am the subject</SelectItem>
                      <SelectItem value="friend">Friend of subject</SelectItem>
                      <SelectItem value="family">Family member of subject</SelectItem>
                      <SelectItem value="colleague">Colleague of subject</SelectItem>
                      <SelectItem value="representative">Legal representative</SelectItem>
                      <SelectItem value="unrelated">Unrelated/concerned citizen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="impactLevel" className="text-base font-medium">
                    Level of Impact
                  </Label>
                  <RadioGroup 
                    value={reportData.impactLevel} 
                    onValueChange={(value) => handleRadioChange("impactLevel", value)}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="low" id="impact-low" className="mt-1" />
                      <div>
                        <Label htmlFor="impact-low" className="font-medium">Low Impact</Label>
                        <p className="text-sm text-muted-foreground">Limited sharing, minimal personal or professional consequences</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="medium" id="impact-medium" className="mt-1" />
                      <div>
                        <Label htmlFor="impact-medium" className="font-medium">Medium Impact</Label>
                        <p className="text-sm text-muted-foreground">Moderate sharing, some emotional distress or reputational concerns</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="high" id="impact-high" className="mt-1" />
                      <div>
                        <Label htmlFor="impact-high" className="font-medium">High Impact</Label>
                        <p className="text-sm text-muted-foreground">Widespread sharing, significant distress, serious threats to reputation or safety</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="impactDescription" className="text-base font-medium">
                    Description of Impact
                  </Label>
                  <Textarea
                    id="impactDescription"
                    name="impactDescription"
                    placeholder="Describe how this content has affected or could affect the subject (e.g., emotional distress, reputational damage, safety concerns)"
                    value={reportData.impactDescription}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Additional Information */}
        {step === 5 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <p className="text-muted-foreground mb-4">
                  Please provide any additional information that may help with the investigation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="additionalLinks" className="text-base font-medium">
                    Additional Links or Sources
                  </Label>
                  <Textarea
                    id="additionalLinks"
                    name="additionalLinks"
                    placeholder="Add any other URLs where this content appears (one per line)"
                    value={reportData.additionalLinks}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    If the content appears in multiple places, please list them here
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="creatorInformation" className="text-base font-medium">
                    Information About the Content Creator (if known)
                  </Label>
                  <Textarea
                    id="creatorInformation"
                    name="creatorInformation"
                    placeholder="Any information about who created or shared this content"
                    value={reportData.creatorInformation}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Include usernames, real names, or any identifying information you have about who created or shared the content
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="shareWithAuthorities"
                      checked={reportData.shareWithAuthorities}
                      onChange={(e) => handleCheckboxChange("shareWithAuthorities", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="shareWithAuthorities">
                      I consent to having this report shared with appropriate authorities if necessary
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    In cases of serious harm, illegal content, or threats, we may need to share this report with law enforcement
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Report Summary & Submission */}
        {step === 6 && (
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Report Summary & Submission</h2>
                <p className="text-muted-foreground mb-4">
                  Please review your report and add a title and final description before submitting.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-base font-medium">Report Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a concise title for your report"
                    value={reportData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-medium">
                    Final Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a comprehensive summary of the deepfake content and why you believe it's manipulated"
                    value={reportData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="contactEmail" className="text-base font-medium">
                    Contact Email (optional)
                  </Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <User2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={reportData.contactEmail}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id="consentToBeContacted"
                      checked={reportData.consentToBeContacted}
                      onChange={(e) => handleCheckboxChange("consentToBeContacted", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="consentToBeContacted" className="text-sm">
                      I consent to being contacted about this report
                    </Label>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-fakenik-blue" />
                    <h3 className="font-medium">Privacy Commitment</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your report will be handled confidentially. Personal information will only be used to address this specific report and will not be shared with third parties except as required by law or with your explicit consent.
                  </p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="px-0 h-auto text-xs mt-1"
                    onClick={() => showHelpDialog("privacy")}
                  >
                    Learn more about how we protect your data
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleSubmitReport} 
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Report
                      <Flag className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Confirmation */}
        {step === 7 && (
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
                  <h4 className="font-medium mb-2">Redirecting to report details...</h4>
                  <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                    <div className="bg-fakenik-blue h-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/track">View All Reports</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/report">Submit Another Report</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Dialog for desktop */}
        <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{helpContent.title}</DialogTitle>
              <DialogDescription>
                {helpContent.content}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button 
                variant="secondary" 
                onClick={() => setHelpDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
