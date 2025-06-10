import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  title?: string; // To be passed to the Header component
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, title, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen bg-background',
        className
      )}
    >
      {/* Sidebar: Spans both rows in the first column. Width is determined by Sidebar component (w-64). */}
      <div className="row-span-2">
        <Sidebar />
      </div>

      {/* Header: Second column, first row. Height is determined by Header component (h-16). */}
      {/* The Header component itself renders TopHeader which is a <header> HTML element. */}
      <Header title={title} />
      
      {/* Main Content: Second column, second row. Takes remaining height and scrolls. */}
      <main className="overflow-y-auto p-6 bg-background">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
