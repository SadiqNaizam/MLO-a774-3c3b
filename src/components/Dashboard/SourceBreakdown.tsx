import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
  fill: string; // for recharts cell
}

const sourceData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: 'bg-red-500', fill: '#EF4444' },
  { name: 'Behance', value: 1000, percentage: 40, color: 'bg-yellow-400', fill: '#F59E0B' }, 
  { name: 'Instagram', value: 1000, percentage: 10, color: 'bg-teal-500', fill: '#14B8A6' },
  { name: 'Dribbble', value: 1000, percentage: 10, color: 'bg-green-400', fill: '#4ADE80' }, 
];
// Note: Percentages in image sum to 110%. Adjusted for pie chart logic (values will determine percentage).
// For PieChart, values determine segment size. Recalculating percentages based on values for display.
const totalValue = sourceData.reduce((sum, item) => sum + item.value, 0);
const processedSourceData = sourceData.map(item => ({...item, percentage: parseFloat(((item.value / totalValue) * 100).toFixed(1)) }));

interface SourceBreakdownProps {
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border shadow-lg p-2 rounded-md text-sm">
        <p className="font-semibold">{`${payload[0].name}`}</p>
        <p className="text-muted-foreground">{`Value: $${payload[0].value}`}</p>
        <p className="text-muted-foreground">{`Share: ${payload[0].payload.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const SourceBreakdown: React.FC<SourceBreakdownProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 h-48 md:h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={processedSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={1}
                dataKey="value"
                nameKey="name"
              >
                {processedSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 space-y-3 text-sm">
          {processedSourceData.map((source) => (
            <div key={source.name} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3">
              <div className={cn('w-3 h-3 rounded-sm', source.color)}></div>
              <span className="text-foreground truncate">{source.name}</span>
              <span className="text-muted-foreground justify-self-end font-medium">$ {source.value}</span>
              <span className="text-muted-foreground justify-self-end">
                {source.percentage}%
                {source.name === 'Dribbble' && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1 cursor-default">*</span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-slate-800 text-white text-xs p-2 rounded">
                        <p>from leads total</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceBreakdown;
