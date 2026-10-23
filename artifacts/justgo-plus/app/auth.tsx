import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import colors, { fonts, px } from '@/constants/colors';
import { HeaderBands, JustGoLogo } from '@/components/Art';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { CreatorBanner, useBottomInset, useTopInset } from '@/components/ui';
import { AuthTab } from '@/viewmodels/useAuthViewModel';
import { useApp } from '@/viewmodels/AppContext';
import { success, tap } from '@/services/haptics';

const C = colors.light;

export default function AuthScreen() {
  const [tab, setTab] = useState<AuthTab>('login');
  const { signIn } = useApp();
  const top = useTopInset();
  const bottom = useBottomInset();
  const { width } = useWindowDimensions();

  const enterDemo = async () => {
    await signIn();
    success();
    router.replace('/');
  };
  const info = (slug: string) => router.push({ pathname: '/info/[slug]', params: { slug } });

  return (
    <View style={s.root}>
      <View style={[s.hero, { paddingTop: top }]}>
        <HeaderBands width={width} height={top + px(260)} />
        <CreatorBanner />
        <Text style={s.hey}>Hey!</Text>
        <View style={s.welcomeRow}>
          <Text style={s.welcome}>Welcome to</Text>
          <JustGoLogo width={px(176)} />
        </View>
      </View>
      <KeyboardAwareScrollViewCompat
        style={s.sheet}
        contentContainerStyle={[s.sheetContent, { paddingBottom: bottom + px(16) }]}
        keyboardShouldPersistTaps="handled"
        bottomOffset={24}
      >
        <View style={s.segment}>
          {(['login', 'register'] as AuthTab[]).map((k) => (
            <Pressable key={k} testID={'auth-tab-' + k} onPress={() => { tap(); setTab(k); }} style={[s.segItem, tab === k && s.segOn]}>
              <Text style={s.segText}>{k === 'login' ? 'Login' : 'Register'}</Text>
            </Pressable>
          ))}
        </View>
        {tab === 'login' ? <LoginForm onDemo={enterDemo} /> : <RegisterForm onDemo={enterDemo} />}
        <View style={{ flex: 1 }} />
        <View style={s.footer}>
          <Text style={s.footText}>
            JustGO <Text testID="foot-jg-terms" style={s.footLink} onPress={() => info('justgo-terms')}>T&C</Text>{' '}
            <Text testID="foot-contact" style={s.footLink} onPress={() => info('contact')}>Contact Us</Text> | PLUSMiles{' '}
            <Text testID="foot-pm-terms" style={s.footLink} onPress={() => info('plusmiles-terms')}>T&C</Text>{' '}
            <Text testID="foot-pm-privacy" style={s.footLink} onPress={() => info('plusmiles-privacy')}>Privacy Policy</Text>
          </Text>
          <Text style={s.version}>v1.1.11</Text>
        </View>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.header },
  hero: { paddingHorizontal: px(39), paddingBottom: px(50), overflow: 'hidden' },
  hey: { color: '#FFF', fontFamily: fonts.semibold, fontSize: px(34), marginTop: px(30) },
  welcomeRow: { flexDirection: 'row', alignItems: 'center', marginTop: px(8) },
  welcome: { color: '#FFF', fontFamily: fonts.medium, fontSize: px(34), marginRight: px(20) },
  sheet: { flex: 1, backgroundColor: C.background, borderTopLeftRadius: px(36), borderTopRightRadius: px(36) },
  sheetContent: { flexGrow: 1, paddingHorizontal: px(38), paddingTop: px(18) },
  segment: { flexDirection: 'row', backgroundColor: '#F4F4F4', borderRadius: px(14), padding: px(8), marginBottom: px(16) },
  segItem: { flex: 1, height: px(44), borderRadius: px(10), alignItems: 'center', justifyContent: 'center' },
  segOn: { backgroundColor: '#FFF' },
  segText: { fontFamily: fonts.semibold, fontSize: px(17.5), color: '#111' },
  footer: { alignItems: 'center', marginTop: px(24) },
  footText: { fontFamily: fonts.regular, fontSize: px(15), color: '#111', textAlign: 'center' },
  footLink: { color: C.linkRed },
  version: { fontFamily: fonts.medium, fontSize: px(15), color: '#888', marginTop: px(8) },
});
