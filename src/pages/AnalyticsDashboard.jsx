import { useEffect, useState } from 'react';
import { api } from '../api';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  async function load() {
    const res = await api.get('/analytics/metrics');
    setData(res.data);
  }

  useEffect(()=>{ load(); }, []);

  if (!data) return <p>Loading metrics…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <button className="btn-ghost" onClick={load}>Refresh</button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="card"><div className="label">Total Alerts</div><div className="text-2xl font-bold">{data.totalAlerts}</div></div>
        <div className="card"><div className="label">Deliveries</div><div className="text-2xl font-bold">{data.deliveries}</div></div>
        <div className="card"><div className="label">Reads</div><div className="text-2xl font-bold">{data.reads}</div></div>
      </div>

      <div className="card mt-3">
        <h3 className="font-semibold mb-2">Severity Breakdown</h3>
        <ul className="text-sm text-gray-700">
          <li>Info: {data.severityBreakdown.Info}</li>
          <li>Warning: {data.severityBreakdown.Warning}</li>
          <li>Critical: {data.severityBreakdown.Critical}</li>
        </ul>
      </div>

      <div className="card mt-3">
        <h3 className="font-semibold mb-2">Snoozed Counts (today) per Alert</h3>
        {Object.keys(data.snoozedCounts).length === 0 ? (
          <p className="text-sm text-gray-600">No snoozes today.</p>
        ) : (
          <ul className="text-sm text-gray-700">
            {Object.entries(data.snoozedCounts).map(([id, cnt]) => (
              <li key={id}><code>{id}</code>: {cnt}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card mt-3">
        <h3 className="font-semibold mb-2">Status</h3>
        <p className="text-sm text-gray-700">Active: {data.active} · Expired: {data.expired}</p>
      </div>
    </div>
  );
}
