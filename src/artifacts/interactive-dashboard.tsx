import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const sampleData = [
  { name: 'Jan', value: 400, growth: 12 },
  { name: 'Feb', value: 300, growth: 8 },
  { name: 'Mar', value: 500, growth: 15 },
  { name: 'Apr', value: 450, growth: 10 },
  { name: 'May', value: 600, growth: 18 },
  { name: 'Jun', value: 550, growth: 14 },
];

const pieData = [
  { name: 'React', value: 45, color: '#8884d8' },
  { name: 'Vue', value: 25, color: '#82ca9d' },
  { name: 'Angular', value: 20, color: '#ffc658' },
  { name: 'Other', value: 10, color: '#ff7c7c' },
];

export default function InteractiveDashboard() {
  const [activeMetric, setActiveMetric] = useState('users');
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const metrics = {
    users: { value: '12.5K', change: '+15%', color: 'text-green-600' },
    revenue: { value: '$45.2K', change: '+8%', color: 'text-blue-600' },
    orders: { value: '1.2K', change: '+22%', color: 'text-purple-600' },
    conversion: { value: '3.4%', change: '+0.8%', color: 'text-orange-600' },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Interactive Dashboard</h1>
        <p className="text-muted-foreground">A sample dashboard showcasing TOYBOX capabilities</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <Card 
            key={key} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              activeMetric === key ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setActiveMetric(key)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className={metric.color}>
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Counter */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Counter</CardTitle>
          <CardDescription>Click the buttons to interact with the counter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">{counter}</div>
            <div className="flex justify-center gap-2">
              <Button onClick={() => setCounter(c => c - 1)} variant="outline">-1</Button>
              <Button onClick={() => setCounter(c => c - 10)} variant="outline">-10</Button>
              <Button onClick={() => setCounter(0)} variant="secondary">Reset</Button>
              <Button onClick={() => setCounter(c => c + 10)} variant="outline">+10</Button>
              <Button onClick={() => setCounter(c => c + 1)} variant="outline">+1</Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress Demo</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Charts Tabs */}
      <Tabs defaultValue="bar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bar">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue data for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="line">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>Growth percentage over time</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[350px]">
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                  <LineChart data={sampleData} width={400} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      dataKey="growth" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pie">
          <Card>
            <CardHeader>
              <CardTitle>Technology Distribution</CardTitle>
              <CardDescription>Framework usage across projects</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex justify-center items-center">
              <div style={{ width: '100%', height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={350}>
                  <PieChart width={400} height={350}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={0}
                      dataKey="value"
                      animationDuration={1000}
                      animationBegin={0}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎨 UI Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Built with shadcn/ui components for consistent design
            </p>
            <div className="space-y-2">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Data Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Interactive charts powered by Recharts library
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Reactivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Real-time updates and interactive elements
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Interactive Dashboard',
  description: 'A comprehensive dashboard showcasing charts, metrics, and interactive UI components',
  type: 'react' as const,
  tags: ['dashboard', 'charts', 'interactive', 'demo', 'ui'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};