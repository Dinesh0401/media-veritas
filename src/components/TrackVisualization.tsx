
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
  { category: 'Face Swap', count: 45 },
  { category: 'Voice Clone', count: 28 },
  { category: 'Full Body', count: 19 },
  { category: 'Text Manipulate', count: 14 },
  { category: 'Scene Edit', count: 9 },
];

const COLORS = ["#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#10B981"];

export default function TrackVisualization() {
  const recentTrends = {
    totalReports: 715,
    resolvedCases: 480,
    activeCases: 235,
    affectedIndividuals: 1273,
    criticalIncidents: 87
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Deepfake Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold">{recentTrends.totalReports}</p>
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

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} reports`, 'Count']}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="count" name="Report Count" radius={[4, 4, 0, 0]}>
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

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
