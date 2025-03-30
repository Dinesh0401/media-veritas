
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, PieChart as PieChartIcon, TrendingUp, AlertTriangle } from "lucide-react";

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
              <LineChart 
                data={reportImpactData.monthly}
                categories={["reports", "affected", "incidents"]}
                index="name"
                colors={["blue", "amber", "red"]}
                valueFormatter={(value) => `${value} cases`}
                className="h-80"
              />
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
                <PieChart 
                  data={reportImpactData.categories}
                  category="value"
                  index="name"
                  colors={["blue", "cyan", "indigo", "violet", "purple"]}
                  valueFormatter={(value) => `${value}%`}
                  className="h-80"
                />
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
              <BarChart 
                data={reportImpactData.severityDistribution}
                categories={["value"]}
                index="name"
                colors={["red"]}
                valueFormatter={(value) => `${value}%`}
                className="h-80"
              />
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
