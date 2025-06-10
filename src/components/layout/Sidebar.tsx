import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Corrected relative path

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav is already h-full and has its own background (bg-sidebar) and padding.
  // This wrapper primarily ensures the width (w-64) as per layout requirements.
  return (
    <aside className={cn('w-64 h-full bg-sidebar', className)}>
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
