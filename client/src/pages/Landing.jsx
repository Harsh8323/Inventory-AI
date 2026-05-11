import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, TrendingUp, AlertTriangle, BrainCircuit, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    title: 'Upload Data',
    description: 'Import inventory and sales CSV files in seconds.',
    icon: Upload,
  },
  {
    title: 'Demand Forecasting',
    description: 'Predict short-term demand with built-in analytics.',
    icon: TrendingUp,
  },
  {
    title: 'Risk Alerts',
    description: 'Spot potential stockouts before they happen.',
    icon: AlertTriangle,
  },
  {
    title: 'AI Insights',
    description: 'Get practical recommendations from your data.',
    icon: BrainCircuit,
  },
];

function Landing() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground dark:bg-lime-400 dark:text-black">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight text-foreground dark:text-zinc-100">
              Inventory AI
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary dark:hover:bg-zinc-900 dark:hover:text-lime-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/dashboard"
              className="hidden rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted hover:text-foreground sm:inline-flex dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 dark:bg-lime-400 dark:text-black dark:hover:opacity-100 dark:hover:bg-lime-300"
            >
              Open app
            </Link>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,78,59,0.07),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(132,204,22,0.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(163,230,53,0.16),transparent_40%)]" />
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl dark:bg-lime-400/10" />
        <div className="pointer-events-none absolute top-40 -left-16 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl dark:bg-lime-300/10" />

        <main className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-sm text-primary dark:border-lime-400/40 dark:bg-lime-400/10 dark:text-lime-300">
            Inventory AI Platform
          </p>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-foreground md:text-6xl dark:text-white">
            Forecast demand, manage inventory, and act faster.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg dark:text-zinc-300">
            A minimal workflow to upload sales data, generate demand forecasts, monitor stock risk,
            and get AI-powered recommendations for better planning.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:shadow-none dark:hover:border-zinc-500"
            >
              View Dashboard
            </Link>
          </div>
        </main>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/20 dark:border-zinc-800 dark:bg-zinc-950/70 dark:shadow-none dark:hover:border-lime-400/20"
            >
              <feature.icon className="h-5 w-5 text-primary dark:text-lime-300" />
              <h2 className="mt-4 text-lg font-medium text-card-foreground dark:text-zinc-100">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground dark:text-zinc-400">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Landing;
