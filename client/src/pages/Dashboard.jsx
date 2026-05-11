import React, { useEffect, useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Package,
  Boxes,
  AlertTriangle,
} from 'lucide-react';
import KPICard from '../components/cards/KPICard';
import PageShell from '../components/layout/PageShell';
import { SalesTrendChart, ProductSalesChart, InventoryDistributionChart } from '../components/charts/Charts';
import { getAnalytics, getSalesTrend, getProductDistribution } from '../services/api';

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [productDistribution, setProductDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsData, trendData, distributionData] = await Promise.all([
        getAnalytics(),
        getSalesTrend(),
        getProductDistribution(),
      ]);
      setAnalytics(analyticsData);
      setSalesTrend(trendData);
      setProductDistribution(distributionData);
      setError(null);
    } catch (err) {
      setError('Please upload a dataset first to view analytics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center rounded-2xl border border-border bg-card shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-lime-300" />
          <p className="mt-4 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-border bg-card text-center shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="mb-4 rounded-full border border-primary/20 bg-accent p-4 dark:border-lime-400/25 dark:bg-lime-400/10">
          <Package className="h-8 w-8 text-primary dark:text-lime-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-card-foreground">No Data Available</h2>
        <p className="max-w-md text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <PageShell badge="Control Center" title="Dashboard" subtitle="Inventory analytics overview">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <KPICard
          title="Total Sales"
          value={analytics.total_sales.toLocaleString()}
          subtitle="All time"
          icon={DollarSign}
        />
        <KPICard
          title="Avg Daily Sales"
          value={analytics.average_daily_sales.toLocaleString()}
          subtitle="Per day average"
          icon={TrendingUp}
        />
        <KPICard
          title="Total Products"
          value={analytics.total_products}
          subtitle="In catalog"
          icon={Boxes}
        />
        <KPICard
          title="Lowest Inventory"
          value={analytics.lowest_inventory_product}
          subtitle="Needs attention"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesTrendChart data={salesTrend} />
        <ProductSalesChart data={productDistribution.slice(0, 10)} />
      </div>

      <InventoryDistributionChart data={productDistribution.slice(0, 8)} />
    </PageShell>
  );
}

export default Dashboard;
