import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, TrendingUp, AlertTriangle, BrainCircuit } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Upload Dataset', icon: Upload },
  { path: '/forecast', label: 'Forecast', icon: TrendingUp },
  { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  { path: '/insights', label: 'AI Insights', icon: BrainCircuit },
];

const sidebarLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'border-primary/25 bg-accent text-accent-foreground shadow-sm dark:border-lime-400/25 dark:bg-lime-400/10 dark:text-lime-300 dark:shadow-[0_0_24px_rgba(163,230,53,0.08)]'
      : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
  }`;

function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-sidebar-border lg:bg-sidebar">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground dark:bg-lime-400 dark:text-black">
          <TrendingUp className="h-4 w-4 text-current" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">Inventory AI</h1>
          <p className="text-xs text-muted-foreground">Forecasting System</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={sidebarLinkClass}>
            <item.icon className="h-5 w-5 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <p className="text-xs text-muted-foreground">v1.0.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
