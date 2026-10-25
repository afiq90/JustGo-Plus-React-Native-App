import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors, { fonts, px } from '@/constants/colors';
import { LocalizedText as Text } from '@/components/LocalizedText';
import { RedHeader } from '@/components/ui';
import { useApp } from '@/viewmodels/AppContext';

const C = colors.light;

export default function LanguageScreen() {
  const { data, setLanguage } = useApp();
  const choices = [
    { value: 'en' as const, label: 'English' },
    { value: 'ms' as const, label: 'Bahasa Melayu' },
  ];

  return (
    <View style={s.root}>
      <RedHeader title="Language settings" onBack={() => router.back()} />
      <View style={s.content}>
        <Text style={s.description}>Choose the language for the app.</Text>
        <View style={s.card}>
          {choices.map((choice, index) => {
            const selected = data.language === choice.value;
            return (
              <Pressable
                key={choice.value}
                testID={`language-${choice.value}`}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => { void setLanguage(choice.value); }}
                style={[s.row, index > 0 && s.divider]}
              >
                <Text style={[s.label, selected && s.selected]}>{choice.label}</Text>
                {selected ? <Feather name="check-circle" size={23} color={C.primary} /> : <View style={s.emptyRadio} />}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  content: { padding: px(22), paddingTop: px(30) },
  description: { fontFamily: fonts.regular, fontSize: px(16), color: C.mutedForeground, marginBottom: px(16) },
  card: { backgroundColor: C.card, borderRadius: px(12), paddingHorizontal: px(18) },
  row: { minHeight: px(68), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: C.border },
  label: { fontFamily: fonts.regular, fontSize: px(18), color: C.foreground },
  selected: { fontFamily: fonts.semibold, color: C.primary },
  emptyRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: C.border },
});
