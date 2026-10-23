import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { IdCardArt } from '@/components/Art';
import { Notice, PrimaryButton, RedHeader, useBottomInset } from '@/components/ui';
import { warn } from '@/services/haptics';

const C = colors.light;
const STEPS = ['Scan the front and back of your MyKad or passport', 'Take a live selfie for face matching', 'Wait for the provider to confirm your identity'];

export default function IdentityScreen() {
  const bottom = useBottomInset();
  const [tried, setTried] = useState<boolean>(false);
  return (
    <View style={s.root}>
      <RedHeader title="Identity Verification" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }]}>
        <View style={s.hero}><IdCardArt size={96} /></View>
        <Text style={s.title}>Complete Identity Verification</Text>
        <Text style={s.body}>Verifying your identity unlocks payment methods, ANPR vehicles and monthly e-Invoices. It usually involves:</Text>
        {STEPS.map((t, i) => (
          <View key={t} style={s.step}>
            <View style={s.num}><Text style={s.numText}>{i + 1}</Text></View>
            <Text style={s.stepText}>{t}</Text>
          </View>
        ))}
        {tried ? <Notice testID="identity-unavailable" tone="warn" text="The eKYC provider is not connected in this build, so verification cannot start. Nothing was captured or sent, and your status stays incomplete." /> : null}
        <PrimaryButton testID="identity-start" label="Start verification" onPress={() => { warn(); setTried(true); }} />
        <View style={s.lock}>
          <Feather name="shield" size={14} color={C.mutedForeground} />
          <Text style={s.lockText}>This demo never stores identification numbers or images.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(22) },
  hero: { alignItems: 'center', backgroundColor: C.accent, borderRadius: 16, paddingVertical: 28, marginBottom: 20 },
  title: { fontFamily: fonts.bold, fontSize: 21, color: '#111' },
  body: { fontFamily: fonts.regular, fontSize: 15.5, color: '#555', lineHeight: 23, marginTop: 8, marginBottom: 16 },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  num: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.destructive, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  numText: { fontFamily: fonts.bold, color: '#FFF', fontSize: 14 },
  stepText: { flex: 1, fontFamily: fonts.regular, fontSize: 15.5, color: '#222' },
  lock: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 16 },
  lockText: { fontFamily: fonts.regular, fontSize: 13, color: C.mutedForeground },
});
