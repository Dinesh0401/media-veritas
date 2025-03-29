
import { useState } from "react";
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
import { AlertCircle, Search, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for reported deepfakes
const mockReports = [
  {
    id: "REP7821X",
    date: "2023-11-15",
    type: "Face Swap",
    confidence: 92,
    status: "resolved",
    statusMessage: "Confirmed deepfake, content removed",
  },
  {
    id: "REP6531A",
    date: "2023-11-10",
    type: "Voice Clone",
    confidence: 87,
    status: "in-review",
    statusMessage: "Under expert review",
  },
  {
    id: "REP9021B",
    date: "2023-11-08",
    type: "Scene Manipulation",
    confidence: 75,
    status: "pending",
    statusMessage: "Awaiting initial review",
  },
  {
    id: "REP4328C",
    date: "2023-11-01",
    type: "Full Body",
    confidence: 94,
    status: "resolved",
    statusMessage: "Confirmed deepfake, content removed",
  },
  {
    id: "REP2198D",
    date: "2023-10-25",
    type: "Face Swap",
    confidence: 68,
    status: "rejected",
    statusMessage: "Analysis inconclusive",
  },
];

export default function Track() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo, assume not logged in initially

  // Filter reports based on search term and status filter
  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Deepfake Reports</h1>
          <p className="text-muted-foreground">
            Monitor the status of your submitted reports and see their resolution
          </p>
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by report ID..."
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

            {filteredReports.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Report ID</TableHead>
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
                          return (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{report.id}</TableCell>
                              <TableCell>{report.date}</TableCell>
                              <TableCell>{report.type}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div 
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                      report.confidence > 80 
                                        ? "bg-red-500" 
                                        : report.confidence > 60 
                                        ? "bg-orange-500" 
                                        : "bg-green-500"
                                    }`}
                                  ></div>
                                  {report.confidence}%
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`${color} flex w-fit items-center gap-1 capitalize`}>
                                  {icon}
                                  {report.status.replace("-", " ")}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View Details</Button>
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
            )}
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
              <CardTitle>Looking for a specific report?</CardTitle>
              <CardDescription>
                If you know the report ID, you can quickly check its status below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter report ID (e.g., REP7821X)"
                  className="flex-1"
                />
                <Button>Track Report</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
