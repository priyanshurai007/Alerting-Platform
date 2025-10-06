import { useEffect, useState } from 'react';
import { api } from '../api';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const res = await api.get('/analytics/metrics');
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p className="text-gray-500">Loading metrics…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={load}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Summary Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total Alerts" value={data.totalAlerts} />
        <MetricCard label="Deliveries" value={data.deliveries} />
        <MetricCard label="Reads" value={data.reads} />
      </div>

      {/* Severity Breakdown */}
      <SectionCard title="Severity Breakdown">
        <ul className="ml-4 text-sm text-gray-700 list-disc">
          <li>Info: {data.severityBreakdown.Info}</li>
          <li>Warning: {data.severityBreakdown.Warning}</li>
          <li>Critical: {data.severityBreakdown.Critical}</li>
        </ul>
      </SectionCard>

      {/* Snoozed Counts */}
      <SectionCard title="Snoozed Counts (today)">
        {Object.keys(data.snoozedCounts).length === 0 ? (
          <p className="text-sm text-gray-600">No snoozes today.</p>
        ) : (
          <ul className="ml-4 text-sm text-gray-700 list-disc">
            {Object.entries(data.snoozedCounts).map(([id, cnt]) => (
              <li key={id}>
                <code>{id}</code>: {cnt}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {/* Status Section */}
      <SectionCard title="System Status">
        <p className="text-sm text-gray-700">
          Active Alerts: <b>{data.active}</b> · Expired: <b>{data.expired}</b>
        </p>
      </SectionCard>
    </div>
  );
}

/* 🔹 Reusable Subcomponents */

function MetricCard({ label, value }) {
  return (
    <div className="p-4 text-center bg-white border rounded-lg shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-3xl font-bold">{Number(value).toLocaleString()}</div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h3 className="mb-2 font-semibold">{title}</h3>
      {children}
    </div>
  );
}
