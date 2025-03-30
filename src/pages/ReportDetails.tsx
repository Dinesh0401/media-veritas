
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Download, 
  FileText, 
  Loader, 
  BarChart3, 
  Share2, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CustomProgress } from "@/components/ui/custom-progress";
import ReportStats from "@/components/ReportStats";

export default function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReportDetails() {
      if (!id) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        setReport(data);
      } catch (error: any) {
        console.error('Error fetching report details:', error);
        toast({
          title: "Error loading report",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchReportDetails();
  }, [id, toast]);

  const handleGeneratePdf = () => {
    // In a real implementation, this would connect to a backend service to generate a PDF
    setIsGeneratingPdf(true);
    
    // Mock PDF generation
    setTimeout(() => {
      setIsGeneratingPdf(false);
      toast({
        title: "PDF Generated",
        description: "Your report statement has been generated with a unique QR code.",
      });
    }, 2000);
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "resolved":
        return { 
          color: "bg-green-100 text-green-800", 
          icon: <CheckCircle className="h-4 w-4 mr-1" />
        };
      case "in-review":
        return { 
          color: "bg-blue-100 text-blue-800", 
          icon: <Clock className="h-4 w-4 mr-1" /> 
        };
      case "pending":
        return { 
          color: "bg-yellow-100 text-yellow-800", 
          icon: <Clock className="h-4 w-4 mr-1" /> 
        };
      case "rejected":
        return { 
          color: "bg-red-100 text-red-800", 
          icon: <AlertTriangle className="h-4 w-4 mr-1" /> 
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-800", 
          icon: <FileText className="h-4 w-4 mr-1" /> 
        };
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-fakenik-blue" />
          <p className="text-muted-foreground">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="py-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Not Found</h3>
              <p className="text-muted-foreground mb-6">
                The report you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Button onClick={() => navigate("/track")}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { color, icon } = getStatusDetails(report.status);
  const formattedDate = new Date(report.created_at).toLocaleDateString();
  const formattedTime = new Date(report.created_at).toLocaleTimeString();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/track")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{report.title}</CardTitle>
                    <CardDescription>Report ID: {report.id}</CardDescription>
                  </div>
                  <Badge className={`${color} flex items-center gap-1 capitalize`}>
                    {icon}
                    {report.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {report.media_url && (
                    <div className="rounded-md overflow-hidden">
                      {report.content_type?.includes('image') ? (
                        <img 
                          src={report.media_url} 
                          alt="Reported media" 
                          className="w-full object-cover"
                        />
                      ) : report.content_type?.includes('video') ? (
                        <video 
                          src={report.media_url} 
                          controls 
                          className="w-full"
                        />
                      ) : null}
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{report.description}</p>
                  </div>

                  {report.source_url && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Source</h3>
                      <a 
                        href={report.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-fakenik-blue hover:underline"
                      >
                        {report.source_url}
                      </a>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">AI Analysis Results</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Manipulation confidence</span>
                          <span className="text-sm font-medium">{report.confidence_score}%</span>
                        </div>
                        <CustomProgress 
                          value={report.confidence_score || 0} 
                          className="h-2 mb-2"
                          indicatorClassName={
                            (report.confidence_score || 0) > 80 
                              ? "bg-fakenik-danger" 
                              : (report.confidence_score || 0) > 60 
                              ? "bg-orange-500" 
                              : "bg-green-500"
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          {(report.confidence_score || 0) > 80 
                            ? "High probability of manipulation" 
                            : (report.confidence_score || 0) > 60 
                            ? "Possible manipulation detected" 
                            : "Low probability of manipulation"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 w-4 text-fakenik-blue" />
                            <span className="text-sm font-medium">Content Type</span>
                          </div>
                          <p className="text-sm">{report.content_type}</p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-fakenik-blue" />
                            <span className="text-sm font-medium">Submitted</span>
                          </div>
                          <p className="text-sm">{formattedDate} at {formattedTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full"
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf}
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate Statement
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setShowStats(!showStats)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  {showStats ? "Hide Statistics" : "View Statistics"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submitted By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {user?.email?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.email}</p>
                    <p className="text-sm text-muted-foreground">Verified Reporter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Official Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  {report.status === "resolved" ? (
                    <>
                      <div className="bg-green-100 p-2 rounded-full mb-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-center mb-1 font-medium">Verified by Indian Government</p>
                      <p className="text-xs text-muted-foreground text-center">
                        This report has been verified and action has been taken
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="bg-yellow-100 p-2 rounded-full mb-3">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <p className="text-center mb-1 font-medium">Pending Verification</p>
                      <p className="text-xs text-muted-foreground text-center">
                        This report is awaiting official verification
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showStats && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Deepfake Impact Analytics</CardTitle>
                <CardDescription>
                  Statistical analysis of deepfake reports and their impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ReportStats />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
