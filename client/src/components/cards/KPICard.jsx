import React from 'react';

function KPICard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80 dark:shadow-[0_0_30px_rgba(132,204,22,0.08)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
          {trend ? (
            <p
              className={`mt-2 text-xs font-medium ${
                trend > 0 ? 'text-emerald-700 dark:text-lime-300' : 'text-destructive'
              }`}
            >
              {trend > 0 ? '+' : ''}
              {trend}% from last period
            </p>
          ) : null}
        </div>
        {Icon ? (
          <div className="rounded-xl border border-primary/20 bg-accent p-3 dark:border-lime-400/30 dark:bg-lime-400/10">
            <Icon className="h-5 w-5 text-primary dark:text-lime-300" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default KPICard;
