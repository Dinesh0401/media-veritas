
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, FileType, Calendar, Gauge } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface DemoResultCardProps {
  result: {
    isFake: boolean;
    confidenceScore: number;
    analysisDate: string;
    detectedManipulations: string[];
    fileName: string;
    fileSize: number;
    fileType: string;
  };
}

export default function DemoResultCard({ result }: DemoResultCardProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(2) + ' KB';
    const mb = kb / 1024;
    return mb.toFixed(2) + ' MB';
  };
  
  const getScoreColor = (score: number): string => {
    if (score < 40) return "bg-green-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <svg className="h-32 w-32">
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeOpacity="0.2" 
              className="text-muted"
            />
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray="352" 
              strokeDashoffset={352 - (352 * result.confidenceScore / 100)}
              className={cn(
                "text-green-500 transition-all duration-1000", 
                result.isFake ? "text-red-500" : "text-green-500"
              )}
              transform="rotate(-90 64 64)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">{result.confidenceScore}%</span>
            <span className="text-sm text-muted-foreground">
              confidence
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        {result.isFake ? (
          <div className="flex flex-col items-center text-red-500">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="text-lg font-bold mt-1">Likely Manipulated</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Our analysis indicates this image may be fake
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-green-500">
            <CheckCircle className="h-6 w-6" />
            <h3 className="text-lg font-bold mt-1">Likely Authentic</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              No significant signs of manipulation detected
            </p>
          </div>
        )}
      </div>
      
      {result.isFake && result.detectedManipulations.length > 0 && (
        <>
          <Separator />
          <div>
            <h4 className="text-sm font-medium mb-2">Detected Manipulations:</h4>
            <div className="flex flex-wrap gap-2">
              {result.detectedManipulations.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-red-500/10">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div className="flex items-center gap-2">
          <FileType className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Filename:</span>
        </div>
        <div className="truncate font-medium">{result.fileName}</div>
        
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Size:</span>
        </div>
        <div className="font-medium">{formatFileSize(result.fileSize)}</div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Analyzed:</span>
        </div>
        <div className="font-medium">
          {formatDistanceToNow(new Date(result.analysisDate), { addSuffix: true })}
        </div>
      </div>
      
      <div className="mt-auto pt-4">
        <Button variant="outline" className="w-full" onClick={() => window.location.href = "/report"}>
          Submit Full Report
        </Button>
      </div>
    </div>
  );
}
