import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors, { fonts, px } from '@/constants/colors';
import { BottomSheet, OutlineButton, PrimaryButton } from '@/components/ui';

export function ConfirmSheet({ visible, title, message, confirmLabel, onConfirm, onCancel, testID }: {
  visible: boolean; title: string; message: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void; testID: string;
}) {
  return (
    <BottomSheet visible={visible} onClose={onCancel} title={title} testID={testID}>
      <Text style={s.msg}>{message}</Text>
      <View style={{ gap: px(4) }}>
        <PrimaryButton testID={testID + '-confirm'} label={confirmLabel} onPress={onConfirm} />
        <OutlineButton testID={testID + '-cancel'} label="Cancel" onPress={onCancel} style={{ marginTop: px(12) }} />
      </View>
    </BottomSheet>
  );
}

const s = StyleSheet.create({
  msg: { fontFamily: fonts.regular, fontSize: 15.5, lineHeight: 23, color: colors.light.mutedForeground, marginBottom: px(22), marginTop: 4 },
});
