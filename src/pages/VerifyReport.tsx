
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyReport } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Shield, CheckCircle2, AlertCircle, Loader } from "lucide-react";

export default function VerifyReport() {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get("reportId");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    report?: any;
    message: string;
  } | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!reportId) {
      toast({
        title: "Error",
        description: "Report ID is missing",
        variant: "destructive",
      });
      return;
    }

    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter a verification code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      const result = await verifyReport(reportId, verificationCode);
      
      if (result.success) {
        setVerificationResult({
          verified: result.verified,
          report: result.report,
          message: result.message,
        });
        
        toast({
          title: result.verified ? "Verification Successful" : "Verification Failed",
          description: result.message,
          variant: result.verified ? "default" : "destructive",
        });
      } else {
        toast({
          title: "Verification Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error verifying report:", error);
      toast({
        title: "Verification Error",
        description: error.message || "Failed to verify report",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleViewReport = () => {
    if (verificationResult?.report?.id) {
      navigate(`/report-details/${verificationResult.report.id}`);
    }
  };

  const formatVerificationCode = (code: string) => {
    // Remove any non-alphanumeric characters
    const cleaned = code.replace(/[^A-Z0-9]/g, "");
    
    // Format as XXXX-XXXX-XXXX-XXXX
    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0 && formatted.length < 19) {
        formatted += "-";
      }
      formatted += cleaned[i];
    }
    
    return formatted;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setVerificationCode(formatVerificationCode(value));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verify Report</CardTitle>
          </CardHeader>
          <CardContent>
            {!verificationResult ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={verificationCode}
                    onChange={handleCodeChange}
                    maxLength={19}
                    className="text-center font-mono text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the 16-character verification code to confirm the authenticity of this report
                  </p>
                </div>
                
                <Button 
                  onClick={handleVerify} 
                  disabled={isVerifying} 
                  className="w-full"
                >
                  {isVerifying ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Report"
                  )}
                </Button>
                
                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => navigate("/")}
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    {verificationResult.verified ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    )}
                    <h3 className="font-medium text-lg">
                      {verificationResult.verified ? "Report Verified" : "Verification Failed"}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {verificationResult.message}
                  </p>
                  
                  {verificationResult.verified && verificationResult.report && (
                    <div className="border-t border-border pt-4 mt-4 space-y-2">
                      <div>
                        <span className="text-sm font-medium">Title:</span>
                        <p>{verificationResult.report.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Created:</span>
                        <p>{new Date(verificationResult.report.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Type:</span>
                        <p className="capitalize">{verificationResult.report.content_type?.replace('-', ' ')}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {verificationResult.verified && (
                    <Button onClick={handleViewReport}>
                      View Full Report
                    </Button>
                  )}
                  <Button
                    variant={verificationResult.verified ? "outline" : "default"}
                    onClick={() => navigate("/")}
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
