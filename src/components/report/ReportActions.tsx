
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart3, Download, Loader, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SUPABASE_URL } from "@/integrations/supabase/client";
import { supabase } from "@/integrations/supabase/client";

interface ReportActionsProps {
  reportId: string;
  onToggleStats: () => void;
  showStats: boolean;
}

export function ReportActions({ reportId, onToggleStats, showStats }: ReportActionsProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleGeneratePdf = async () => {
    if (!reportId) return;
    
    try {
      setIsGeneratingPdf(true);
      toast.info("Generating PDF...", {
        description: "Please wait while we prepare your report statement.",
      });
      
      console.log(`Generating PDF for report ${reportId}`);
      
      // Fetch the binary PDF directly from the edge function
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/generate-report-pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({ reportId }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.statusText}`);
      }
      
      // Get the PDF blob from the response
      const pdfBlob = await response.blob();
      
      // Create a URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `fakenik-report-${reportId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
      
      // Show success notification
      setPdfGenerated(true);
      toast.success("PDF Statement Generated", {
        description: "Your report statement has been generated with a unique QR code.",
      });
      
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      toast.error("PDF Generation Failed", {
        description: error.message || "An error occurred while generating the PDF",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-4">
      <Popover open={pdfGenerated} onOpenChange={setPdfGenerated}>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">PDF Generated</h4>
              <p className="text-sm text-muted-foreground">
                Your report statement has been generated with a unique QR code.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button variant="outline" className="w-full">
        <Share2 className="mr-2 h-4 w-4" />
        Share Report
      </Button>
      <Button 
        variant="secondary" 
        className="w-full"
        onClick={onToggleStats}
      >
        <BarChart3 className="mr-2 h-4 w-4" />
        {showStats ? "Hide Statistics" : "View Statistics"}
      </Button>
    </div>
  );
}
