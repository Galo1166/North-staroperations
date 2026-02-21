import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { KPI } from '../../lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../ui/utils';
import { motion } from 'motion/react';
import { kpiCardVariants, iconVariants, numberVariants } from '../../lib/animations';
import { useEffect, useState } from 'react';

interface KPICardProps {
  kpi: KPI;
  index?: number;
}

export function KPICard({ kpi, index = 0 }: KPICardProps) {
  const Icon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  const trendColor = kpi.trend === 'up' && kpi.change > 0 
    ? 'text-green-600' 
    : kpi.trend === 'down' && kpi.change < 0 
    ? 'text-red-600' 
    : 'text-gray-600';

  // Counter animation
  const valueStr = String(kpi.value);
  const numericValue = parseInt(valueStr.match(/\d+/)?.[0] || '0', 10);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (numericValue === 0) return;
    let start = 0;
    const increment = numericValue / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [numericValue]);

  const displayText = valueStr.replace(/\d+/, displayValue.toString());

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.5 }}
      variants={kpiCardVariants}
      transition={{
        delay: index * 0.08,
      }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {kpi.name}
          </CardTitle>
          <motion.div
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <Icon className={cn('size-4', trendColor)} />
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="text-2xl font-bold"
            variants={numberVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              delay: 0.3 + index * 0.08,
            }}
          >
            {displayText}
            <span className="text-lg text-muted-foreground ml-1">{kpi.unit}</span>
          </motion.div>
          <motion.p
            className={cn('text-xs mt-1', trendColor)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4 + index * 0.08,
            }}
          >
            {kpi.change > 0 ? '+' : ''}{kpi.change}% from last period
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
