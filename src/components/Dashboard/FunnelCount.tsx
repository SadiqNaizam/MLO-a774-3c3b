import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string;
  percentage: number; // for bar width
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500', percentage: 200/390*100 },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-400', percentage: 100/390*100 },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-indigo-600', percentage: 50/390*100 },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-500', percentage: 20/390*100 },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-600', percentage: 20/390*100 },
];

// For Recharts BarChart - needs a slightly different structure
const chartData = [
  {
    name: 'Funnel',
    discovery: 200,
    qualified: 100,
    inConversation: 50,
    negotiations: 20,
    closedWon: 20,
  }
];

const stageColors: Record<string, string> = {
  discovery: '#EF4444', // red-500
  qualified: '#F59E0B', // yellow-400
  inConversation: '#4F46E5', // indigo-600
  negotiations: '#22C55E', // green-500
  closedWon: '#8B5CF6', // purple-600
};

interface FunnelCountProps {
  className?: string;
}

const FunnelCount: React.FC<FunnelCountProps> = ({ className }) => {
  const totalActiveLeads = 600;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{totalActiveLeads}</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="w-full h-6 rounded-full overflow-hidden flex mb-6 bg-gray-200">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn('h-full', stage.color)}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        
        {/* This is a simplified segmented bar. Recharts version below if needed. Given "BarGraph" in composition, a Recharts attempt is good.*/}
        {/* For a more complex Recharts bar (if the div approach is not sufficient):
        <div style={{ width: '100%', height: 50 }} className="mb-6">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={chartData} stackOffset="expand" barCategoryGap={0} barSize={30}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <RechartsTooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', border: '1px solid hsl(var(--border))' }} itemStyle={{ color: 'hsl(var(--foreground))' }}/>
              <Bar dataKey="discovery" stackId="a" fill={stageColors.discovery} radius={[5, 0, 0, 5]}/>
              <Bar dataKey="qualified" stackId="a" fill={stageColors.qualified} />
              <Bar dataKey="inConversation" stackId="a" fill={stageColors.inConversation} />
              <Bar dataKey="negotiations" stackId="a" fill={stageColors.negotiations} />
              <Bar dataKey="closedWon" stackId="a" fill={stageColors.closedWon} radius={[0, 5, 5, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        */}

        <ul className="space-y-3 text-sm">
          {funnelData.map((stage) => (
            <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)}></div>
              <span className="text-foreground truncate">{stage.name}</span>
              <span className="text-muted-foreground justify-self-end">{stage.count}</span>
              <span className="text-muted-foreground justify-self-end font-medium">$ {stage.value}</span>
              {stage.name === 'In conversation' ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground justify-self-end cursor-default">2 days</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 text-white text-xs p-2 rounded">
                      <p>{stage.time}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-muted-foreground justify-self-end">{stage.time}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelCount;
