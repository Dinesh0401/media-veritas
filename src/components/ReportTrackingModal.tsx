
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle, AlertTriangle, FileText, Truck } from "lucide-react";

interface ReportTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

export default function ReportTrackingModal({ isOpen, onClose, report }: ReportTrackingModalProps) {
  // Define tracking steps based on report status
  const trackingSteps = [
    { 
      id: 'submitted', 
      title: 'Report Submitted', 
      description: 'Your report has been successfully received by our system.', 
      icon: <FileText className="h-5 w-5" />,
      completed: true,
      date: new Date(report?.created_at).toLocaleDateString(),
    },
    { 
      id: 'processing', 
      title: 'Processing', 
      description: 'Your report is being processed and analyzed for authenticity.', 
      icon: <Clock className="h-5 w-5" />,
      completed: ['in-review', 'resolved', 'rejected'].includes(report?.status),
      date: report?.status !== 'pending' ? new Date(new Date(report?.created_at).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString() : '',
    },
    { 
      id: 'investigation', 
      title: 'Under Investigation', 
      description: 'Our experts are investigating the reported deepfake content.', 
      icon: <Truck className="h-5 w-5" />,
      completed: ['resolved', 'rejected'].includes(report?.status),
      date: report?.status === 'resolved' || report?.status === 'rejected' ? new Date(new Date(report?.created_at).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() : '',
    },
    { 
      id: 'resolved', 
      title: report?.status === 'rejected' ? 'Report Rejected' : 'Report Resolved', 
      description: report?.status === 'rejected' 
        ? 'Your report has been reviewed and rejected. See details below.' 
        : 'Your report has been resolved and necessary actions have been taken.',
      icon: report?.status === 'rejected' 
        ? <AlertTriangle className="h-5 w-5" /> 
        : <CheckCircle className="h-5 w-5" />,
      completed: report?.status === 'resolved' || report?.status === 'rejected',
      date: report?.status === 'resolved' || report?.status === 'rejected' ? new Date(new Date(report?.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() : '',
    },
  ];

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color and icon
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

  if (!report) return null;

  const { color, icon } = getStatusDetails(report.status);
  const shortId = report.id.substring(0, 8).toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Package className="h-5 w-5" /> 
            Report Tracking: {shortId}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Report ID</p>
              <p className="font-semibold">{shortId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submitted On</p>
              <p className="font-semibold">{formatDate(report.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <Badge variant="outline" className={`${color} flex w-fit items-center gap-1 capitalize mt-1`}>
                {icon}
                {report.status.replace("-", " ")}
              </Badge>
            </div>
          </div>

          {/* Tracking Steps - Amazon-like tracking interface */}
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex">
                {/* Timeline connector */}
                <div className="mr-4 flex flex-col items-center">
                  <div className={`rounded-full p-2 ${
                    step.completed 
                      ? "bg-green-100 text-green-600" 
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {step.icon}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`h-full w-0.5 ${
                      step.completed && trackingSteps[index + 1].completed 
                        ? "bg-green-400" 
                        : "bg-gray-200"
                    }`}></div>
                  )}
                </div>
                
                {/* Step content */}
                <div className="pb-6 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                    {step.completed && step.date && (
                      <span className="text-sm text-muted-foreground">{step.date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium mb-2">Report Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p>{report.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Content Type</p>
                <p className="capitalize">{report.content_type}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="line-clamp-2">{report.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <div className="flex items-center">
                  <div 
                    className={`w-2 h-2 rounded-full mr-2 ${
                      report.confidence_score > 80 
                        ? "bg-red-500" 
                        : report.confidence_score > 60 
                        ? "bg-orange-500" 
                        : "bg-green-500"
                    }`}
                  ></div>
                  {report.confidence_score}%
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
