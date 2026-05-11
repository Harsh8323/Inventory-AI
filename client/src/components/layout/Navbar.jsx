import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Moon, Sun, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/upload', label: 'Upload' },
  { path: '/forecast', label: 'Forecast' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/insights', label: 'Insights' },
];

const desktopNavClass = ({ isActive }) =>
  `rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'border-primary/25 bg-accent text-accent-foreground shadow-sm dark:border-lime-400/25 dark:bg-lime-400/10 dark:text-lime-300 dark:shadow-[0_0_20px_rgba(163,230,53,0.12)]'
      : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
  }`;

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/90">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground dark:bg-lime-400 dark:text-black">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-semibold text-foreground dark:text-zinc-100">Inventory AI</span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={desktopNavClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary dark:hover:bg-zinc-900 dark:hover:text-lime-300"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
