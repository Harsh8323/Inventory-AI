import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import AlertCard from '../components/alerts/AlertCard';
import PageShell from '../components/layout/PageShell';
import { getAlerts } from '../services/api';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load alerts. Please upload a dataset first.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts =
    filter === 'all' ? alerts : alerts.filter((alert) => alert.risk.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center rounded-2xl border border-border bg-card shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-lime-300" />
          <p className="mt-4 text-muted-foreground">Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-border bg-card text-center shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="mb-4 rounded-full border border-primary/20 bg-accent p-4 dark:border-lime-400/25 dark:bg-lime-400/10">
          <AlertTriangle className="h-8 w-8 text-primary dark:text-lime-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-card-foreground">No Alerts Available</h2>
        <p className="max-w-md text-muted-foreground">{error}</p>
      </div>
    );
  }

  const filterButtons = (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">Filter</span>
      <div className="flex overflow-hidden rounded-xl border border-border bg-card dark:border-zinc-700 dark:bg-black/40">
        {['all', 'high', 'medium', 'low'].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setFilter(level)}
            className={`px-3 py-2 text-sm font-medium capitalize transition-colors sm:px-4 ${
              filter === level
                ? 'bg-primary text-primary-foreground dark:bg-lime-400 dark:text-black'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <PageShell
      badge="Risk monitoring"
      title="Inventory Alerts"
      subtitle="Products at risk of stock shortage"
      headerExtra={filterButtons}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4 dark:border-lime-400/15 dark:bg-lime-400/5">
        <div className="rounded-xl border border-primary/20 bg-accent p-2 dark:border-lime-400/25 dark:bg-lime-400/10">
          <AlertTriangle className="h-5 w-5 text-primary dark:text-lime-300" />
        </div>
        <div>
          <p className="font-medium text-card-foreground">{filteredAlerts.length} products need attention</p>
          <p className="text-sm text-muted-foreground">
            Based on 7-day demand forecast vs current inventory levels
          </p>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-muted/30 py-12 text-center dark:border-zinc-800 dark:bg-zinc-950/50">
          <p className="text-muted-foreground">No alerts match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredAlerts.map((alert, index) => (
            <AlertCard key={index} {...alert} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

export default Alerts;
