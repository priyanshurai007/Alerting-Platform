export default function FiltersBar({ filters, setFilters, refresh }) {
  return (
    <div className="card mb-4 flex flex-wrap gap-3 items-end">
      <div><div className="label">Severity</div>
        <select className="select" value={filters.severity||''} onChange={e=>setFilters(f=>({...f, severity: e.target.value||undefined}))}>
          <option value="">All</option><option>Info</option><option>Warning</option><option>Critical</option>
        </select>
      </div>
      <div><div className="label">Status</div>
        <select className="select" value={filters.status||''} onChange={e=>setFilters(f=>({...f, status: e.target.value||undefined}))}>
          <option value="">All</option><option value="active">Active</option><option value="expired">Expired</option>
        </select>
      </div>
      <div><div className="label">Audience</div>
        <select className="select" value={filters.audience||''} onChange={e=>setFilters(f=>({...f, audience: e.target.value||undefined}))}>
          <option value="">All</option><option value="org">Org</option><option value="team">Team</option><option value="user">User</option>
        </select>
      </div>
      <button className="btn-ghost" onClick={refresh}>Apply</button>
    </div>
  );
}
