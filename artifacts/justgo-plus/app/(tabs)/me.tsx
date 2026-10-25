import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { MenuRow, RedHeader, SectionTitle } from '@/components/ui';
import { ConfirmSheet } from '@/components/ConfirmSheet';
import { useApp } from '@/viewmodels/AppContext';
import { success } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;
const I = 28;
const ic = '#222';

export default function MeScreen() {
  const { signOut, resetLocalDemo } = useApp();
  const [confirm, setConfirm] = useState<null | 'signout' | 'delete'>(null);
  const info = (slug: string) => router.push({ pathname: '/info/[slug]', params: { slug } });

  const doConfirm = async () => {
    const which = confirm;
    setConfirm(null);
    if (which === 'signout') await signOut();
    else await resetLocalDemo();
    success();
    router.replace('/auth');
  };

  return (
    <View style={s.root}>
      <RedHeader title="Me" />
      <ScrollView contentContainerStyle={s.pad} showsVerticalScrollIndicator={false}>
        <MenuRow testID="me-profile" label="My Profile" icon={<Feather name="user" size={I} color={ic} />} onPress={() => router.push('/profile')} />

        <View style={s.sectionRow}>
          <SectionTitle style={{ marginBottom: 0 }}>ANPR</SectionTitle>
          <View style={s.badge}><Text style={s.badgeText}>{'\u2022'} ONBOARDING</Text></View>
        </View>
        <MenuRow testID="me-payment" label="Payment Methods" icon={<MaterialCommunityIcons name="credit-card-outline" size={I + 2} color={ic} />} onPress={() => router.push('/payment-methods')} />
        <MenuRow testID="me-vehicles" label="Vehicles" icon={<Ionicons name="car-outline" size={I + 4} color={ic} />} onPress={() => router.push('/vehicles')} />

        <SectionTitle style={s.section}>e-Invoice</SectionTitle>
        <MenuRow testID="me-einvoice" label="e-Invoice Issuance" icon={<MaterialCommunityIcons name="file-document-outline" size={I + 2} color={ic} />} onPress={() => router.navigate('/einvoice')} />
        <MenuRow testID="me-tng" label="Touch 'n Go Cards" icon={<MaterialCommunityIcons name="contactless-payment" size={I} color={ic} />} onPress={() => router.push({ pathname: '/cards', params: { kind: 'tng' } })} />
        <MenuRow testID="me-rfid" label="RFID Tags" icon={<MaterialCommunityIcons name="access-point" size={I + 2} color={ic} />} onPress={() => router.push({ pathname: '/cards', params: { kind: 'rfid' } })} />

        <SectionTitle style={s.section}>General</SectionTitle>
        <MenuRow testID="me-language" label="Language" icon={<Feather name="globe" size={I} color={ic} />} onPress={() => router.push('/language')} />
        <MenuRow testID="me-password" label="Change Password" icon={<Feather name="lock" size={I} color={ic} />} onPress={() => router.push('/change-password')} />
        <MenuRow testID="me-pm-terms" label="PLUSMiles' Terms & Conditions" icon={<MaterialCommunityIcons name="shield-key-outline" size={I + 2} color={ic} />} onPress={() => info('plusmiles-terms')} />
        <MenuRow testID="me-pm-privacy" label="PLUSMiles' Privacy Policy" icon={<MaterialCommunityIcons name="script-text-outline" size={I + 2} color={ic} />} onPress={() => info('plusmiles-privacy')} />
        <MenuRow testID="me-jg-terms" label="JustGo's Terms & Conditions" icon={<MaterialCommunityIcons name="shield-key-outline" size={I + 2} color={ic} />} onPress={() => info('justgo-terms')} />
        <MenuRow testID="me-faq" label="FAQ" icon={<MaterialCommunityIcons name="chat-question-outline" size={I + 2} color={ic} />} onPress={() => info('faq')} />
        <MenuRow testID="me-contact" label="Contact Us" icon={<Feather name="phone-call" size={I - 2} color={ic} />} onPress={() => info('contact')} />
        <MenuRow testID="me-signout" label="Sign Out" icon={<Feather name="log-out" size={I - 2} color={ic} />} onPress={() => setConfirm('signout')} />
        <MenuRow testID="me-delete" label="Delete local JustGO demo data" icon={<Feather name="user-x" size={I} color={ic} />} onPress={() => setConfirm('delete')} />
        <Text style={s.version}>JustGo App (v1.1.11) {'\u00B7'} demo build</Text>
      </ScrollView>

      <ConfirmSheet
        visible={confirm !== null}
        testID="me-confirm"
        title={confirm === 'delete' ? 'Delete local demo data?' : 'Sign out?'}
        message={confirm === 'delete'
          ? 'This removes the sample profile, vehicles, cards, tags and filters saved on this device, then returns to the login screen. It does not delete any real JustGO or PLUSMiles account.'
          : 'You will return to the login screen. Your local demo data stays on this device.'}
        confirmLabel={confirm === 'delete' ? 'Delete local data' : 'Sign Out'}
        onConfirm={doConfirm}
        onCancel={() => setConfirm(null)}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { paddingHorizontal: px(20), paddingTop: px(44), paddingBottom: px(30) },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: px(36), marginBottom: px(10) },
  section: { marginTop: px(36), marginBottom: px(10) },
  badge: { backgroundColor: '#E9E9E9', borderRadius: 4, paddingHorizontal: px(10), paddingVertical: px(5) },
  badgeText: { fontFamily: fonts.bold, fontSize: px(15), color: '#6D6D6D', letterSpacing: 0.5 },
  version: { textAlign: 'right', fontFamily: fonts.regular, fontSize: px(14.5), color: '#777', marginTop: px(2) },
});
