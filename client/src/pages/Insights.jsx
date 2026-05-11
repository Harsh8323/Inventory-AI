import React, { useEffect, useState } from 'react';
import { BrainCircuit, Lightbulb } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import { getInsights } from '../services/api';

function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setLoading(true);
      const data = await getInsights();
      setInsights(data);
      setError(null);
    } catch (err) {
      setError('Failed to generate insights. Please upload a dataset first.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center rounded-2xl border border-border bg-card shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-lime-300" />
          <p className="mt-4 text-muted-foreground">Generating AI insights...</p>
        </div>
      </div>
    );
  }

  if (error && insights.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-border bg-card text-center shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="mb-4 rounded-full border border-primary/20 bg-accent p-4 dark:border-lime-400/25 dark:bg-lime-400/10">
          <BrainCircuit className="h-8 w-8 text-primary dark:text-lime-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-card-foreground">Insights Unavailable</h2>
        <p className="max-w-md text-muted-foreground">{error}</p>
      </div>
    );
  }

  const geminiBadge = (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 dark:border-lime-400/30 dark:bg-lime-400/10">
      <BrainCircuit className="h-4 w-4 text-primary dark:text-lime-300" />
      <span className="text-sm font-medium text-primary dark:text-lime-200">Powered by Gemini</span>
    </div>
  );

  return (
    <PageShell
      badge="Intelligence"
      title="AI Insights"
      subtitle="Business intelligence and recommendations"
      headerExtra={geminiBadge}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:border-primary/25 dark:border-lime-400/15 dark:bg-zinc-950/80 dark:shadow-[0_0_30px_rgba(132,204,22,0.06)] dark:hover:border-lime-400/25"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-primary/20 bg-accent p-3 dark:border-lime-400/25 dark:bg-lime-400/10">
                <Lightbulb className="h-5 w-5 text-primary dark:text-lime-300" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 font-semibold text-card-foreground">{insight.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error ? (
        <div className="rounded-xl border border-border bg-muted/40 p-4 dark:border-zinc-700 dark:bg-black/40">
          <p className="text-sm text-muted-foreground">
            Note: {error}. Showing fallback insights.
          </p>
        </div>
      ) : null}
    </PageShell>
  );
}

export default Insights;
