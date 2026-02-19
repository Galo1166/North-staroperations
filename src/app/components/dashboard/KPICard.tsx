import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { KPI } from '../../lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../ui/utils';

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const Icon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  const trendColor = kpi.trend === 'up' && kpi.change > 0 
    ? 'text-green-600' 
    : kpi.trend === 'down' && kpi.change < 0 
    ? 'text-red-600' 
    : 'text-gray-600';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {kpi.name}
        </CardTitle>
        <Icon className={cn('size-4', trendColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {kpi.value}
          <span className="text-lg text-muted-foreground ml-1">{kpi.unit}</span>
        </div>
        <p className={cn('text-xs mt-1', trendColor)}>
          {kpi.change > 0 ? '+' : ''}{kpi.change}% from last period
        </p>
      </CardContent>
    </Card>
  );
}
