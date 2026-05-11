import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { ForecastChart } from '../components/charts/Charts';
import KPICard from '../components/cards/KPICard';
import PageShell from '../components/layout/PageShell';
import { getForecast, getProducts } from '../services/api';

function Forecast() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      loadForecast(selectedProduct);
    }
  }, [selectedProduct]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
      if (data.products.length > 0) {
        setSelectedProduct(data.products[0]);
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadForecast = async (product) => {
    try {
      setLoading(true);
      const data = await getForecast(product);
      setForecastData(data);
      setError(null);
    } catch (err) {
      setError('Failed to generate forecast');
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !forecastData) {
    return (
      <div className="flex h-96 items-center justify-center rounded-2xl border border-border bg-card shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-lime-300" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !forecastData) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-border bg-card text-center shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80">
        <TrendingUp className="mb-4 h-8 w-8 text-primary dark:text-lime-300" />
        <h2 className="mb-2 text-xl font-semibold text-card-foreground">{error}</h2>
        <p className="text-muted-foreground">Upload a dataset to enable forecasting.</p>
      </div>
    );
  }

  const totalHistorical = forecastData?.historical.reduce((sum, item) => sum + item.sales, 0) || 0;
  const totalForecast = forecastData?.forecast.reduce((sum, item) => sum + item.sales, 0) || 0;
  const avgHistorical = forecastData?.historical.length
    ? (totalHistorical / forecastData.historical.length).toFixed(2)
    : 0;
  const avgForecast = forecastData?.forecast.length
    ? (totalForecast / forecastData.forecast.length).toFixed(2)
    : 0;

  return (
    <PageShell
      badge="Forecasting"
      title="Demand Forecast"
      subtitle="Predict future demand using linear regression"
    >
      <div className="rounded-2xl border border-border bg-muted/30 p-6 shadow-sm dark:border-lime-400/20 dark:bg-zinc-950/80 dark:shadow-[0_0_30px_rgba(132,204,22,0.06)]">
        <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="text-sm font-medium text-muted-foreground">Select Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="flex-1 rounded-xl border border-input bg-card px-4 py-2.5 text-card-foreground outline-none focus:ring-2 focus:ring-ring dark:border-zinc-700 dark:bg-black dark:text-zinc-100 dark:ring-lime-400/30"
          >
            {products.map((product) => (
              <option key={product} value={product} className="bg-card dark:bg-zinc-900">
                {product}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Historical Avg" value={avgHistorical} subtitle="Per day (all history)" icon={TrendingUp} />
        <KPICard title="Forecast Avg" value={avgForecast} subtitle="Per day (next 7 days)" icon={TrendingUp} />
        <KPICard
          title="Total Historical"
          value={totalHistorical.toFixed(0)}
          subtitle={`${forecastData?.historical.length || 0} days of data`}
          icon={TrendingUp}
        />
        <KPICard title="Forecast Total" value={totalForecast.toFixed(0)} subtitle="7 day prediction" icon={TrendingUp} />
      </div>

      {forecastData ? (
        <ForecastChart historical={forecastData.historical} forecast={forecastData.forecast} />
      ) : null}
    </PageShell>
  );
}

export default Forecast;
