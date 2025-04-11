
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReportStats from "@/components/ReportStats";

// Import refactored components
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportStatus } from "@/components/report/ReportStatus";
import { ReportContent } from "@/components/report/ReportContent";
import { ReportActions } from "@/components/report/ReportActions";
import { SubmitterInfo } from "@/components/report/SubmitterInfo";
import { VerificationStatus } from "@/components/report/VerificationStatus";

export default function ReportDetails() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const { user } = useAuth();
  const { toast: toastNotification } = useToast();

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
        toastNotification({
          title: "Error loading report",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchReportDetails();
  }, [id, toastNotification]);

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
              <Button onClick={() => window.history.back()}>
                Back to Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ReportHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{report.title}</CardTitle>
                    <CardDescription>Report ID: {report.id}</CardDescription>
                  </div>
                  <ReportStatus status={report.status} />
                </div>
              </CardHeader>
              <CardContent>
                <ReportContent report={report} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ReportActions 
                  reportId={report.id} 
                  onToggleStats={() => setShowStats(!showStats)} 
                  showStats={showStats}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submitted By</CardTitle>
              </CardHeader>
              <CardContent>
                <SubmitterInfo email={user?.email} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Official Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <VerificationStatus status={report.status} />
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
