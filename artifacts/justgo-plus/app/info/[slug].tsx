import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { RedHeader, PrimaryButton, useBottomInset } from '@/components/ui';
import { INFO_PAGES } from '@/services/content';

const C = colors.light;

export default function InfoScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const page = INFO_PAGES[String(slug)];
  const bottom = useBottomInset();
  const back = () => (router.canGoBack() ? router.back() : router.replace('/'));
  if (!page) {
    return (
      <View style={s.root}>
        <RedHeader title="Not found" onBack={back} />
        <View style={s.missing}>
          <Feather name="file-text" size={40} color={C.subtle} />
          <Text style={s.missingText}>This page is not available.</Text>
          <PrimaryButton testID="info-missing-back" label="Go back" onPress={back} style={{ alignSelf: 'stretch' }} />
        </View>
      </View>
    );
  }
  return (
    <View style={s.root}>
      <RedHeader title={page.title} onBack={back} />
      <ScrollView contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }]}>
        <Text style={s.kicker}>{page.kicker.toUpperCase()}</Text>
        <Text style={s.title}>{page.title}</Text>
        {page.sections.map((sec, i) => (
          <View key={i} style={[s.block, i === 0 && s.lead]}>
            {sec.heading ? <Text style={s.h}>{sec.heading}</Text> : null}
            <Text style={s.body}>{sec.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(22) },
  kicker: { fontFamily: fonts.bold, fontSize: 12, letterSpacing: 1.2, color: C.primary },
  title: { fontFamily: fonts.bold, fontSize: 24, color: '#111', marginTop: 6, marginBottom: 18 },
  block: { marginBottom: 18 },
  lead: { backgroundColor: C.card, borderRadius: 12, padding: 16 },
  h: { fontFamily: fonts.semibold, fontSize: 16.5, color: '#111', marginBottom: 6 },
  body: { fontFamily: fonts.regular, fontSize: 15.5, lineHeight: 23, color: '#444' },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  missingText: { fontFamily: fonts.medium, fontSize: 16, color: C.mutedForeground },
});
