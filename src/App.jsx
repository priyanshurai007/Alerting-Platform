import { useState } from 'react';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

export default function App() {
  const [tab, setTab] = useState('user');
  return (
    <div className="min-h-screen p-6">
      <Navbar tab={tab} setTab={setTab} />
      {tab==='user' && <UserDashboard />}
      {tab==='admin' && <AdminDashboard />}
      {tab==='analytics' && <AnalyticsDashboard />}
    </div>
  );
}
