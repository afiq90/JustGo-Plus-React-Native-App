import { useMemo, useState } from 'react';
import { ProfileStep } from '@/models';
import { useApp } from './AppContext';

export function useProfileProgress() {
  const { data } = useApp();
  const [expanded, setExpanded] = useState<boolean>(true);
  const p = data.profile;
  const steps = useMemo<ProfileStep[]>(() => [
    { key: 'mobile', label: 'Mobile Number Verification', done: p.mobileVerified, enabled: true },
    { key: 'email', label: 'Email Verification', done: p.emailVerified, enabled: true },
    { key: 'identity', label: 'Complete Identity Verification', done: p.identityVerified, enabled: true },
    { key: 'payment', label: 'Add payment method', done: false, enabled: p.identityVerified },
    { key: 'vehicle', label: 'Add vehicle', done: data.vehicles.length > 0 && p.identityVerified, enabled: p.identityVerified },
  ], [p, data.vehicles.length]);
  const done = steps.filter((s) => s.done).length;
  const identitySteps = steps.slice(0, 3);
  const identityDone = identitySteps.filter((s) => s.done).length;
  return {
    name: p.fullName,
    steps, done, total: steps.length, percent: Math.round((done / steps.length) * 100),
    identitySteps, identityDone, identityPercent: Math.round((identityDone / 3) * 100),
    identityVerified: p.identityVerified,
    expanded, toggle: () => setExpanded((e) => !e),
  };
}
