import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mockKPIs, mockOperationalEfficiencyChart, mockOrderFulfillmentChart, mockOperationalMetrics } from '../lib/mockData';
import { Activity, Download, Calendar } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function Operations() {
  const [dateRange, setDateRange] = useState('7d');
  const [department, setDepartment] = useState('all');

  const operationsKPIs = mockKPIs.filter(kpi => 
    ['Order Fulfillment Rate', 'Average Lead Time', 'Operational Efficiency', 'Average Downtime'].includes(kpi.name)
  );

  const departments = ['all', ...new Set(mockOperationalMetrics.map(m => m.department).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Operations Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track and optimize operational performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36">
              <Calendar className="mr-2 size-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {operationsKPIs.map((kpi, idx) => (
          <KPICard key={idx} kpi={kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Order Fulfillment Rate"
          description="Percentage of orders completed on time"
          data={mockOrderFulfillmentChart}
          type="line"
          color="#10b981"
        />
        <ChartCard
          title="Operational Efficiency Score"
          description="Overall operational efficiency over time"
          data={mockOperationalEfficiencyChart}
          type="area"
          color="#8b5cf6"
        />
      </div>

      {/* Department Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Department Metrics</CardTitle>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOperationalMetrics
              .filter(metric => department === 'all' || metric.department === department)
              .map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="size-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{metric.metric_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {metric.department} • {new Date(metric.recorded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {metric.value}
                      {metric.unit && <span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Orders Processed</p>
              <p className="text-3xl font-bold">1,247</p>
              <Badge variant="default" className="mt-2">+12.3%</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">On-Time Delivery</p>
              <p className="text-3xl font-bold">94.5%</p>
              <Badge variant="default" className="mt-2">+2.1%</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Average Processing Time</p>
              <p className="text-3xl font-bold">3.2 days</p>
              <Badge variant="default" className="mt-2">-8.5%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
