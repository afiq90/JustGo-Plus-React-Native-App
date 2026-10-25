import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { MailArt, MalaysiaFlag, MyDigitalIdMark, PlusMilesMark } from '@/components/Art';
import { Field, Notice, OutlineButton, PrimaryButton } from '@/components/ui';
import { useLoginViewModel } from '@/viewmodels/useAuthViewModel';
import { tap, warn } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';
import { translateText } from '@/constants/i18n';
import { useApp } from '@/viewmodels/AppContext';

const C = colors.light;

export function LoginForm({ onDemo }: { onDemo: () => void }) {
  const vm = useLoginViewModel();
  const { data } = useApp();
  return (
    <View>
      <View style={s.withRow}>
        <Text style={s.with}>You can login with </Text>
        <PlusMilesMark height={px(22)} />
        <Text style={s.with}> account</Text>
      </View>

      {vm.mode === 'phone' ? (
        <>
          <View style={[s.phone, !!vm.error && { borderColor: C.destructive }]}>
            <Pressable testID="login-country" onPress={() => { tap(); vm.countryInfo(); }} style={s.country}>
              <MalaysiaFlag size={px(28)} />
              <Text style={s.cc}>+60</Text>
              <Feather name="chevron-down" size={16} color="#111" />
            </Pressable>
            <TextInput
              testID="login-phone"
              style={s.phoneInput}
              placeholder={translateText(data.language, 'Phone number')}
              placeholderTextColor="#C2C2C2"
              keyboardType="phone-pad"
              maxLength={11}
              value={vm.phone}
              onChangeText={vm.setPhone}
            />
          </View>
          {vm.error ? <Text style={s.err}>{vm.error}</Text> : null}
          <PrimaryButton testID="login-request-otp" label="Request OTP" loading={vm.busy} onPress={() => { if (!vm.requestOtp()) warn(); }} style={{ marginTop: px(18) }} />
        </>
      ) : (
        <>
          <Field testID="login-email" placeholder="Email address" keyboardType="email-address" autoCapitalize="none" autoComplete="email" value={vm.email} onChangeText={vm.setEmail} />
          <Field testID="login-password" placeholder="Password" secureTextEntry value={vm.password} onChangeText={vm.setPassword} error={vm.error ?? undefined} />
          <PrimaryButton testID="login-email-submit" label="Login" loading={vm.busy} onPress={() => { if (!vm.emailLogin()) warn(); }} />
        </>
      )}

      {vm.notice ? <View style={{ marginTop: px(16) }}><Notice testID="login-notice" tone="warn" text={vm.notice} onDismiss={vm.dismissNotice} /></View> : null}

      <View style={s.orRow}>
        <View style={s.line} /><Text style={s.or}>Or continue with</Text><View style={s.line} />
      </View>
      {vm.mode === 'phone' ? (
        <OutlineButton testID="login-with-email" label="Continue with Email" icon={<View style={s.mailBox}><MailArt size={px(30)} /></View>} onPress={() => vm.setMode('email')} />
      ) : (
        <OutlineButton testID="login-with-phone" label="Continue with Phone" icon={<Feather name="smartphone" size={26} color={C.primary} />} onPress={() => vm.setMode('phone')} />
      )}
      <OutlineButton testID="login-mydigital" label="Continue with MyDigital ID" icon={<MyDigitalIdMark size={px(38)} />} onPress={vm.myDigitalId} />

      <Pressable testID="login-demo" onPress={() => { tap(); onDemo(); }} style={s.demo}>
        <Feather name="play-circle" size={18} color={C.primary} />
        <Text style={s.demoText}>Explore demo with sample data (no sign-in)</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  withRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: px(16) },
  with: { fontFamily: fonts.regular, fontSize: px(17), color: '#666' },
  phone: { flexDirection: 'row', height: px(64), borderRadius: px(16), borderWidth: 1, borderColor: C.input, overflow: 'hidden' },
  country: { width: px(134), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: px(10), borderRightWidth: 1, borderRightColor: C.input },
  cc: { fontFamily: fonts.semibold, fontSize: px(17), color: '#111' },
  phoneInput: { flex: 1, paddingHorizontal: px(18), fontFamily: fonts.regular, fontSize: px(17), color: '#111' },
  err: { color: C.destructive, fontFamily: fonts.regular, fontSize: px(13.5), marginTop: 6, marginLeft: 4 },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: px(22) },
  line: { flex: 1, height: 1, backgroundColor: '#CFCFCF' },
  or: { fontFamily: fonts.regular, fontSize: px(15), color: '#666', marginHorizontal: px(18) },
  mailBox: { backgroundColor: '#FDEDEE', borderRadius: 6, padding: 4 },
  demo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: px(14), marginTop: px(4), borderRadius: px(12), borderWidth: 1, borderStyle: 'dashed', borderColor: '#E7A6A9', backgroundColor: C.accent },
  demoText: { fontFamily: fonts.semibold, fontSize: px(15.5), color: C.accentForeground },
});
