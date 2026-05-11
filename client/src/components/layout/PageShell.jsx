import React from 'react';

function PageShell({ badge, title, subtitle, headerExtra, children }) {
  return (
    <div className="relative space-y-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md md:p-8 dark:border-lime-400/20 dark:bg-black dark:shadow-[0_0_40px_rgba(132,204,22,0.06)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(6,78,59,0.06),transparent_38%),radial-gradient(circle_at_90%_15%,rgba(16,185,129,0.05),transparent_32%)] dark:bg-[radial-gradient(circle_at_10%_0%,rgba(132,204,22,0.18),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(163,230,53,0.12),transparent_30%)]" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {badge ? (
            <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs uppercase tracking-wider text-primary dark:border-lime-400/40 dark:bg-lime-400/10 dark:text-lime-300">
              {badge}
            </p>
          ) : null}
          <h1 className={`text-3xl font-semibold text-card-foreground ${badge ? 'mt-3' : ''}`}>{title}</h1>
          {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
        </div>
        {headerExtra ? <div className="relative shrink-0">{headerExtra}</div> : null}
      </div>
      <div className="relative space-y-6">{children}</div>
    </div>
  );
}

export default PageShell;
