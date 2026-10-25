import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { EmptyReceiptArt } from '@/components/Art';
import { BottomSheet, Notice, OptionRow, OutlineButton, PrimaryButton, RedHeader } from '@/components/ui';
import { RANGE_OPTIONS, STATUS_OPTIONS, TYPE_OPTIONS, useTransactionsViewModel } from '@/viewmodels/useTransactionsViewModel';
import { tap, warn } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;

export default function TransactionsScreen() {
  const vm = useTransactionsViewModel();
  const [downloadOpen, setDownloadOpen] = React.useState<boolean>(false);
  return (
    <View style={s.root}>
      <RedHeader
        title="Transactions"
        right={
          <Pressable testID="txn-download" hitSlop={10} onPress={() => { warn(); setDownloadOpen(true); }}>
            <Feather name="download" size={26} color="#FFF" />
          </Pressable>
        }
      />
      <View style={s.pad}>
        <Text style={s.hint}>Only ANPR transactions will be displayed here.</Text>
        <View style={s.filters}>
          <Pressable testID="txn-date" onPress={() => { tap(); vm.openDate(); }} style={[s.select, { flex: 1.25 }]}>
            <Text style={s.selectText} numberOfLines={1}>{vm.rangeLabel}</Text>
            <Feather name="chevron-down" size={22} color="#111" />
          </Pressable>
          <Pressable testID="txn-more-filters" onPress={() => { tap(); vm.openFilters(); }} style={[s.select, { flex: 0.72, justifyContent: 'center' }]}>
            <Text style={[s.selectText, { color: '#555' }]}>More Filters{vm.activeFilters ? ' (' + vm.activeFilters + ')' : ''}</Text>
            <Feather name="chevron-down" size={22} color="#111" style={{ marginLeft: 4 }} />
          </Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={s.empty} scrollEnabled={vm.items.length > 0}>
        <EmptyReceiptArt width={px(240)} />
        <Text style={s.emptyTitle}>No transactions</Text>
        <Text style={s.emptyBody}>No transaction record(s). Try out our ANPR at selected toll plazas.</Text>
      </ScrollView>

      <BottomSheet visible={vm.sheet === 'date'} onClose={vm.close} title="Date range" testID="date-sheet">
        {RANGE_OPTIONS.map((o) => (
          <OptionRow key={o.key} testID={'range-' + o.key} label={o.label} selected={vm.draft.range === o.key} onPress={() => vm.setDraft({ ...vm.draft, range: o.key })} />
        ))}
        <PrimaryButton testID="date-apply" label="Apply" onPress={vm.apply} style={{ marginTop: px(22) }} />
      </BottomSheet>

      <BottomSheet visible={vm.sheet === 'filters'} onClose={vm.close} title="More Filters" testID="filter-sheet">
        <Text style={s.group}>Transaction type</Text>
        <View style={s.chips}>
          {TYPE_OPTIONS.map((o) => (
            <Chip key={o.key} testID={'type-' + o.key} label={o.label} on={vm.draft.type === o.key} onPress={() => vm.setDraft({ ...vm.draft, type: o.key })} />
          ))}
        </View>
        <Text style={s.group}>Status</Text>
        <View style={s.chips}>
          {STATUS_OPTIONS.map((o) => (
            <Chip key={o.key} testID={'status-' + o.key} label={o.label} on={vm.draft.status === o.key} onPress={() => vm.setDraft({ ...vm.draft, status: o.key })} />
          ))}
        </View>
        <PrimaryButton testID="filter-apply" label="Apply Filters" onPress={vm.apply} style={{ marginTop: px(18) }} />
        <OutlineButton testID="filter-reset" label="Reset" onPress={vm.reset} style={{ marginTop: px(12) }} />
      </BottomSheet>

      <BottomSheet visible={downloadOpen} onClose={() => setDownloadOpen(false)} title="Download statement" testID="download-sheet">
        <Notice tone="warn" text={'There are no transactions between ' + vm.rangeLabel + ', so there is nothing to download. No file was created.'} />
        <PrimaryButton testID="download-ok" label="OK" onPress={() => setDownloadOpen(false)} />
      </BottomSheet>
    </View>
  );
}

function Chip({ label, on, onPress, testID }: { label: string; on: boolean; onPress: () => void; testID: string }) {
  return (
    <Pressable testID={testID} onPress={() => { tap(); onPress(); }} style={[s.chip, on && s.chipOn]}>
      <Text style={[s.chipText, on && { color: C.primary, fontFamily: fonts.semibold }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { paddingHorizontal: px(20) },
  hint: { fontFamily: fonts.regular, fontSize: px(15.5), color: '#8A8A8A', marginTop: px(14) },
  filters: { flexDirection: 'row', gap: px(10), marginTop: px(12) },
  select: { height: px(52), borderRadius: px(10), borderWidth: 1, borderColor: C.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: px(10) },
  selectText: { fontFamily: fonts.regular, fontSize: px(15.5), color: '#222', flexShrink: 1 },
  empty: { flexGrow: 1, alignItems: 'center', paddingTop: px(110), paddingHorizontal: px(40) },
  emptyTitle: { fontFamily: fonts.medium, fontSize: px(21), color: '#555', marginTop: px(90) },
  emptyBody: { fontFamily: fonts.regular, fontSize: px(15.5), color: '#8A8A8A', textAlign: 'center', marginTop: px(20), lineHeight: px(22) },
  group: { fontFamily: fonts.semibold, fontSize: 15, color: '#333', marginTop: 14, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: C.border },
  chipOn: { borderColor: C.primary, backgroundColor: C.accent },
  chipText: { fontFamily: fonts.regular, fontSize: 14.5, color: '#333' },
});
