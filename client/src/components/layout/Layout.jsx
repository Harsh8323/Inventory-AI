import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/upload', label: 'Upload' },
  { path: '/forecast', label: 'Forecast' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/insights', label: 'Insights' },
];

const mobileNavClass = ({ isActive }) =>
  `block rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? 'border-primary/25 bg-accent text-accent-foreground shadow-sm dark:border-lime-400/25 dark:bg-lime-400/10 dark:text-lime-300 dark:shadow-[0_0_24px_rgba(163,230,53,0.08)]'
      : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
  }`;

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="lg:pl-64">
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl dark:bg-black/95 lg:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground dark:bg-lime-400 dark:text-black">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span className="font-semibold text-foreground dark:text-zinc-100">Inventory AI</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-zinc-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
