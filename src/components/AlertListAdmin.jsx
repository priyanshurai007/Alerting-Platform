import { api } from '../api';
import { fmt } from '../utils/date';
import { useState } from 'react';

export default function AlertListAdmin({ items, refresh }) {
  const [busyId, setBusyId] = useState(null);

  async function toggleReminders(a){ setBusyId(a.id); await api.put(`/admin/alerts/${a.id}`, { remindersEnabled: !a.remindersEnabled }); setBusyId(null); refresh(); }
  async function archive(a){ if(!confirm('Archive this alert?')) return; setBusyId(a.id); await api.put(`/admin/alerts/${a.id}`, { archived: true }); setBusyId(null); refresh(); }

  return (
    <div className="space-y-3">
      {items.map(a => (
        <div key={a.id} className="card">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-lg">{a.title}</h4>
                <span className={`badge ${a.severity}`}>{a.severity}</span>
                {a.archived && <span className="badge bg-gray-200 text-gray-700">Archived</span>}
              </div>
              <p className="text-sm text-gray-700">{a.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                Start: {fmt(a.startAt)} · Expires: {fmt(a.expiresAt)} · Delivery: {a.deliveryType} · Freq: {a.reminderFrequencyMinutes}m
              </div>
              <div className="text-xs text-gray-500">
                Visibility: {a.visibility.org ? 'Org ' : ''}
                {a.visibility.teams?.length ? `Teams(${a.visibility.teams.length}) ` : ''}
                {a.visibility.users?.length ? `Users(${a.visibility.users.length})` : ''}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost" disabled={busyId===a.id} onClick={()=>toggleReminders(a)}>
                {a.remindersEnabled ? 'Disable Reminders' : 'Enable Reminders'}
              </button>
              <button className="btn-ghost" disabled={busyId===a.id} onClick={()=>archive(a)}>Archive</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
