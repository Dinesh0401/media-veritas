
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, PieChart as PieChartIcon, TrendingUp, AlertTriangle } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const reportImpactData = {
  monthly: [
    { name: "Jan", reports: 65, affected: 120, incidents: 30 },
    { name: "Feb", reports: 80, affected: 150, incidents: 35 },
    { name: "Mar", reports: 95, affected: 190, incidents: 40 },
    { name: "Apr", reports: 125, affected: 250, incidents: 55 },
    { name: "May", reports: 160, affected: 310, incidents: 70 },
    { name: "Jun", reports: 190, affected: 380, incidents: 85 },
  ],
  categories: [
    { name: "Face Swap", value: 40 },
    { name: "Voice Clone", value: 30 },
    { name: "Full Body", value: 15 },
    { name: "Scene Manipulation", value: 10 },
    { name: "Other", value: 5 },
  ],
  severityDistribution: [
    { name: "Critical", value: 25 },
    { name: "High", value: 35 },
    { name: "Medium", value: 30 },
    { name: "Low", value: 10 },
  ],
  impactMetrics: {
    totalReports: 715,
    peopleAffected: 1400,
    resolvedCases: 480,
    pendingCases: 235,
    criticalIncidents: 120,
  }
};

// Color arrays for different charts
const COLORS = ["#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#10B981"];
const BLUE_COLORS = ["#1E40AF", "#3B82F6", "#93C5FD", "#BFDBFE", "#DBEAFE"];
const RED_COLORS = ["#B91C1C", "#DC2626", "#EF4444", "#F87171", "#FCA5A5"];

export default function ReportStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{reportImpactData.impactMetrics.totalReports}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">People Affected</p>
                <p className="text-2xl font-bold">{reportImpactData.impactMetrics.peopleAffected}</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Cases</p>
                <p className="text-2xl font-bold">{reportImpactData.impactMetrics.resolvedCases}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Incidents</p>
                <p className="text-2xl font-bold">{reportImpactData.impactMetrics.criticalIncidents}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="trends">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="severity">Severity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Report & Impact Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80" config={{}}>
                <LineChart
                  data={reportImpactData.monthly}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="font-medium">{label}</div>
                            {payload.map((entry) => (
                              <div key={entry.name} className="flex items-center gap-2">
                                <div 
                                  className="h-2 w-2 rounded"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-sm text-muted-foreground">
                                  {entry.name}: {entry.value} cases
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="reports" stroke="#3B82F6" name="Reports" />
                  <Line type="monotone" dataKey="affected" stroke="#F59E0B" name="Affected" />
                  <Line type="monotone" dataKey="incidents" stroke="#EF4444" name="Incidents" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Report Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-80">
                <ChartContainer className="h-80" config={{}}>
                  <PieChart>
                    <Pie
                      data={reportImpactData.categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportImpactData.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="severity" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Case Severity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80" config={{}}>
                <BarChart
                  data={reportImpactData.severityDistribution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#EF4444">
                    {reportImpactData.severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={RED_COLORS[index % RED_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Deepfake Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="mb-2">
            Our analysis shows that deepfake incidents have increased by 45% over the last 6 months, with face swap and voice cloning being the most prevalent forms of manipulation.
          </p>
          <p className="mb-2">
            An estimated 1400 individuals have been directly affected by these incidents, with reports of emotional distress, reputation damage, and in some cases, financial losses.
          </p>
          <p>
            The data indicates 12 reported cases of severe psychological impact, including anxiety, depression, and social withdrawal requiring professional intervention.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
