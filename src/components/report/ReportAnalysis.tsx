
import { CustomProgress } from "@/components/ui/custom-progress";
import { BarChart3, Calendar, Clock } from "lucide-react";

interface ReportAnalysisProps {
  confidenceScore: number;
  contentType: string;
  createdAt: string;
}

export function ReportAnalysis({ confidenceScore, contentType, createdAt }: ReportAnalysisProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const formattedTime = new Date(createdAt).toLocaleTimeString();
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">AI Analysis Results</h3>
      
      <div className="space-y-4">
        <div>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-fakenik-blue" />
              <span className="text-sm font-medium">Content Type</span>
            </div>
            <p className="text-sm">{contentType}</p>
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
  );
}
