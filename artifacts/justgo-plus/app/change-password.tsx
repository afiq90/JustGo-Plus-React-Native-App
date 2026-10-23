import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { Notice, OutlineButton, RedHeader, useBottomInset } from '@/components/ui';

const C = colors.light;

export default function ChangePasswordScreen() {
  const bottom = useBottomInset();
  return (
    <View style={s.root}>
      <RedHeader title="Change Password" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }]}>
        <View style={s.icon}><Feather name="lock" size={40} color={C.primary} /></View>
        <Text style={s.title}>Password changes happen with PLUSMiles</Text>
        <Text style={s.body}>Your JustGo sign-in uses your PLUSMiles account. Changing its password requires the PLUSMiles authentication service to confirm your current password and send a one-time code.</Text>
        <Notice tone="warn" text="That service is not connected in this demo build, so there is no password to change. This app never asks for or stores passwords." />
        <OutlineButton testID="password-faq" label="Read the FAQ" onPress={() => router.push({ pathname: '/info/[slug]', params: { slug: 'faq' } })} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(22) },
  icon: { width: 84, height: 84, borderRadius: 42, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 20 },
  title: { fontFamily: fonts.bold, fontSize: 20, color: '#111', textAlign: 'center' },
  body: { fontFamily: fonts.regular, fontSize: 15.5, color: '#555', lineHeight: 23, textAlign: 'center', marginTop: 10, marginBottom: 20 },
});
