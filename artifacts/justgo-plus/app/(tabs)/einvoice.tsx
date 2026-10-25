import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import colors, { fonts, px } from '@/constants/colors';
import { IdCardArt, MailArt, PhoneArt } from '@/components/Art';
import { ProgressRing, RedHeader, StepRow } from '@/components/ui';
import { useProfileProgress } from '@/viewmodels/useProfileProgress';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;
const ICONS = [<PhoneArt key="p" size={px(36)} />, <MailArt key="m" size={px(32)} />, <IdCardArt key="i" size={px(32)} />];

export default function EInvoiceScreen() {
  const vm = useProfileProgress();
  return (
    <View style={s.root}>
      <RedHeader title="Monthly e-Invoice" />
      <ScrollView contentContainerStyle={s.pad}>
        <View style={s.progressRow}>
          <ProgressRing percent={vm.identityPercent} />
          <View style={{ flex: 1, marginLeft: px(10) }}>
            <Text style={s.done}><Text style={{ fontFamily: fonts.bold }}>{vm.identityDone}/3</Text> Steps completed</Text>
            <Text style={s.body}>Complete the following steps to verify your identity</Text>
          </View>
        </View>
        {vm.identitySteps.map((st, i) => (
          <StepRow
            key={st.key}
            testID={'einv-step-' + st.key}
            label={st.label}
            icon={ICONS[i]}
            labelSize={i === 0 ? px(17.5) : px(15)}
            state={st.done ? 'done' : 'active'}
            onPress={() => router.push(st.key === 'identity' ? '/identity' : '/profile')}
          />
        ))}
        {vm.identityVerified ? (
          <Text style={s.foot}>Monthly e-Invoices will appear here once the e-Invoice service is connected.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { paddingHorizontal: px(20), paddingTop: px(18), paddingBottom: px(40) },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: px(18) },
  done: { fontFamily: fonts.medium, fontSize: px(18), color: '#C21F2A' },
  body: { fontFamily: fonts.regular, fontSize: px(14.5), color: '#111', marginTop: 2 },
  foot: { fontFamily: fonts.regular, fontSize: 14, color: C.mutedForeground, marginTop: 12 },
});
