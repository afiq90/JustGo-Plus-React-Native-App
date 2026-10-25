import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { CreatorBanner } from '@/components/ui';
import { LocalizedText as Text } from '@/components/LocalizedText';

export default function NotFoundScreen() {
  const colors = useColors();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <CreatorBanner />
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            This screen doesn&apos;t exist.
          </Text>

          <Link href="/" style={styles.link}>
            <Text style={[styles.linkText, { color: colors.primary }]}>
              Go to home screen!
            </Text>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
  },
});
