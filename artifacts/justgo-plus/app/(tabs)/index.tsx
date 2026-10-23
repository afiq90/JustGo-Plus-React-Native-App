import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors, { fonts, px } from '@/constants/colors';
import { BridgeArt, CardArt, CarArt, GiftArt, HeaderBands, IdCardArt, MailArt, MarketplaceArt, PhoneArt } from '@/components/Art';
import { BottomSheet, Notice, PrimaryButton, ProgressRing, StepRow, useTopInset } from '@/components/ui';
import { useProfileProgress } from '@/viewmodels/useProfileProgress';
import { StepKey } from '@/models';
import { tap, warn } from '@/services/haptics';

const C = colors.light;

const STEP_ICON: Record<StepKey, (muted: boolean) => React.ReactNode> = {
  mobile: () => <PhoneArt size={px(34)} />,
  email: () => <MailArt size={px(32)} />,
  identity: () => <IdCardArt size={px(32)} />,
  payment: (m) => <CardArt size={px(32)} muted={m} />,
  vehicle: (m) => <CarArt size={px(32)} muted={m} />,
};

export default function HomeScreen() {
  const vm = useProfileProgress();
  const top = useTopInset();
  const { width } = useWindowDimensions();
  const [gate, setGate] = useState<null | 'vehicle' | 'payment'>(null);
  const headerH = top + px(92);
  const overlayH = headerH + px(86) + px(26);

  const onStep = (key: StepKey) => {
    if (key === 'mobile' || key === 'email') router.push('/profile');
    else if (key === 'identity') router.push('/identity');
    else { warn(); setGate(key); }
  };

  return (
    <View style={s.root}>
      <ScrollView contentContainerStyle={{ paddingTop: overlayH - px(10), paddingBottom: px(40) }} showsVerticalScrollIndicator={false}>
        <View style={s.pad}>
          <Text style={s.h2}>Finish Your Profile</Text>
          <Pressable testID="profile-toggle" onPress={() => { tap(); vm.toggle(); }} style={s.progressRow}>
            <ProgressRing percent={vm.percent} />
            <View style={{ flex: 1, marginLeft: px(16) }}>
              <Text style={s.stepsDone}><Text style={{ fontFamily: fonts.bold }}>{vm.done}/{vm.total}</Text> Steps completed</Text>
              <Text style={s.stepsBody}>Complete the first 3 steps to verify your identity and the remaining ones for Automatic Number Plate Recognition (ANPR) toll payment</Text>
            </View>
            <Feather name={vm.expanded ? 'chevron-up' : 'chevron-down'} size={22} color="#666" style={{ marginLeft: 6 }} />
          </Pressable>
          {vm.expanded ? (
            <View style={{ marginTop: px(22) }}>
              {vm.steps.map((st) => (
                <StepRow
                  key={st.key}
                  testID={'step-' + st.key}
                  label={st.label}
                  icon={STEP_ICON[st.key](!st.enabled)}
                  state={st.done ? 'done' : st.enabled ? 'active' : 'disabled'}
                  onPress={() => onStep(st.key)}
                />
              ))}
            </View>
          ) : null}
          <View style={s.divider} />
          <Text style={s.h2}>Jimat Di Penang</Text>
          <View style={s.promo}>
            <View style={s.promoLeft}>
              <Text style={s.promoKicker}>Promotion Program</Text>
              <Text style={s.promoTitle}>Enjoy <Text style={s.promoEm}>20% Discount</Text>{'\n'}On Penang Bridge Toll</Text>
              <Pressable testID="promo-apply" onPress={() => { tap(); router.push({ pathname: '/info/[slug]', params: { slug: 'penang-promo' } }); }} style={s.applyWrap}>
                <LinearGradient colors={['#D9343B', '#E8242B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.apply}>
                  <Text style={s.applyText}>Apply Now</Text>
                  <Feather name="arrow-right" size={18} color="#FFF" />
                </LinearGradient>
              </Pressable>
            </View>
            <View style={s.promoArt}><BridgeArt width={px(200)} height={px(152)} /></View>
          </View>
          <View style={s.divider} />
          <Text style={s.h2}>Keep Discovering</Text>
          <View style={s.discoverRow}>
            {[
              { slug: 'marketplace', title: 'Marketplace', Art: MarketplaceArt },
              { slug: 'rewards', title: 'Redeem\nReward', Art: GiftArt },
            ].map(({ slug, title, Art }) => (
              <Pressable key={slug} testID={'discover-' + slug} onPress={() => { tap(); router.push({ pathname: '/info/[slug]', params: { slug } }); }} style={({ pressed }) => [s.discover, pressed && { opacity: 0.85 }]}>
                <LinearGradient colors={['#C42F36', '#B8262D']} style={StyleSheet.absoluteFill} />
                <View style={s.discoverArt}><Art width={px(202)} height={px(150)} /></View>
                <Text style={s.discoverTitle}>{title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View pointerEvents="box-none" style={[s.overlay, { height: overlayH }]}>
        <LinearGradient colors={[C.header, '#DD474D', 'rgba(255,255,255,0.98)', '#FFFFFF']} locations={[0, 0.55, 0.86, 1]} style={StyleSheet.absoluteFill} />
        <HeaderBands width={width} height={headerH} />
        <View style={[s.greetRow, { paddingTop: top, height: headerH }]}>
          <Text style={s.greet} numberOfLines={1}>Hi, {vm.name}</Text>
          <Pressable testID="home-notifications" onPress={() => { tap(); router.push('/notifications'); }} style={s.bell}>
            <Feather name="bell" size={22} color="#FFF" />
          </Pressable>
        </View>
        <View style={s.quick}>
          <Pressable testID="quick-add-vehicle" style={s.quickItem} onPress={() => { warn(); setGate('vehicle'); }}>
            <CarArt size={px(32)} />
            <Feather name="plus-circle" size={20} color="#6D6D6D" style={{ marginLeft: px(14) }} />
            <Text style={s.quickText}>Add Vehicle</Text>
          </Pressable>
          <View style={s.quickDivider} />
          <Pressable testID="quick-add-payment" style={s.quickItem} onPress={() => { warn(); setGate('payment'); }}>
            <CardArt size={px(30)} />
            <Feather name="plus-circle" size={20} color="#6D6D6D" style={{ marginLeft: px(14) }} />
            <Text style={s.quickText}>Add{'\n'}payment</Text>
          </Pressable>
        </View>
      </View>

      <BottomSheet visible={gate !== null} onClose={() => setGate(null)} title={vm.identityVerified ? 'Service not connected' : 'Verify your identity first'} testID="gate-sheet">
        {vm.identityVerified ? (
          <Notice tone="warn" text="ANPR enrolment needs the live toll service, which is not connected in this build." />
        ) : (
          <Notice tone="warn" text={(gate === 'vehicle' ? 'Adding an ANPR vehicle' : 'Adding a payment method') + ' unlocks after Complete Identity Verification. Identity verification needs an eKYC provider that is not connected in this build.'} />
        )}
        <PrimaryButton testID="gate-identity" label={vm.identityVerified ? 'Close' : 'View identity verification'} onPress={() => { const v = vm.identityVerified; setGate(null); if (!v) router.push('/identity'); }} />
      </BottomSheet>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { paddingHorizontal: px(20) },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0 },
  greetRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: px(30), paddingBottom: px(6) },
  greet: { flex: 1, color: '#FFF', fontFamily: fonts.bold, fontSize: px(22.5), marginTop: px(20) },
  bell: { width: px(46), height: px(46), borderRadius: px(23), borderWidth: 2, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginTop: px(20) },
  quick: { marginHorizontal: px(19), height: px(86), backgroundColor: '#FFF', borderRadius: px(16), flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  quickItem: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: px(20) },
  quickText: { fontFamily: fonts.medium, fontSize: px(18.5), color: '#6D6D6D', marginLeft: px(4), lineHeight: px(23) },
  quickDivider: { width: 1.5, height: px(46), backgroundColor: '#DCDCDC' },
  h2: { fontFamily: fonts.bold, fontSize: px(20), color: '#111', marginBottom: px(12) },
  progressRow: { flexDirection: 'row', alignItems: 'flex-start' },
  stepsDone: { fontFamily: fonts.medium, fontSize: px(17.5), color: '#C21F2A' },
  stepsBody: { fontFamily: fonts.regular, fontSize: px(14), color: '#111', lineHeight: px(19), marginTop: 2 },
  divider: { height: 1.5, backgroundColor: '#DCDCDC', marginTop: px(10), marginBottom: px(26) },
  promo: { flexDirection: 'row', height: px(154), borderRadius: px(16), backgroundColor: '#FFF', overflow: 'hidden', marginHorizontal: px(4), marginBottom: px(40), shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 4 },
  promoLeft: { width: '56%', paddingTop: px(16), zIndex: 2 },
  promoKicker: { fontFamily: fonts.medium, fontSize: px(12.5), color: '#777', paddingHorizontal: px(21) },
  promoTitle: { fontFamily: fonts.regular, fontSize: px(17), color: '#111', lineHeight: px(25), marginTop: px(8), paddingHorizontal: px(21) },
  promoEm: { color: '#C8102E', fontFamily: fonts.bold, textDecorationLine: 'underline' },
  applyWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRightRadius: px(8), overflow: 'hidden' },
  apply: { height: px(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: px(28) },
  applyText: { color: '#FFF', fontFamily: fonts.semibold, fontSize: px(15.5) },
  promoArt: { position: 'absolute', right: 0, top: 0, bottom: 0, width: px(200) },
  discoverRow: { flexDirection: 'row', gap: px(20), paddingHorizontal: px(4) },
  discover: { flex: 1, height: px(212), borderRadius: px(16), overflow: 'hidden' },
  discoverArt: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  discoverTitle: { fontFamily: fonts.semibold, fontSize: px(17), color: 'rgba(255,255,255,0.72)', margin: px(21), lineHeight: px(24) },
});
