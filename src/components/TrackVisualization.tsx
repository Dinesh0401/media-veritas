
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, BarChart2, PieChart } from "lucide-react";

// Initial data
const initialCategoryData = [
  { category: 'Face Swap', count: 45 },
  { category: 'Voice Clone', count: 28 },
  { category: 'Full Body', count: 19 },
  { category: 'Text Manipulate', count: 14 },
  { category: 'Scene Edit', count: 9 }
];

// Simulated trend data for the past week (7 days)
const initialTrendData = [
  { day: 'Mon', reports: 32, resolved: 18 },
  { day: 'Tue', reports: 38, resolved: 24 },
  { day: 'Wed', reports: 30, resolved: 20 },
  { day: 'Thu', reports: 40, resolved: 25 },
  { day: 'Fri', reports: 35, resolved: 19 },
  { day: 'Sat', reports: 25, resolved: 15 },
  { day: 'Sun', reports: 28, resolved: 18 }
];

const COLORS = ["#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#10B981"];

export default function TrackVisualization() {
  // State for dynamic data
  const [categoryData, setCategoryData] = useState(initialCategoryData);
  const [trendData, setTrendData] = useState(initialTrendData);
  const [recentTrends, setRecentTrends] = useState({
    totalReports: 715,
    resolvedCases: 480,
    activeCases: 235,
    affectedIndividuals: 1273,
    criticalIncidents: 87
  });
  const [currentTab, setCurrentTab] = useState("bar");
  
  // Use effect to simulate real-time data updates
  useEffect(() => {
    // Update data every 5 seconds to simulate real-time changes
    const intervalId = setInterval(() => {
      // Update category data with random fluctuations
      setCategoryData(prev => {
        return prev.map(item => ({
          ...item,
          count: Math.max(5, item.count + Math.floor(Math.random() * 7) - 3)
        }));
      });
      
      // Update trend data with random fluctuations
      setTrendData(prev => {
        const lastDay = prev[prev.length - 1];
        const newReports = Math.max(15, lastDay.reports + Math.floor(Math.random() * 10) - 5);
        const newResolved = Math.max(8, lastDay.resolved + Math.floor(Math.random() * 8) - 4);
        
        // Rotate days and add new data point
        const newData = [...prev.slice(1), {
          day: lastDay.day,
          reports: newReports,
          resolved: newResolved
        }];
        
        return newData;
      });
      
      // Update recent trends
      setRecentTrends(prev => {
        const newTotal = prev.totalReports + Math.floor(Math.random() * 5);
        const newResolved = prev.resolvedCases + Math.floor(Math.random() * 3);
        return {
          totalReports: newTotal,
          resolvedCases: newResolved,
          activeCases: newTotal - newResolved,
          affectedIndividuals: prev.affectedIndividuals + Math.floor(Math.random() * 8),
          criticalIncidents: prev.criticalIncidents + (Math.random() > 0.7 ? 1 : 0)
        };
      });
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Calculate change percentages for trend indicators
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0
    };
  };
  
  // Get change for total reports (comparing to previous simulated day)
  const reportChange = calculateChange(
    recentTrends.totalReports,
    recentTrends.totalReports - (trendData[6].reports - trendData[5].reports)
  );
  
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Deepfake Activity Overview</CardTitle>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="h-3 w-3" /> Live Updating
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold">{recentTrends.totalReports}</p>
            <div className={`text-xs flex items-center justify-center gap-1 ${reportChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {reportChange.isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {reportChange.value}%
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold">{recentTrends.resolvedCases}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Active Cases</p>
            <p className="text-2xl font-bold">{recentTrends.activeCases}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Individuals Affected</p>
            <p className="text-2xl font-bold">{recentTrends.affectedIndividuals}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Critical Incidents</p>
            <p className="text-2xl font-bold">{recentTrends.criticalIncidents}</p>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" /> Categories
            </TabsTrigger>
            <TabsTrigger value="trend" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Trend
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Distribution
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <div className="text-sm font-medium">{payload[0].payload.category}</div>
                          <div className="text-sm text-muted-foreground">{`${payload[0].value} reports`}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="count" name="Report Count" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="trend" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <div className="text-sm font-medium">{payload[0].payload.day}</div>
                          <div className="text-sm text-muted-foreground">{`New Reports: ${payload[0].value}`}</div>
                          <div className="text-sm text-muted-foreground">{`Resolved: ${payload[1].value}`}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} name="New Reports" />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="distribution" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <div className="text-sm font-medium">{payload[0].payload.day}</div>
                          <div className="text-sm text-muted-foreground">{`Reports: ${payload[0].value}`}</div>
                          <div className="text-sm text-muted-foreground">{`Resolved: ${payload[1].value}`}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="reports" stackId="1" stroke="#3B82F6" fill="#3B82F680" name="New Reports" />
                <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10B981" fill="#10B98180" name="Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            Recent analysis shows a 32% increase in deepfake incidents over the last quarter, with face swapping 
            being the most common form of manipulation. The psychological impact data indicates 12 cases of
            severe distress requiring intervention, and 3 cases have led to legal proceedings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
