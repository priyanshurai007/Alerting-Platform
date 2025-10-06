# Frontend — Alerting & Notification Platform

React + Vite (v4, Node 18 compatible) + Tailwind + Axios frontend for your backend.

## Run
```bash
npm install
npm run dev
```
Open http://localhost:5173

(Optional) `.env`:
```
VITE_API_BASE=http://localhost:4001
```

## Tabs
- **User:** pick user, see active alerts, mark read/unread, snooze
- **Admin:** create alerts (severity, delivery, frequency, start/expiry, visibility), filter list, toggle reminders, archive, trigger reminders (demo)
- **Analytics:** totals, deliveries, reads, snoozes, severity breakdown
