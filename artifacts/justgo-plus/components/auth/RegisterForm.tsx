import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { BottomSheet, Field, Notice, OptionRow, OutlineButton, PrimaryButton } from '@/components/ui';
import { useRegisterViewModel } from '@/viewmodels/useAuthViewModel';
import { Nationality } from '@/models';
import { tap, warn } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;
const DOC_LABEL = { MYKAD: 'MYKAD', MYTENTERA: 'MYTENTERA', PASSPORT: 'PASSPORT' } as const;

export function RegisterForm({ onDemo }: { onDemo: () => void }) {
  const vm = useRegisterViewModel();
  const [picker, setPicker] = useState<null | 'nat' | 'doc'>(null);
  const info = (slug: string) => router.push({ pathname: '/info/[slug]', params: { slug } });

  return (
    <View>
      <View style={s.steps}>
        {[
          { label: 'Personal details', icon: 'user' as const },
          { label: 'Account details', icon: 'smartphone' as const },
        ].map((st, i) => {
          const on = vm.step === i;
          return (
            <Pressable key={st.label} testID={'reg-step-' + i} onPress={() => { if (i === 0) vm.setStep(0); else if (vm.step === 0) { if (!vm.next()) warn(); } }} style={s.stepTab}>
              <View style={s.stepHead}>
                <View style={[s.stepIcon, on ? { backgroundColor: C.destructive } : { backgroundColor: '#BDBDBD' }]}>
                  <Feather name={st.icon} size={13} color="#FFF" />
                </View>
                <Text style={[s.stepLabel, !on && { color: '#AAA' }]}>{st.label}</Text>
              </View>
              <View style={[s.stepBar, on && { backgroundColor: C.destructive }]} />
            </Pressable>
          );
        })}
      </View>

      {vm.step === 0 ? (
        <>
          <Pressable testID="reg-nationality" onPress={() => { tap(); setPicker('nat'); }} style={s.select}>
            <Text style={s.selectText}>{vm.nationality}</Text>
            <Feather name="chevron-down" size={24} color="#111" />
          </Pressable>
          <Pressable testID="reg-document" onPress={() => { tap(); if (vm.documentOptions.length > 1) setPicker('doc'); }} style={s.select}>
            <Text style={s.selectText}>{DOC_LABEL[vm.documentType]}</Text>
            {vm.documentOptions.length > 1 ? <Feather name="chevron-down" size={24} color="#111" /> : null}
          </Pressable>
          <Field testID="reg-name" placeholder="Name as per Identification Document" autoCapitalize="characters" value={vm.name} onChangeText={vm.setName} error={vm.personalErrors.name} />
          <Field testID="reg-id" placeholder={vm.documentType === 'PASSPORT' ? 'Passport Number' : 'Identification Number'} keyboardType={vm.documentType === 'MYKAD' ? 'number-pad' : 'default'} autoCapitalize="characters" maxLength={14} value={vm.idNumber} onChangeText={vm.setIdNumber} error={vm.personalErrors.idNumber} />
          <View style={[s.consent, !!vm.personalErrors.consent && { borderWidth: 1, borderColor: C.destructive }]}>
            <Switch testID="reg-consent" value={vm.consent} onValueChange={(v) => { tap(); vm.setConsent(v); }} trackColor={{ false: '#E3E3E3', true: '#E2363C' }} thumbColor="#FFFFFF" ios_backgroundColor="#E3E3E3" />
            <Text style={s.consentText}>
              By signing up, I agree to PLUSMiles'{' '}
              <Text style={s.link} onPress={() => info('plusmiles-terms')}>Terms & Conditions</Text>,{' '}
              <Text style={s.link} onPress={() => info('plusmiles-privacy')}>Privacy Policy</Text> and JustGo's{' '}
              <Text style={s.link} onPress={() => info('justgo-terms')}>Terms & Conditions</Text>
            </Text>
          </View>
          {vm.personalErrors.consent ? <Text style={s.err}>{vm.personalErrors.consent}</Text> : null}
          <PrimaryButton testID="reg-next" label="NEXT" upper onPress={() => { if (!vm.next()) warn(); }} style={{ marginTop: px(20) }} />
        </>
      ) : (
        <>
          <Field testID="reg-email" label="Email address" placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" value={vm.email} onChangeText={vm.setEmail} error={vm.accountErrors.email} />
          <Field testID="reg-phone" label="Mobile number (+60)" placeholder="12 345 6789" keyboardType="phone-pad" maxLength={11} value={vm.phone} onChangeText={vm.setPhone} error={vm.accountErrors.phone} />
          <Notice text="Passwords and OTP verification are handled by the PLUSMiles service, which is not connected here. This form only checks the format of your details." />
          {vm.result ? (
            <>
              <Notice testID="reg-result" tone="warn" text={vm.result} />
              <PrimaryButton testID="reg-use-demo" label="Use name & contact in demo" onPress={async () => { await vm.useAsDemo(); onDemo(); }} />
              <OutlineButton testID="reg-back" label="Back" onPress={() => { vm.clearResult(); vm.setStep(0); }} style={{ marginTop: px(12) }} />
            </>
          ) : (
            <>
              <PrimaryButton testID="reg-submit" label="REGISTER" upper loading={vm.busy} onPress={() => { if (!vm.submit()) warn(); }} />
              <OutlineButton testID="reg-back" label="Back" onPress={() => vm.setStep(0)} style={{ marginTop: px(12) }} />
            </>
          )}
        </>
      )}

      <BottomSheet visible={picker === 'nat'} onClose={() => setPicker(null)} title="Nationality" testID="nat-sheet">
        {(['MALAYSIAN', 'NON-MALAYSIAN'] as Nationality[]).map((n) => (
          <OptionRow key={n} testID={'nat-' + n} label={n} selected={vm.nationality === n} onPress={() => { vm.setNationality(n); setPicker(null); }} />
        ))}
      </BottomSheet>
      <BottomSheet visible={picker === 'doc'} onClose={() => setPicker(null)} title="Identification document" testID="doc-sheet">
        {vm.documentOptions.map((d) => (
          <OptionRow key={d} testID={'doc-' + d} label={DOC_LABEL[d]} selected={vm.documentType === d} onPress={() => { vm.setDocumentType(d); setPicker(null); }} />
        ))}
      </BottomSheet>
    </View>
  );
}

const s = StyleSheet.create({
  steps: { flexDirection: 'row', gap: px(10), marginBottom: px(28) },
  stepTab: { flex: 1 },
  stepHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: px(8), marginBottom: px(10) },
  stepIcon: { width: px(24), height: px(24), borderRadius: px(12), alignItems: 'center', justifyContent: 'center' },
  stepLabel: { fontFamily: fonts.regular, fontSize: px(16), color: '#222' },
  stepBar: { height: px(5), borderRadius: 3, backgroundColor: '#DADADA' },
  select: { height: px(62), borderRadius: px(16), borderWidth: 1, borderColor: C.input, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: px(20), marginBottom: px(20) },
  selectText: { fontFamily: fonts.regular, fontSize: px(16.5), color: '#222' },
  consent: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.accent, borderRadius: px(14), paddingVertical: px(12), paddingHorizontal: px(10), gap: px(16) },
  consentText: { flex: 1, fontFamily: fonts.regular, fontSize: px(15), color: '#222', textAlign: 'center', lineHeight: px(21) },
  link: { color: C.linkRed },
  err: { color: C.destructive, fontFamily: fonts.regular, fontSize: px(13.5), marginTop: 6, marginLeft: 4 },
});
