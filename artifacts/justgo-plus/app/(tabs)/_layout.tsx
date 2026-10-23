import React from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors, { fonts, px } from '@/constants/colors';
import { TabHome, TabInvoice, TabMe, TabTransactions } from '@/components/Art';
import { useApp } from '@/viewmodels/AppContext';
import { tap } from '@/services/haptics';

const C = colors.light;
type BottomTabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];
const ICONS = { index: TabHome, transactions: TabTransactions, einvoice: TabInvoice, me: TabMe } as const;
const LABELS: Record<string, string> = { index: 'Home', transactions: 'Transactions', einvoice: 'e-Invoice', me: 'Me' };

/** Dark bar recreated from the reference screenshots (intentionally not liquid glass). */
function DarkTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  return (
    <View style={[s.bar, isWeb ? { height: 84 } : { paddingBottom: insets.bottom, height: px(84) + insets.bottom }]}>
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const Icon = ICONS[route.name as keyof typeof ICONS];
        const color = focused ? C.tabActive : C.tabInactive;
        return (
          <Pressable
            key={route.key}
            testID={'tab-' + route.name}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            style={s.item}
            onPress={() => {
              tap();
              const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
            }}
          >
            {Icon ? <Icon color={color} active={focused} /> : null}
            <Text style={[s.label, { color }]}>{LABELS[route.name] ?? route.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  const { data, loading } = useApp();
  if (loading) {
    return <View style={s.loading}><ActivityIndicator color={C.primary} /></View>;
  }
  if (!data.signedIn) return <Redirect href="/auth" />;
  return (
    <Tabs tabBar={(p) => <DarkTabBar {...p} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="einvoice" />
      <Tabs.Screen name="me" />
    </Tabs>
  );
}

const s = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: C.tabBar, paddingTop: px(22) },
  item: { flex: 1, alignItems: 'center' },
  label: { fontFamily: fonts.semibold, fontSize: px(15), marginTop: px(5) },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.background },
});
