import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card'; // Chart is typically in a card
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';

interface ChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const chartData: ChartDataPoint[] = [
  { month: 'March', closedWon: 90, closedLost: 65 },
  { month: 'April', closedWon: 60, closedLost: 38 },
  { month: 'May', closedWon: 80, closedLost: 42 },
  { month: 'June', closedWon: 65, closedLost: 10 },
  { month: 'July', closedWon: 75, closedLost: 45 },
  { month: 'August', closedWon: 30, closedLost: 95 }, 
];

const tabOptions = [
  { id: 'leadsCame', label: 'Leads came' as const },
  { id: 'leadsConverted', label: 'Leads Converted' as const },
  { id: 'totalDealsSize', label: 'Total deals size' as const },
];

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border shadow-lg p-3 rounded-md text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} style={{ color: pld.color }}>
            {pld.name}: {pld.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [activeButton, setActiveButton] = React.useState<'leadsCame' | 'leadsConverted' | 'totalDealsSize'>('leadsConverted');

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4 space-x-1">
          {tabOptions.map(opt => (
             <Button 
                key={opt.id} 
                variant={activeButton === opt.id ? "secondary" : "ghost"} 
                size="sm"
                className={cn(
                  'text-xs px-3 py-1 h-auto',
                  activeButton === opt.id ? 'bg-secondary text-secondary-foreground font-semibold' : 'text-muted-foreground'
                )}
                onClick={() => setActiveButton(opt.id)}
              >
              {opt.label}
            </Button>
          ))}
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                dy={10} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
              <Area 
                type="monotone" 
                dataKey="closedWon" 
                stroke="#14B8A6" // teal-500
                fillOpacity={1} 
                fill="url(#colorClosedWon)" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#14B8A6', strokeWidth:0 }}
                activeDot={{ r: 6, fill: '#14B8A6', stroke: 'white', strokeWidth: 2 }}
                name="Closed Won"
              />
              <Area 
                type="monotone" 
                dataKey="closedLost" 
                stroke="#EF4444" // red-500
                fillOpacity={1} 
                fill="url(#colorClosedLost)" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#EF4444', strokeWidth:0 }}
                activeDot={{ r: 6, fill: '#EF4444', stroke: 'white', strokeWidth: 2 }}
                name="Closed Lost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start items-center space-x-6 pt-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-teal-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Closed won</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-sm bg-red-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Closed lost</span>
          </div>
      </CardFooter>
    </Card>
  );
};

export default LeadsTrackingChart;
