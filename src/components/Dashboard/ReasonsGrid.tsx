import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReasonItem {
  percentage: string;
  description: string;
}

const reasonsLostData: ReasonItem[] = [
  { percentage: '40%', description: 'The proposal is unclear' as const },
  { percentage: '20%', description: 'However venture pursuit' as const },
  { percentage: '10%', description: 'Other' as const },
  { percentage: '30%', description: 'The proposal is unclear' as const }, // Duplicate from image, assuming it's intentional for layout
];

interface OtherDataItem {
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherData: OtherDataItem[] = [
  { value: '900', label: 'total leads count' as const },
  { value: '12', label: 'days in average to convert lead' as const },
  { value: '30', label: 'inactive leads' as const, hasInfo: true, infoText: 'Leads that have not shown activity recently.' },
];

interface ReasonsGridProps {
  className?: string;
}

const ReasonsGrid: React.FC<ReasonsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6 mt-6', className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
          {reasonsLostData.map((reason, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-foreground">{reason.percentage}</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          {otherData.map((dataItem, index) => (
            <div key={index}>
              <p className="text-3xl font-bold text-foreground">{dataItem.value}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <span>{dataItem.label}</span>
                {dataItem.hasInfo && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{dataItem.infoText || 'More information'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReasonsGrid;
