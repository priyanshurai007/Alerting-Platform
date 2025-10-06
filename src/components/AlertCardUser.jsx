import { api } from '../api';

export default function AlertCardUser({ item, userId, onChanged }) {
  const { alert, state } = item;

  async function read(){ await api.post(`/user/${userId}/alerts/${alert.id}/read`); onChanged?.(); }
  async function unread(){ await api.post(`/user/${userId}/alerts/${alert.id}/unread`); onChanged?.(); }
  async function snooze(){ await api.post(`/user/${userId}/alerts/${alert.id}/snooze`); onChanged?.(); }

  return (
    <div className="card">
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-lg">{alert.title}</h4>
            <span className={`badge ${alert.severity}`}>{alert.severity}</span>
          </div>
          <p className="text-sm text-gray-700">{alert.message}</p>
          <div className="text-xs text-gray-500 mt-1">
            {state.read ? 'Read' : 'Unread'} · Snoozed today: {state.snoozedUntilDate ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {!state.read ? (<button className="btn-primary" onClick={read}>Mark Read</button>) : (<button className="btn-ghost" onClick={unread}>Mark Unread</button>)}
          <button className="btn-ghost" onClick={snooze}>Snooze Today</button>
        </div>
      </div>
    </div>
  );
}
