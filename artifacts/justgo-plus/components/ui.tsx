import React from 'react';
import { ActivityIndicator, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TextInputProps, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import colors, { fonts, px } from '@/constants/colors';
import { HeaderBands } from '@/components/Art';
import { tap } from '@/services/haptics';

const C = colors.light;

export function CreatorBanner() {
  return (
    <View accessibilityLabel="This app was created by Afiq" style={s.creatorBanner}>
      <Text style={s.creatorBannerText}>
        This app was created by <Text style={s.creatorBannerName}>Afiq</Text>
      </Text>
    </View>
  );
}

export function useTopInset() {
  const insets = useSafeAreaInsets();
  return Platform.OS === 'web' ? 67 : insets.top;
}
export function useBottomInset() {
  const insets = useSafeAreaInsets();
  return Platform.OS === 'web' ? 34 : insets.bottom;
}

/** Flat red title bar used on Transactions / e-Invoice / Me and all stack screens. */
export function RedHeader({ title, onBack, right }: { title: string; onBack?: () => void; right?: React.ReactNode }) {
  const top = useTopInset();
  const { width } = useWindowDimensions();
  return (
    <View style={[s.header, { paddingTop: top }]}>
      <HeaderBands width={width} height={top + px(108)} />
      <CreatorBanner />
      <View style={s.headerRow}>
        <View style={s.headerSide}>
          {onBack ? (
            <Pressable testID="header-back" hitSlop={12} onPress={() => { tap(); onBack(); }}>
              <Feather name="chevron-left" size={28} color={C.primaryForeground} />
            </Pressable>
          ) : null}
        </View>
        <Text style={s.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={[s.headerSide, { alignItems: 'flex-end' }]}>{right}</View>
      </View>
    </View>
  );
}

export function ProgressRing({ percent, size = px(62) }: { percent: number; size?: number }) {
  const stroke = px(7);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={C.ringTrack} strokeWidth={stroke} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={r} stroke={C.ringFill} strokeWidth={stroke} fill="none"
        strokeDasharray={`${circ} ${circ}`} strokeDashoffset={circ * (1 - percent / 100)}
        transform={`rotate(90 ${size / 2} ${size / 2})`}
      />
      <SvgText x={size / 2} y={size / 2 + px(6)} fontSize={px(16.5)} fontFamily={fonts.bold} fontWeight="700" fill="#8E1A20" textAnchor="middle">{`${percent}%`}</SvgText>
    </Svg>
  );
}

export type StepState = 'done' | 'active' | 'disabled';

export function StepRow({ label, icon, state, onPress, testID, labelSize = px(16.5) }: { label: string; icon: React.ReactNode; state: StepState; onPress: () => void; testID: string; labelSize?: number }) {
  return (
    <Pressable
      testID={testID}
      onPress={() => { tap(); onPress(); }}
      style={({ pressed }) => [s.step, state === 'done' && s.stepDone, state === 'active' && s.stepActive, state === 'disabled' && s.stepDisabled, pressed && { opacity: 0.75 }]}
    >
      <View style={s.stepIcon}>{icon}</View>
      <Text style={[s.stepLabel, { fontSize: labelSize }, state === 'disabled' && { color: C.subtle }]}>{label}</Text>
      {state === 'done' ? (
        <View style={s.check}><Feather name="check" size={14} color="#FFF" /></View>
      ) : (
        <View style={s.chev}><Feather name="chevron-right" size={13} color="#FFF" /></View>
      )}
    </Pressable>
  );
}

export function MenuRow({ label, icon, onPress, testID, destructive }: { label: string; icon: React.ReactNode; onPress: () => void; testID: string; destructive?: boolean }) {
  return (
    <Pressable testID={testID} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [s.menu, pressed && { backgroundColor: '#ECECEC' }]}>
      <View style={s.menuIcon}>{icon}</View>
      <Text style={[s.menuLabel, destructive && { color: C.destructive }]}>{label}</Text>
      <Feather name="chevron-right" size={26} color="#555" />
    </Pressable>
  );
}

