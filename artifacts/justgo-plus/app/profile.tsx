import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { DemoBadge, Field, Notice, PrimaryButton, RedHeader, useBottomInset } from '@/components/ui';
import { useProfileViewModel } from '@/viewmodels/useEntityForms';
import { success, warn } from '@/services/haptics';

const C = colors.light;

export default function ProfileScreen() {
  const vm = useProfileViewModel();
  const bottom = useBottomInset();
  const [saved, setSaved] = useState<boolean>(false);
  const initials = vm.form.fullName.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
  return (
    <View style={s.root}>
      <RedHeader title="My Profile" onBack={() => router.back()} />
      <KeyboardAwareScrollViewCompat contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }]} keyboardShouldPersistTaps="handled" bottomOffset={24}>
        <View style={s.top}>
          <View style={s.avatar}><Text style={s.avatarText}>{initials || '?'}</Text></View>
          <DemoBadge />
        </View>
        <Field testID="profile-name" label="Full name" autoCapitalize="characters" value={vm.form.fullName} onChangeText={(v) => { setSaved(false); vm.set('fullName', v); }} error={vm.errors.fullName} />
        <Field testID="profile-email" label="Email" keyboardType="email-address" autoCapitalize="none" value={vm.form.email} onChangeText={(v) => { setSaved(false); vm.set('email', v); }} error={vm.errors.email} />
        <Field testID="profile-phone" label="Mobile number" keyboardType="phone-pad" value={vm.form.phone} onChangeText={(v) => { setSaved(false); vm.set('phone', v); }} error={vm.errors.phone} />
        <View style={s.statusCard}>
          {[
            ['Mobile number', vm.profile.mobileVerified],
            ['Email', vm.profile.emailVerified],
            ['Identity', vm.profile.identityVerified],
          ].map(([label, ok]) => (
            <View key={String(label)} style={s.statusRow}>
              <Text style={s.statusLabel}>{label}</Text>
              <View style={s.statusVal}>
                <Feather name={ok ? 'check-circle' : 'alert-circle'} size={16} color={ok ? C.success : C.mutedForeground} />
                <Text style={[s.statusText, { color: ok ? C.success : C.mutedForeground }]}>{ok ? 'Demo complete' : 'Not verified'}</Text>
              </View>
            </View>
          ))}
        </View>
        <Notice text="Edits are saved on this device only. Changing them here does not re-verify anything with a real provider." />
        {vm.saveError ? <Notice tone="warn" text={vm.saveError} /> : null}
        {saved ? <Notice tone="ok" text="Profile saved on this device." testID="profile-saved" /> : null}
        <PrimaryButton testID="profile-save" label="Save" loading={vm.saving} onPress={async () => { if (await vm.save()) { success(); setSaved(true); } else warn(); }} />
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(22) },
  top: { alignItems: 'center', gap: 12, marginBottom: 22 },
  avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.bold, fontSize: 26, color: C.primary },
  statusCard: { backgroundColor: C.card, borderRadius: 12, padding: 14, marginBottom: 14 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  statusLabel: { fontFamily: fonts.medium, fontSize: 15, color: '#333' },
  statusVal: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusText: { fontFamily: fonts.regular, fontSize: 14.5 },
});
