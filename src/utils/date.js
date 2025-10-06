import dayjs from 'dayjs';
export const isoOrNull = (v) => v ? dayjs(v).toISOString() : null;
export const fmt = (v) => v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '—';
