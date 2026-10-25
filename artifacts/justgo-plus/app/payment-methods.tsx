import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import colors, { fonts, px } from '@/constants/colors';
import { CardArt } from '@/components/Art';
import { Notice, PrimaryButton, RedHeader, useBottomInset } from '@/components/ui';
import { warn } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;

export default function PaymentMethodsScreen() {
  const bottom = useBottomInset();
  const [tried, setTried] = useState<boolean>(false);
  return (
    <View style={s.root}>
      <RedHeader title="Payment Methods" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }]}>
        <View style={s.empty}>
          <CardArt size={90} muted />
          <Text style={s.title}>No payment methods</Text>
          <Text style={s.body}>ANPR toll payment charges a linked card or e-wallet. Linking requires a verified identity and a connected payment gateway.</Text>
        </View>
        {tried ? <Notice testID="payment-unavailable" tone="warn" text="The payment gateway is not connected in this build. This app never asks for or stores card numbers, and no payment was set up." /> : null}
        <PrimaryButton testID="payment-add" label="Add payment method" onPress={() => { warn(); setTried(true); }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(22), flexGrow: 1 },
  empty: { alignItems: 'center', paddingVertical: 50 },
  title: { fontFamily: fonts.semibold, fontSize: 19, color: '#444', marginTop: 20 },
  body: { fontFamily: fonts.regular, fontSize: 15, color: C.mutedForeground, textAlign: 'center', marginTop: 8, lineHeight: 22 },
});