export function PrimaryButton({ label, onPress, testID, loading, disabled, style, upper }: { label: string; onPress: () => void; testID: string; loading?: boolean; disabled?: boolean; style?: ViewStyle; upper?: boolean }) {
  return (
    <Pressable testID={testID} disabled={disabled || loading} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [s.primaryWrap, style, (pressed || disabled) && { opacity: disabled ? 0.5 : 0.85 }]}>
      <LinearGradient colors={['#EE3B40', '#D8232A', '#B71E24']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.primary}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={[s.primaryText, upper && { fontFamily: fonts.bold, fontSize: px(17) }]}>{label}</Text>}
      </LinearGradient>
    </Pressable>
  );
}

export function OutlineButton({ label, onPress, testID, icon, style }: { label: string; onPress: () => void; testID: string; icon?: React.ReactNode; style?: ViewStyle }) {
  return (
    <Pressable testID={testID} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [s.outline, style, pressed && { backgroundColor: C.muted }]}>
      {icon ? <View style={{ width: px(48), alignItems: 'center' }}>{icon}</View> : null}
      <Text style={[s.outlineText, !icon && { textAlign: 'center', flex: 1 }]}>{label}</Text>
    </Pressable>
  );
}

export function Field({ error, label, ...props }: TextInputProps & { error?: string; label?: string }) {
  return (
    <View style={{ marginBottom: px(20) }}>
      {label ? <Text style={s.fieldLabel}>{label}</Text> : null}
      <TextInput placeholderTextColor="#C2C2C2" {...props} style={[s.field, !!error && { borderColor: C.destructive }, props.style]} />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </View>
  );
}

export function Notice({ text, tone = 'info', onDismiss, testID }: { text: string; tone?: 'info' | 'warn' | 'ok'; onDismiss?: () => void; testID?: string }) {
  const bg = tone === 'ok' ? '#EAF6EF' : tone === 'warn' ? C.accent : '#F1F4FA';
  const fg = tone === 'ok' ? C.success : tone === 'warn' ? C.accentForeground : '#2D4A7A';
  return (
    <View style={[s.notice, { backgroundColor: bg }]} testID={testID}>
      <Feather name={tone === 'ok' ? 'check-circle' : 'info'} size={18} color={fg} style={{ marginTop: 1 }} />
      <Text style={[s.noticeText, { color: fg }]}>{text}</Text>
      {onDismiss ? (
        <Pressable testID={(testID ?? 'notice') + '-dismiss'} hitSlop={10} onPress={onDismiss}><Feather name="x" size={18} color={fg} /></Pressable>
      ) : null}
    </View>
  );
}

export function BottomSheet({ visible, onClose, title, children, testID }: { visible: boolean; onClose: () => void; title: string; children: React.ReactNode; testID: string }) {
  const bottom = useBottomInset();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable testID={testID + '-backdrop'} style={s.backdrop} onPress={onClose} />
      <View style={[s.sheet, { paddingBottom: bottom + px(20) }]} testID={testID}>
        <View style={s.grabber} />
        <View style={s.sheetHead}>
          <Text style={s.sheetTitle}>{title}</Text>
          <Pressable testID={testID + '-close'} hitSlop={10} onPress={onClose}><Feather name="x" size={22} color={C.foreground} /></Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

export function OptionRow({ label, selected, onPress, testID }: { label: string; selected: boolean; onPress: () => void; testID: string }) {
  return (
    <Pressable testID={testID} onPress={() => { tap(); onPress(); }} style={s.option}>
      <Text style={[s.optionText, selected && { color: C.primary, fontFamily: fonts.semibold }]}>{label}</Text>
      <View style={[s.radio, selected && { borderColor: C.primary }]}>{selected ? <View style={s.radioDot} /> : null}</View>
    </Pressable>
  );
}

export function SectionTitle({ children, style }: { children: React.ReactNode; style?: object }) {
  return <Text style={[s.section, style]}>{children}</Text>;
}

export function DemoBadge({ text = 'LOCAL DEMO DATA' }: { text?: string }) {
  return <View style={s.badge}><Text style={s.badgeText}>{'\u2022 '}{text}</Text></View>;
}

export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },
  pad: { paddingHorizontal: px(20) },
  body: { fontFamily: fonts.regular, fontSize: px(16), color: C.foreground, lineHeight: px(24) },
  muted: { fontFamily: fonts.regular, fontSize: px(15), color: C.mutedForeground, lineHeight: px(22) },
});

