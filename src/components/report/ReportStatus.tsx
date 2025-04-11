
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";

interface ReportStatusProps {
  status: string;
}

export function ReportStatus({ status }: ReportStatusProps) {
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
  
  const { color, icon } = getStatusDetails(status);
  
  return (
    <Badge className={`${color} flex items-center gap-1 capitalize`}>
      {icon}
      {status.replace("-", " ")}
    </Badge>
  );
}
