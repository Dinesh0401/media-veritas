
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, FileText, Clock, CheckCircle, AlertTriangle, Loader, Package, Truck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import TrackVisualization from "@/components/TrackVisualization";
import ReportTrackingModal from "@/components/ReportTrackingModal";

export default function Track() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trackingId, setTrackingId] = useState("");
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingReport, setTrackingReport] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch reports if user is logged in
    if (user) {
      fetchReports();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  async function fetchReports() {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('reports')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setReports(data || []);
    } catch (error: any) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error loading reports",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Filter reports based on search term and status filter
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || report.status === filter;
    return matchesSearch && matchesFilter;
  });

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

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle viewing a report
  const handleViewReport = (reportId: string) => {
    navigate(`/report-details/${reportId}`);
  };

  // Handle tracking a report by ID
  const handleTrackReport = () => {
    if (!trackingId) {
      toast({
        title: "Tracking ID required",
        description: "Please enter a report ID to track",
        variant: "destructive",
      });
      return;
    }

    // Find report in current reports or fetch from database
    const report = reports.find(r => r.id.substring(0, 8).toUpperCase() === trackingId.toUpperCase());
    
    if (report) {
      setTrackingReport(report);
      setShowTrackingModal(true);
    } else {
      // If not found in current reports, try to fetch it from the database
      fetchReportByShortId(trackingId);
    }
  };

  // Fetch a report by its short ID
  const fetchReportByShortId = async (shortId: string) => {
    try {
      setIsLoading(true);
      
      // Query all reports and filter client-side by the short ID
      // This is a workaround since we can't directly query by substring in Supabase
      const { data, error } = await supabase
        .from('reports')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      // Find the report with matching short ID
      const matchingReport = data?.find(
        report => report.id.substring(0, 8).toUpperCase() === shortId.toUpperCase()
      );
      
      if (matchingReport) {
        setTrackingReport(matchingReport);
        setShowTrackingModal(true);
      } else {
        toast({
          title: "Report not found",
          description: `No report found with tracking ID: ${shortId}`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error fetching report by ID:', error);
      toast({
        title: "Error tracking report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-fakenik-blue" />
          <p className="text-muted-foreground">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Deepfake Reports</h1>
          <p className="text-muted-foreground">
            Monitor the status of your submitted reports and see their resolution
          </p>
        </div>

        {user ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by report ID or title..."
                  className="pl-9 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            {reports.length > 0 ? (
              filteredReports.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Report ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.map((report) => {
                            const { color, icon } = getStatusDetails(report.status);
                            const shortId = report.id.substring(0, 8).toUpperCase();
                            
                            return (
                              <TableRow key={report.id}>
                                <TableCell className="font-medium">{shortId}</TableCell>
                                <TableCell className="max-w-[200px] truncate">{report.title}</TableCell>
                                <TableCell>{formatDate(report.created_at)}</TableCell>
                                <TableCell>{report.content_type}</TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`${color} flex w-fit items-center gap-1 capitalize`}>
                                    {icon}
                                    {report.status.replace("-", " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleViewReport(report.id)}
                                  >
                                    View Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-8">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No reports found</h3>
                      <p className="text-muted-foreground mb-4">
                        We couldn't find any reports matching your search criteria.
                      </p>
                      <Button onClick={() => { setSearchTerm(""); setFilter("all"); }}>
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="py-8">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No reports yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted any deepfake reports yet. Create your first report to get started.
                    </p>
                    <Button asChild>
                      <Link to="/report">Create Report</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Add the visualization component regardless of whether there are reports */}
            <TrackVisualization />
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sign in to track your reports</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You need to be logged in to view and track your deepfake reports. Please sign in or create an account.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/register">Create Account</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" /> 
                Track a Specific Report
              </CardTitle>
              <CardDescription>
                If you know the report ID, you can quickly check its status below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter report ID (e.g., 5F6A8B23)"
                  className="flex-1"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
                <Button onClick={handleTrackReport} className="bg-fakenik-blue hover:bg-fakenik-blue/90">
                  <Truck className="h-4 w-4 mr-2" /> Track Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tracking Modal */}
      {trackingReport && (
        <ReportTrackingModal 
          isOpen={showTrackingModal}
          onClose={() => setShowTrackingModal(false)}
          report={trackingReport}
        />
      )}
    </div>
  );
}