const s = StyleSheet.create({
  header: { backgroundColor: C.header, overflow: 'hidden' },
  creatorBanner: { minHeight: px(28), alignItems: 'center', justifyContent: 'center', paddingHorizontal: px(12), backgroundColor: C.creatorBanner },
  creatorBannerText: { color: C.success, fontFamily: fonts.medium, fontSize: px(14), letterSpacing: 0.2 },
  creatorBannerName: { color: C.success, fontFamily: fonts.bold },
  headerRow: { height: px(78), flexDirection: 'row', alignItems: 'center', paddingHorizontal: px(16) },
  headerSide: { width: px(56), justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', color: C.primaryForeground, fontFamily: fonts.medium, fontSize: px(22) },
  step: { flexDirection: 'row', alignItems: 'center', borderRadius: px(10), minHeight: px(58), paddingHorizontal: px(14), marginBottom: px(12), borderWidth: 1, borderColor: 'transparent' },
  stepDone: { backgroundColor: C.accent },
  stepActive: { backgroundColor: C.background, borderColor: C.border },
  stepDisabled: { backgroundColor: C.secondary, borderColor: C.border },
  stepIcon: { width: px(64), alignItems: 'center' },
  stepLabel: { flex: 1, fontFamily: fonts.regular, color: '#333', marginLeft: px(12) },
  check: { width: px(24), height: px(24), borderRadius: px(12), backgroundColor: C.destructive, alignItems: 'center', justifyContent: 'center' },
  chev: { width: px(24), height: px(24), borderRadius: px(12), backgroundColor: C.chevronCircle, alignItems: 'center', justifyContent: 'center' },
  menu: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: px(10), minHeight: px(76), paddingHorizontal: px(20), marginBottom: px(11) },
  menuIcon: { width: px(56) },
  menuLabel: { flex: 1, fontFamily: fonts.regular, fontSize: px(18), color: '#222', paddingVertical: px(10), lineHeight: px(24) },
  primaryWrap: { borderRadius: px(14), shadowColor: '#B71E24', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  primary: { height: px(66), borderRadius: px(14), alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFF', fontFamily: fonts.medium, fontSize: px(21) },
  outline: { flexDirection: 'row', alignItems: 'center', height: px(66), borderRadius: px(14), borderWidth: 1, borderColor: C.border, paddingHorizontal: px(14), marginBottom: px(12), backgroundColor: C.background },
  outlineText: { fontFamily: fonts.semibold, fontSize: px(17.5), color: '#111', marginLeft: px(6) },
  fieldLabel: { fontFamily: fonts.medium, fontSize: px(15), color: '#444', marginBottom: px(8) },
  field: { height: px(62), borderRadius: px(16), borderWidth: 1, borderColor: C.input, paddingHorizontal: px(20), fontFamily: fonts.regular, fontSize: px(17), color: C.foreground, backgroundColor: C.background },
  error: { color: C.destructive, fontFamily: fonts.regular, fontSize: px(13.5), marginTop: px(6), marginLeft: px(4) },
  notice: { flexDirection: 'row', gap: 10, padding: px(14), borderRadius: px(12), marginBottom: px(14), alignItems: 'flex-start' },
  noticeText: { flex: 1, fontFamily: fonts.regular, fontSize: px(14.5), lineHeight: px(21) },
  backdrop: { flex: 1, backgroundColor: C.overlay },
  sheet: { backgroundColor: C.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: px(22), paddingTop: 8 },
  grabber: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: '#D5D5D5', marginBottom: 10 },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 18, color: C.foreground },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: C.border },
  optionText: { fontFamily: fonts.regular, fontSize: 16, color: C.foreground },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#C4C4C4', alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: C.primary },
  section: { fontFamily: fonts.bold, fontSize: px(20), color: '#111', marginBottom: px(12) },
  badge: { backgroundColor: '#E9E9E9', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  badgeText: { fontFamily: fonts.bold, fontSize: px(14), color: '#6D6D6D', letterSpacing: 0.4 },
});
