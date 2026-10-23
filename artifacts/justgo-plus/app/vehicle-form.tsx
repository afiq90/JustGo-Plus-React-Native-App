import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import colors, { px } from '@/constants/colors';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { ConfirmSheet } from '@/components/ConfirmSheet';
import { Field, OutlineButton, PrimaryButton, RedHeader, useBottomInset } from '@/components/ui';
import { useVehicleFormViewModel } from '@/viewmodels/useEntityForms';
import { success, warn } from '@/services/haptics';

const C = colors.light;

export default function VehicleFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const vm = useVehicleFormViewModel(id ? String(id) : undefined);
  const bottom = useBottomInset();
  const [confirm, setConfirm] = useState<boolean>(false);
  return (
    <View style={s.root}>
      <RedHeader title={vm.isEdit ? 'Edit Vehicle' : 'Add Vehicle'} onBack={() => router.back()} right={vm.isEdit ? (
        <Pressable testID="vehicle-delete-header" hitSlop={10} onPress={() => setConfirm(true)}><Feather name="trash-2" size={22} color="#FFF" /></Pressable>
      ) : undefined} />
      <KeyboardAwareScrollViewCompat contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }]} keyboardShouldPersistTaps="handled" bottomOffset={24}>
        <Field testID="vehicle-plate" label="Plate number" placeholder="WXY 1234" autoCapitalize="characters" value={vm.form.plate} onChangeText={(v) => vm.set('plate', v)} error={vm.errors.plate} />
        <Field testID="vehicle-make" label="Make" placeholder="Perodua" value={vm.form.make} onChangeText={(v) => vm.set('make', v)} error={vm.errors.make} />
        <Field testID="vehicle-model" label="Model" placeholder="Myvi" value={vm.form.model} onChangeText={(v) => vm.set('model', v)} error={vm.errors.model} />
        <Field testID="vehicle-color" label="Colour (optional)" placeholder="Granite Grey" value={vm.form.color} onChangeText={(v) => vm.set('color', v)} />
        <PrimaryButton testID="vehicle-save" label={vm.isEdit ? 'Save Changes' : 'Add Vehicle'} loading={vm.saving} onPress={async () => { if (await vm.save()) { success(); router.back(); } else warn(); }} />
        {vm.isEdit ? <OutlineButton testID="vehicle-delete" label="Delete Vehicle" onPress={() => setConfirm(true)} style={{ marginTop: 12 }} /> : null}
      </KeyboardAwareScrollViewCompat>
      <ConfirmSheet visible={confirm} testID="vehicle-confirm" title="Delete vehicle?" message={'Remove ' + vm.form.plate + ' from this device?'} confirmLabel="Delete" onCancel={() => setConfirm(false)} onConfirm={async () => { setConfirm(false); await vm.remove(); success(); router.back(); }} />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(22) },
});
