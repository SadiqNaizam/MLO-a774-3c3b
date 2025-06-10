import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, CalendarDays } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  title?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, title = 'Dashboard' }) => {
  return (
    <header className={cn('bg-background border-b border-border sticky top-0 z-10 flex items-center justify-between px-6 h-16', className)}>
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <div className="flex items-center space-x-4">
        <Button variant="outline" className="text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
