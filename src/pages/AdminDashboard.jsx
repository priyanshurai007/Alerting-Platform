import { useEffect, useState } from 'react';
import { api } from '../api';
import FiltersBar from '../components/FiltersBar';
import AlertForm from '../components/AlertForm';
import AlertListAdmin from '../components/AlertListAdmin';

// ✅ Analytics Panel Component
function AnalyticsPanel() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadMetrics() {
    try {
      setLoading(true);
      const res = await api.get('/analytics/metrics');
      setMetrics(res.data);
      setError(null);
    } catch {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) return <p className="text-gray-500">Loading analytics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!metrics) return null;

  return (
    <div className="p-4 mt-5 border rounded bg-gray-50">
      <h3 className="mb-2 text-lg font-semibold">📊 System Analytics</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><b>Total Alerts:</b> {metrics.totalAlerts}</p>
        <p><b>Active:</b> {metrics.active}</p>
        <p><b>Expired:</b> {metrics.expired}</p>
        <p><b>Delivered:</b> {metrics.deliveries}</p>
        <p><b>Read:</b> {metrics.reads}</p>
      </div>

      <div className="mt-2">
        <h4 className="mt-3 mb-1 text-sm font-semibold">Severity Breakdown:</h4>
        <ul className="ml-3 text-xs list-disc">
          <li>Info: {metrics.severityBreakdown.Info}</li>
          <li>Warning: {metrics.severityBreakdown.Warning}</li>
          <li>Critical: {metrics.severityBreakdown.Critical}</li>
        </ul>
      </div>
    </div>
  );
}

// ✅ Main Admin Dashboard Page
export default function AdminDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 Load all alerts with current filters
  async function load() {
    try {
      setLoading(true);
      const params = {};
      if (filters.severity) params.severity = filters.severity;
      if (filters.status) params.status = filters.status;
      if (filters.audience) params.audience = filters.audience;
      const res = await api.get('/admin/alerts', { params });
      setAlerts(res.data);
      setError(null);
    } catch {
      setError('Failed to fetch alerts.');
    } finally {
      setLoading(false);
    }
  }

  // Load alerts on first render
  useEffect(() => {
    load();
  }, []);

  // 🧩 Trigger reminder dispatch (demo)
  async function trigger() {
    try {
      await api.post('/reminders/trigger');
      alert('✅ Reminders triggered successfully.');
    } catch {
      alert('❌ Failed to trigger reminders.');
    }
  }

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={trigger}
        >
          🔁 Trigger Reminders (Demo)
        </button>
      </div>

      {/* Alert Creation Form */}
      <AlertForm onCreated={load} />

      {/* Filters */}
      <FiltersBar filters={filters} setFilters={setFilters} refresh={load} />

      {/* Alerts List */}
      {loading && <p className="text-gray-500">Loading alerts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && alerts.length === 0 && (
        <p className="text-gray-600">No alerts found. Try changing filters or create one above.</p>
      )}
      <AlertListAdmin items={alerts} refresh={load} />

      {/* Analytics Dashboard */}
      <AnalyticsPanel />
    </div>
  );
}
