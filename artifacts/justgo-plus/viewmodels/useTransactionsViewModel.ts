import { useMemo, useState } from 'react';
import { DateRangeKey, Transaction, TransactionFilter, TxnStatus, TxnType } from '@/models';
import { useApp } from './AppContext';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmt = (d: Date) => String(d.getDate()).padStart(2, '0') + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();

export function rangeFor(key: DateRangeKey, now = new Date()): { from: Date; to: Date } {
  const to = new Date(now);
  if (key === 'last30') return { from: new Date(now.getTime() - 29 * 864e5), to };
  if (key === 'thisMonth') return { from: new Date(now.getFullYear(), now.getMonth(), 1), to };
  const back = key === 'last3m' ? 3 : 5;
  return { from: new Date(now.getFullYear(), now.getMonth() - back, 1), to };
}

export const RANGE_OPTIONS: { key: DateRangeKey; label: string }[] = [
  { key: 'last30', label: 'Last 30 days' },
  { key: 'thisMonth', label: 'This month' },
  { key: 'last3m', label: 'Last 3 months' },
  { key: 'last6m', label: 'Last 6 months' },
];
export const TYPE_OPTIONS: { key: TxnType; label: string }[] = [
  { key: 'all', label: 'All types' }, { key: 'toll', label: 'Toll (ANPR)' }, { key: 'reload', label: 'Reload' },
];
export const STATUS_OPTIONS: { key: TxnStatus; label: string }[] = [
  { key: 'all', label: 'All statuses' }, { key: 'success', label: 'Successful' }, { key: 'pending', label: 'Pending' }, { key: 'failed', label: 'Failed' },
];

export function useTransactionsViewModel() {
  const { data, setFilter } = useApp();
  const [sheet, setSheet] = useState<'none' | 'date' | 'filters'>('none');
  const [draft, setDraft] = useState<TransactionFilter>(data.filter);
  // No transaction source is connected; ANPR history would come from PLUSMiles.
  const all: Transaction[] = useMemo(() => [], []);
  const filter = data.filter;
  const { from, to } = rangeFor(filter.range);
  const items = all.filter((t) => (filter.type === 'all' || t.type === filter.type) && (filter.status === 'all' || t.status === filter.status));
  const activeFilters = (filter.type !== 'all' ? 1 : 0) + (filter.status !== 'all' ? 1 : 0);
  return {
    items, filter, draft, sheet, activeFilters,
    rangeLabel: fmt(from) + ' - ' + fmt(to),
    openDate: () => { setDraft(filter); setSheet('date'); },
    openFilters: () => { setDraft(filter); setSheet('filters'); },
    close: () => setSheet('none'),
    setDraft,
    apply: async () => { await setFilter(draft); setSheet('none'); },
    reset: () => setDraft({ ...draft, type: 'all', status: 'all' }),
  };
}
