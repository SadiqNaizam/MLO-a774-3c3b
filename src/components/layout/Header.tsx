import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from '../Dashboard/TopHeader'; // Corrected relative path

interface HeaderProps {
  className?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ className, title }) => {
  // TopHeader already defines its height (h-16), stickiness, background, padding, etc.
  // This wrapper passes the title and className, allowing for potential overrides or additions.
  return (
    <header className={cn(className)}> {/* TopHeader itself is an <header> element, so this wrapper can be a simple React.Fragment or a div if specific styling is needed for the grid cell itself before TopHeader styles apply. For simplicity and directness, TopHeader takes className */} 
      <TopHeader title={title} className={className} />
    </header>
  );
};

export default Header;
