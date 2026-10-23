import { useState } from 'react';
import { FieldErrors, TollCardKind } from '@/models';
import { CardForm, hasErrors, ProfileForm, validateCard, validateProfile, validateVehicle, VehicleForm } from '@/services/validation';
import { useApp } from './AppContext';

export function useProfileViewModel() {
  const { data, updateProfile } = useApp();
  const [form, setForm] = useState<ProfileForm>({ fullName: data.profile.fullName, email: data.profile.email, phone: data.profile.phone });
  const [errors, setErrors] = useState<FieldErrors<ProfileForm>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  return {
    profile: data.profile, form, errors, saving, saveError,
    set: (k: keyof ProfileForm, v: string) => { setForm((f) => ({ ...f, [k]: k === 'fullName' ? v.toUpperCase() : v })); setErrors((e) => ({ ...e, [k]: undefined })); },
    save: async () => {
      const e = validateProfile(form);
      setErrors(e);
      if (hasErrors(e)) return false;
      setSaving(true); setSaveError(null);
      try { await updateProfile({ fullName: form.fullName.trim(), email: form.email.trim(), phone: form.phone.trim() }); return true; }
      catch { setSaveError('Could not save on this device. Try again.'); return false; }
      finally { setSaving(false); }
    },
  };
}

export function useVehicleFormViewModel(id?: string) {
  const { data, saveVehicle, deleteVehicle } = useApp();
  const existing = data.vehicles.find((v) => v.id === id);
  const [form, setForm] = useState<VehicleForm>({ plate: existing?.plate ?? '', make: existing?.make ?? '', model: existing?.model ?? '', color: existing?.color ?? '' });
  const [errors, setErrors] = useState<FieldErrors<VehicleForm>>({});
  const [saving, setSaving] = useState<boolean>(false);
  return {
    isEdit: !!existing, form, errors, saving,
    set: (k: keyof VehicleForm, v: string) => { setForm((f) => ({ ...f, [k]: k === 'plate' ? v.toUpperCase() : v })); setErrors((e) => ({ ...e, [k]: undefined })); },
    save: async () => {
      const e = validateVehicle(form);
      setErrors(e);
      if (hasErrors(e)) return false;
      setSaving(true);
      try { await saveVehicle({ plate: form.plate.trim().toUpperCase(), make: form.make.trim(), model: form.model.trim(), color: form.color.trim() }, existing?.id); return true; }
      finally { setSaving(false); }
    },
    remove: async () => { if (existing) await deleteVehicle(existing.id); },
  };
}

export function useCardsViewModel(kind: TollCardKind) {
  const { data, saveCard, deleteCard } = useApp();
  const items = data.cards.filter((c) => c.kind === kind);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState<CardForm>({ label: '', number: '' });
  const [errors, setErrors] = useState<FieldErrors<CardForm>>({});
  return {
    items, open, form, errors, isEdit: !!editingId,
    startAdd: () => { setEditingId(null); setForm({ label: '', number: '' }); setErrors({}); setOpen(true); },
    startEdit: (cid: string) => { const c = items.find((x) => x.id === cid); if (!c) return; setEditingId(cid); setForm({ label: c.label, number: c.number }); setErrors({}); setOpen(true); },
    close: () => setOpen(false),
    set: (k: keyof CardForm, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); },
    save: async () => {
      const e = validateCard(form, kind);
      setErrors(e);
      if (hasErrors(e)) return false;
      await saveCard({ kind, label: form.label.trim(), number: form.number.replace(/\s/g, '').toUpperCase() }, editingId ?? undefined);
      setOpen(false);
      return true;
    },
    remove: (cid: string) => deleteCard(cid),
  };
}
