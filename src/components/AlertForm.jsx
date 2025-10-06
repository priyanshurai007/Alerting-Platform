import { useEffect, useState } from 'react';
import { api, fetchTeams, fetchUsers } from '../api';
import { isoOrNull } from '../utils/date';

export default function AlertForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('Info');
  const [deliveryType, setDeliveryType] = useState('InApp');
  const [reminderFrequencyMinutes, setFreq] = useState(120);
  const [startAt, setStartAt] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [org, setOrg] = useState(true);
  const [teamIds, setTeamIds] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(()=>{ (async()=>{ setTeams(await fetchTeams()); setUsers(await fetchUsers()); })(); },[]);

  function toggle(id, arr, set){ set(a=> a.includes(id)? a.filter(x=>x!==id):[...a,id]); }

  async function submit() {
    await api.post('/admin/alerts', {
      title, message, severity, deliveryType,
      reminderFrequencyMinutes: Number(reminderFrequencyMinutes),
      startAt: isoOrNull(startAt), expiresAt: isoOrNull(expiresAt),
      visibility: { org, teams: teamIds, users: userIds }
    });
    setTitle(''); setMessage(''); setSeverity('Info'); setDeliveryType('InApp'); setFreq(120);
    setStartAt(''); setExpiresAt(''); setOrg(true); setTeamIds([]); setUserIds([]);
    onCreated?.();
  }

  return (
    <div className="card mb-4">
      <h3 className="text-lg font-semibold mb-3">Create Alert</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <div><div className="label">Title</div><input className="input w-full" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><div className="label">Severity</div>
          <select className="select w-full" value={severity} onChange={e=>setSeverity(e.target.value)}>
            <option>Info</option><option>Warning</option><option>Critical</option>
          </select></div>
        <div className="md:col-span-2"><div className="label">Message</div><textarea className="input w-full" rows="3" value={message} onChange={e=>setMessage(e.target.value)} /></div>
        <div><div className="label">Delivery</div>
          <select className="select w-full" value={deliveryType} onChange={e=>setDeliveryType(e.target.value)}>
            <option>InApp</option><option disabled>Email</option><option disabled>SMS</option>
          </select></div>
        <div><div className="label">Reminder (minutes)</div><input className="input w-full" type="number" min="5" value={reminderFrequencyMinutes} onChange={e=>setFreq(e.target.value)} /></div>
        <div><div className="label">Start At</div><input className="input w-full" type="datetime-local" value={startAt} onChange={e=>setStartAt(e.target.value)} /></div>
        <div><div className="label">Expires At</div><input className="input w-full" type="datetime-local" value={expiresAt} onChange={e=>setExpiresAt(e.target.value)} /></div>
      </div>
      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <div className="card"><label className="flex items-center gap-2"><input type="checkbox" checked={org} onChange={e=>setOrg(e.target.checked)} />Entire Organization</label></div>
        <div className="card"><div className="label mb-2">Teams</div>{teams.map(t=>(
          <label key={t.id} className="flex items-center gap-2"><input type="checkbox" checked={teamIds.includes(t.id)} onChange={()=>toggle(t.id,teamIds,setTeamIds)} />{t.name}</label>
        ))}</div>
        <div className="card"><div className="label mb-2">Users</div>{users.map(u=>(
          <label key={u.id} className="flex items-center gap-2"><input type="checkbox" checked={userIds.includes(u.id)} onChange={()=>toggle(u.id,userIds,setUserIds)} />{u.name}</label>
        ))}</div>
      </div>
      <div className="mt-4 flex gap-2"><button className="btn-primary" onClick={submit}>Create</button></div>
    </div>
  );
}
