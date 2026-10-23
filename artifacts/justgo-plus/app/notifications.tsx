import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts } from '@/constants/colors';
import { RedHeader } from '@/components/ui';

const C = colors.light;

export default function NotificationsScreen() {
  return (
    <View style={s.root}>
      <RedHeader title="Notifications" onBack={() => router.back()} />
      <View style={s.empty}>
        <View style={s.icon}><Feather name="bell" size={34} color={C.primary} /></View>
        <Text style={s.title}>You're all caught up</Text>
        <Text style={s.body}>Toll alerts and e-Invoice notices appear here once the live service is connected.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  icon: { width: 76, height: 76, borderRadius: 38, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: fonts.semibold, fontSize: 19, color: '#333', marginTop: 18 },
  body: { fontFamily: fonts.regular, fontSize: 15, color: C.mutedForeground, textAlign: 'center', marginTop: 8, lineHeight: 22 },
});
