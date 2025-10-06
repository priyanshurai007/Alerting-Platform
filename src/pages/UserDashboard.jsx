import { useEffect, useState } from 'react';
import { api, fetchUsers } from '../api';
import AlertCardUser from '../components/AlertCardUser';

export default function UserDashboard() {
  const [userId, setUserId] = useState('u-alex');
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(()=>{ (async()=> setUsers(await fetchUsers()))(); }, []);

  async function load() {
    const res = await api.get(`/user/${userId}/alerts`);
    setItems(res.data);
  }

  useEffect(()=>{ load(); }, [userId]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">User Dashboard</h2>
        <div className="flex gap-2 items-center">
          <span className="label">User</span>
          <select className="select" value={userId} onChange={e=>setUserId(e.target.value)}>
            {users.map(u=> <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <button className="btn-ghost" onClick={load}>Refresh</button>
        </div>
      </div>

      {items.length === 0 && <p className="text-gray-600">No active alerts for this user.</p>}

      <div className="space-y-3">
        {items.map(item => (
          <AlertCardUser key={item.alert.id} item={item} userId={userId} onChanged={load} />
        ))}
      </div>
    </div>
  );
}
