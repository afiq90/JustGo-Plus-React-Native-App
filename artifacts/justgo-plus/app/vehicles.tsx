import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors, { fonts, px } from '@/constants/colors';
import { CarArt } from '@/components/Art';
import { Notice, PrimaryButton, RedHeader, useBottomInset } from '@/components/ui';
import { useApp } from '@/viewmodels/AppContext';
import { tap } from '@/services/haptics';
import { LocalizedText as Text } from '@/components/LocalizedText';

const C = colors.light;

export default function VehiclesScreen() {
  const { data } = useApp();
  const bottom = useBottomInset();
  const add = () => router.push('/vehicle-form');
  return (
    <View style={s.root}>
      <RedHeader title="Vehicles" onBack={() => router.back()} right={
        <Pressable testID="vehicles-add-header" hitSlop={10} onPress={() => { tap(); add(); }}><Feather name="plus" size={26} color="#FFF" /></Pressable>
      } />
      <FlatList
        data={data.vehicles}
        keyExtractor={(v) => v.id}
        scrollEnabled={data.vehicles.length > 0}
        contentContainerStyle={[s.pad, { paddingBottom: bottom + 24 }, data.vehicles.length === 0 && { flexGrow: 1 }]}
        ListHeaderComponent={<Notice text="Vehicles here are local demo records on this device. They are not enrolled for ANPR toll payment." />}
        ListEmptyComponent={
          <View style={s.empty}>
            <CarArt size={84} muted />
            <Text style={s.emptyTitle}>No vehicles yet</Text>
            <Text style={s.emptyBody}>Add a vehicle to keep its plate handy.</Text>
            <PrimaryButton testID="vehicles-add" label="Add Vehicle" onPress={add} style={{ alignSelf: 'stretch', marginTop: 20 }} />
          </View>
        }
        renderItem={({ item }) => (
          <Pressable testID={'vehicle-' + item.id} onPress={() => { tap(); router.push({ pathname: '/vehicle-form', params: { id: item.id } }); }} style={({ pressed }) => [s.row, pressed && { opacity: 0.8 }]}>
            <CarArt size={40} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={s.plate}>{item.plate}</Text>
              <Text style={s.meta}>{[item.make, item.model, item.color].filter(Boolean).join(' \u00B7 ')}</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#555" />
          </Pressable>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  pad: { padding: px(20) },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 10, padding: 16, marginBottom: 11 },
  plate: { fontFamily: fonts.bold, fontSize: 17, color: '#111', letterSpacing: 1 },
  meta: { fontFamily: fonts.regular, fontSize: 14, color: C.mutedForeground, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontFamily: fonts.semibold, fontSize: 19, color: '#444', marginTop: 18 },
  emptyBody: { fontFamily: fonts.regular, fontSize: 15, color: C.mutedForeground, marginTop: 6 },
});
