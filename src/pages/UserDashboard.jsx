import { useEffect, useState } from 'react';
import { api, fetchUsers } from '../api';
import AlertCardUser from '../components/AlertCardUser';

export default function UserDashboard() {
  const [userId, setUserId] = useState('u-alex');
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧩 Load list of users (for demo selection)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUsers();
        setUsers(res);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      }
    })();
  }, []);

  // 🧠 Load alerts for the selected user
  async function load() {
    try {
      setLoading(true);
      const res = await api.get(`/user/${userId}/alerts`);
      setItems(res.data);
      setError(null);
    } catch (err) {
      console.error('Error loading alerts:', err);
      setError('Failed to load alerts.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [userId]);

  return (
    <div className="p-4 space-y-4">
      {/* Header and User Selection */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">User Dashboard</h2>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">User:</label>
          <select
            className="px-2 py-1 text-sm border rounded"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          >
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <button
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={load}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Loading/Error Handling */}
      {loading && <p className="text-gray-500">Loading alerts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* No Alerts */}
      {!loading && !error && items.length === 0 && (
        <p className="text-gray-600">No active alerts for this user.</p>
      )}

      {/* Alerts List */}
      <div className="space-y-3">
        {items.map(item => (
          <AlertCardUser key={item.alert.id} item={item} userId={userId} onChanged={load} />
        ))}
      </div>

      {/* Summary Footer */}
      {!loading && items.length > 0 && (
        <div className="pt-2 mt-4 text-sm text-gray-500 border-t">
          Showing {items.length} active alert{items.length > 1 ? 's' : ''} for user <b>{userId}</b>.
        </div>
      )}
    </div>
  );
}
