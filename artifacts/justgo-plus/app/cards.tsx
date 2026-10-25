import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { ConfirmSheet } from '@/components/ConfirmSheet';
import { BottomSheet, Field, Notice, PrimaryButton, RedHeader, useBottomInset } from '@/components/ui';
import { useCardsViewModel } from '@/viewmodels/useEntityForms';
import { TollCardKind } from '@/models';
import { success, tap, warn } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;

export default function CardsScreen() {
  const params = useLocalSearchParams<{ kind?: string }>();
  const kind: TollCardKind = params.kind === 'rfid' ? 'rfid' : 'tng';
  const vm = useCardsViewModel(kind);
  const bottom = useBottomInset();
  const [del, setDel] = useState<string | null>(null);
  const title = kind === 'tng' ? "Touch 'n Go Cards" : 'RFID Tags';
  const noun = kind === 'tng' ? 'card' : 'tag';
  const icon = kind === 'tng' ? 'contactless-payment' : 'access-point';
  return (
    <View style={s.root}>
      <RedHeader title={title} onBack={() => router.back()} right={
        <Pressable testID="cards-add-header" hitSlop={10} onPress={() => { tap(); vm.startAdd(); }}><Feather name="plus" size={26} color="#FFF" /></Pressable>
      } />
      <FlatList
        data={vm.items}
        keyExtractor={(c) => c.id}
        scrollEnabled={vm.items.length > 0}
        contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }, vm.items.length === 0 && { flexGrow: 1 }]}
        ListHeaderComponent={<Notice text={'Saved ' + noun + 's are local demo records used to label e-Invoices later. Balances and reloads are not connected.'} />}
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialCommunityIcons name={icon} size={56} color={C.subtle} />
            <Text style={s.emptyTitle}>No {noun}s saved</Text>
            <PrimaryButton testID="cards-add" label={'Add ' + noun} onPress={vm.startAdd} style={{ alignSelf: 'stretch', marginTop: 20 }} />
          </View>
        }
        renderItem={({ item }) => (
          <View style={s.row}>
            <MaterialCommunityIcons name={icon} size={28} color="#222" />
            <Pressable testID={'card-edit-' + item.id} onPress={() => { tap(); vm.startEdit(item.id); }} style={{ flex: 1, marginLeft: 16 }}>
              <Text style={s.label}>{item.label}</Text>
              <Text style={s.meta}>{item.number.replace(/(.{4})/g, '$1 ').trim()}</Text>
            </Pressable>
            <Pressable testID={'card-delete-' + item.id} hitSlop={10} onPress={() => { warn(); setDel(item.id); }}><Feather name="trash-2" size={20} color="#777" /></Pressable>
          </View>
        )}
      />
      <BottomSheet visible={vm.open} onClose={vm.close} title={(vm.isEdit ? 'Edit ' : 'Add ') + noun} testID="card-sheet">
        <Field testID="card-label" label="Nickname" placeholder={kind === 'tng' ? 'Daily commute card' : 'Myvi tag'} value={vm.form.label} onChangeText={(v) => vm.set('label', v)} error={vm.errors.label} />
        <Field testID="card-number" label={kind === 'tng' ? 'Card serial number (10 digits)' : 'Tag ID'} keyboardType={kind === 'tng' ? 'number-pad' : 'default'} autoCapitalize="characters" maxLength={16} value={vm.form.number} onChangeText={(v) => vm.set('number', v)} error={vm.errors.number} />
        <PrimaryButton testID="card-save" label="Save" onPress={async () => { if (await vm.save()) success(); else warn(); }} />
      </BottomSheet>
      <ConfirmSheet visible={del !== null} testID="card-confirm" title={'Remove ' + noun + '?'} message={'This removes the ' + noun + ' from this device only.'} confirmLabel="Remove" onCancel={() => setDel(null)} onConfirm={async () => { const d = del; setDel(null); if (d) await vm.remove(d); success(); }} />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(20) },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 10, padding: 16, marginBottom: 11 },
  label: { fontFamily: fonts.semibold, fontSize: 16.5, color: '#111' },
  meta: { fontFamily: fonts.regular, fontSize: 14, color: C.mutedForeground, marginTop: 2, letterSpacing: 0.5 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontFamily: fonts.semibold, fontSize: 18, color: '#444', marginTop: 14 },
});
