import { KPICard } from '../components/dashboard/KPICard';
import { ChartCard } from '../components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockDashboardOverview } from '../lib/mockData';
import { AlertTriangle, ArrowRight, Package, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../lib/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const data = mockDashboardOverview;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your operations today
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.kpis.slice(0, 6).map((kpi, idx) => (
          <KPICard key={idx} kpi={kpi} />
        ))}
      </div>

      {/* Alerts Section */}
      {data.alerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-orange-600" />
                <CardTitle>Stock Alerts</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/inventory')}>
                View All
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.alerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between bg-white p-3 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Package className="size-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{alert.item.name}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Inventory Value Over Time"
          description="Total inventory valuation trend"
          data={data.charts.inventory_value}
          type="area"
          color="#3b82f6"
        />
        <ChartCard
          title="Order Fulfillment Rate"
          description="Percentage of orders fulfilled on time"
          data={data.charts.order_fulfillment}
          type="line"
          color="#10b981"
        />
      </div>

      <ChartCard
        title="Operational Efficiency"
        description="Overall operational efficiency score"
        data={data.charts.operational_efficiency}
        type="area"
        color="#8b5cf6"
      />

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/inventory')}>
              View All
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recent_transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'IN' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <TrendingUp className={`size-4 ${
                      transaction.type === 'IN' ? 'text-green-600' : 'text-red-600 rotate-180'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'IN' ? 'Stock In' : 'Stock Out'}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity} units
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${transaction.cost.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
