import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

const chartCardClass =
  'rounded-2xl border border-border bg-card p-6 shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80 dark:shadow-[0_0_30px_rgba(132,204,22,0.08)]';

const axisTick = { fill: 'var(--muted-foreground)', fontSize: 12 };

const tooltipStyle = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '0.75rem',
  color: 'var(--card-foreground)',
};

export function SalesTrendChart({ data }) {
  return (
    <div className={chartCardClass}>
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Sales Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={axisTick} tickLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={axisTick} tickLine={{ stroke: 'var(--border)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-1)', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProductSalesChart({ data }) {
  return (
    <div className={chartCardClass}>
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Product Sales</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="product"
              tick={axisTick}
              tickLine={{ stroke: 'var(--border)' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={axisTick} tickLine={{ stroke: 'var(--border)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="sales" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function InventoryDistributionChart({ data }) {
  return (
    <div className={chartCardClass}>
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Inventory Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ product, percent }) => `${product} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="var(--chart-1)"
              dataKey="sales"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ForecastChart({ historical, forecast }) {
  const combinedData = [
    ...historical.map((item) => ({ date: item.date, sales: item.sales, type: 'Historical' })),
    ...forecast.map((item) => ({ date: item.date, sales: item.sales, type: 'Forecast' })),
  ];

  return (
    <div className={chartCardClass}>
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Demand Forecast</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={axisTick} tickLine={{ stroke: 'var(--border)' }} />
            <YAxis tick={axisTick} tickLine={{ stroke: 'var(--border)' }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: 'var(--muted-foreground)' }} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-1)', strokeWidth: 0 }}
              name="Historical"
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--chart-3)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--chart-3)', strokeWidth: 0 }}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
