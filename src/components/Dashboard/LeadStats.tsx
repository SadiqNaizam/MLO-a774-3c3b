import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Although not a card in image, this structure is for consistency

interface LeadStatsProps {
  className?: string;
}

const LeadStats: React.FC<LeadStatsProps> = ({ className }) => {
  const stats = [
    { value: 680, label: 'total closed' as const },
    { value: 70, label: 'total lost' as const },
  ];

  return (
    // This component doesn't use a Card in the image, it's a section above the chart.
    // If it needs to be a card, wrap with <Card><CardHeader><CardTitle>...</CardTitle></CardHeader><CardContent>...</CardContent></Card>
    <div className={cn('py-4', className)}> 
      <h2 className="text-lg font-semibold text-foreground mb-1">Leads tracking</h2>
      <div className="flex items-baseline space-x-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className="text-5xl font-bold text-foreground">{stat.value}</span>
            <span className="ml-2 text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadStats;
