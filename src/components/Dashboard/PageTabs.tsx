import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageTabsProps {
  className?: string;
  activeTab?: 'sales' | 'leads';
  onTabChange?: (tab: 'sales' | 'leads') => void;
}

const PageTabs: React.FC<PageTabsProps> = ({
  className,
  activeTab = 'leads',
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = React.useState<'sales' | 'leads'>(activeTab);

  const handleTabChange = (value: string) => {
    const tabValue = value as 'sales' | 'leads';
    setCurrentTab(tabValue);
    if (onTabChange) {
      onTabChange(tabValue);
    }
  };

  return (
    <div className={cn('px-6 border-b border-border', className)}>
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-auto">
        <TabsList className="bg-transparent p-0">
          <TabsTrigger 
            value="sales" 
            className="text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2.5"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger 
            value="leads" 
            className="text-muted-foreground data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2.5"
          >
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* TabsContent would typically go here in a full page layout, but for this component, only TabsList is needed as per image */}
    </div>
  );
};

export default PageTabs;
