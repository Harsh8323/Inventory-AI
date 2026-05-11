import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

function getRiskStyles(risk) {
  switch (risk.toLowerCase()) {
    case 'high':
      return {
        wrap: 'border-destructive/30 bg-destructive/10 text-destructive dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300',
        badge:
          'border-destructive/40 bg-destructive/15 text-destructive dark:border-rose-500/40 dark:bg-rose-500/15 dark:text-rose-200',
      };
    case 'medium':
      return {
        wrap: 'border-amber-500/35 bg-amber-500/10 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200',
        badge:
          'border-amber-500/40 bg-amber-500/15 text-amber-900 dark:border-amber-400/40 dark:bg-amber-400/15 dark:text-amber-100',
      };
    default:
      return {
        wrap: 'border-primary/25 bg-accent text-primary dark:border-lime-400/25 dark:bg-lime-400/10 dark:text-lime-200',
        badge:
          'border-primary/35 bg-primary/10 text-primary dark:border-lime-400/35 dark:bg-lime-400/10 dark:text-lime-100',
      };
  }
}

function getRiskIcon(risk) {
  switch (risk.toLowerCase()) {
    case 'high':
      return AlertTriangle;
    case 'medium':
      return AlertCircle;
    default:
      return Info;
  }
}

function AlertCard({ product, inventory, predicted_demand, risk }) {
  const Icon = getRiskIcon(risk);
  const styles = getRiskStyles(risk);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/20 dark:border-lime-400/15 dark:bg-zinc-950/80 dark:shadow-[0_0_30px_rgba(132,204,22,0.06)] dark:hover:border-lime-400/25">
      <div className="flex items-start gap-4">
        <div className={`rounded-xl border p-2.5 ${styles.wrap}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="truncate font-semibold text-card-foreground">{product}</h4>
            <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
              {risk} Risk
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Current Inventory</p>
              <p className="text-lg font-semibold text-card-foreground">{inventory.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Predicted Demand (7 days)</p>
              <p className="text-lg font-semibold text-destructive dark:text-rose-300">
                {predicted_demand.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-3 border-t border-border pt-3 dark:border-zinc-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shortage Risk</span>
              <span
                className={`font-medium ${
                  predicted_demand > inventory ? 'text-destructive dark:text-rose-400' : 'text-primary dark:text-lime-300'
                }`}
              >
                {predicted_demand > inventory
                  ? `${((predicted_demand - inventory) / inventory * 100).toFixed(1)}% over stock`
                  : 'Stock sufficient'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
