import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  href?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, href = '#' }) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center py-2.5 px-4 rounded-md text-sm font-medium',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground'
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const navItemsTop = [
    { icon: LayoutGrid, label: 'Dashboard', isActive: true },
    { icon: Users, label: 'Leads' },
    { icon: UserCircle2, label: 'Customers' },
    { icon: FileText, label: 'Proposals' },
    { icon: Receipt, label: 'Invoices' },
    { icon: ShoppingCart, label: 'Items' },
    { icon: Mail, label: 'Mail' },
    { icon: Archive, label: 'Shoebox' },
    { icon: CalendarDays, label: 'Calendar' },
  ];

  const navItemsBottom = [
    { icon: HelpCircle, label: 'Help' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={cn('h-full bg-sidebar text-sidebar-foreground flex flex-col p-4 space-y-1', className)}>
      <div className="flex items-center justify-between h-16 px-2 mb-4">
        <div className="flex items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-2">
                DO
            </div>
            {/* <span className="font-semibold text-xl text-foreground">Dashboard</span> Removing as it might be redundant with TopHeader */}
        </div>
        <button className="p-1.5 rounded-md hover:bg-sidebar-accent lg:hidden">
            <Menu className="h-6 w-6 text-sidebar-foreground" />
        </button>
      </div>
      
      <nav className="flex-grow space-y-1">
        {navItemsTop.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="mt-auto space-y-1 pt-4 border-t border-sidebar-border">
        {navItemsBottom.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
