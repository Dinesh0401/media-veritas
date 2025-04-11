
import { Separator } from "@/components/ui/separator";
import { ReportMedia } from "./ReportMedia";
import { ReportAnalysis } from "./ReportAnalysis";

interface ReportContentProps {
  report: {
    media_url?: string;
    content_type?: string;
    description: string;
    source_url?: string;
    confidence_score: number;
    created_at: string;
  };
}

export function ReportContent({ report }: ReportContentProps) {
  return (
    <div className="space-y-6">
      <ReportMedia mediaUrl={report.media_url} contentType={report.content_type} />

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

      <ReportAnalysis 
        confidenceScore={report.confidence_score} 
        contentType={report.content_type || ""} 
        createdAt={report.created_at}
      />
    </div>
  );
}
