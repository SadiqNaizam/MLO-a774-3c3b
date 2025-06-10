import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageTabs from '../components/Dashboard/PageTabs';
import FunnelCount from '../components/Dashboard/FunnelCount';
import SourceBreakdown from '../components/Dashboard/SourceBreakdown';
import LeadStats from '../components/Dashboard/LeadStats';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import ReasonsGrid from '../components/Dashboard/ReasonsGrid';

// It's good practice to define props type even if empty for consistency.
interface DashboardOverviewPageProps {}

const DashboardOverviewPage: React.FC<DashboardOverviewPageProps> = () => {
  // The PageTabs component internally manages its active state and defaults to 'leads'.
  // If page-level control or reaction to tab changes were needed, state could be managed here:
  // const [activeTab, setActiveTab] = React.useState<'sales' | 'leads'>('leads');
  // const handleTabChange = (newTab: 'sales' | 'leads') => setActiveTab(newTab);

  return (
    <MainAppLayout title="Dashboard"> {/* Title "Dashboard" for the TopHeader, as seen in the UI image */}
      
      {/* Page Tabs: Displayed below the header. Uses its own default state. */}
      {/* PageTabs defaults to the 'leads' tab being active, which matches the UI image. */}
      <PageTabs />

      {/* First Row of Content: FunnelCount and SourceBreakdown side-by-side on larger screens. */}
      {/* The 'mt-6' class provides top margin from PageTabs. */}
      {/* 'lg:grid-cols-2' makes it responsive: 1 column on small screens, 2 on large. */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FunnelCount />
        <SourceBreakdown />
      </div>

      {/* Second Row of Content: Lead statistics, followed by the leads tracking chart. */}
      {/* This block also has 'mt-6' for spacing from the row above. */}
      <div className="mt-6">
        <LeadStats />
        {/* LeadsTrackingChart is a Card. Add 'mt-4' for visual separation from LeadStats textual content. */}
        <LeadsTrackingChart className="mt-4" /> 
      </div>

      {/* Third Row of Content: ReasonsGrid. */}
      {/* The ReasonsGrid component itself includes a 'mt-6' in its root div, so no additional margin needed here. */}
      <ReasonsGrid />

    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
