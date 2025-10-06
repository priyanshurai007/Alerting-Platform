import { useEffect, useState } from 'react';
import { api } from '../api';
import FiltersBar from '../components/FiltersBar';
import AlertForm from '../components/AlertForm';
import AlertListAdmin from '../components/AlertListAdmin';

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({});

  async function load() {
    const params = {};
    if (filters.severity) params.severity = filters.severity;
    if (filters.status) params.status = filters.status;
    if (filters.audience) params.audience = filters.audience;
    const res = await api.get('/admin/alerts', { params });
    setAlerts(res.data);
  }

  useEffect(()=>{ load(); }, []);

  async function trigger() {
    await api.post('/reminders/trigger');
    alert('Reminders triggered.');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <button className="btn-ghost" onClick={trigger}>Trigger Reminders (demo)</button>
      </div>

      <AlertForm onCreated={load} />

      <FiltersBar filters={filters} setFilters={setFilters} refresh={load} />

      <AlertListAdmin items={alerts} refresh={load} />
    </div>
  );
}
