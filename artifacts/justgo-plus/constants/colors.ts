/**
 * JustGo Plus theme tokens, sampled from the supplied reference screenshots.
 * Screenshot width 472px maps to a 393pt device, so spacing uses S = 393/472.
 */
const palette = {
  text: '#1C1C1E',
  tint: '#D93A41',
  background: '#FFFFFF',
  foreground: '#1C1C1E',
  card: '#F4F4F4',
  cardForeground: '#1C1C1E',
  primary: '#E2262C',
  primaryDark: '#C11F25',
  primaryForeground: '#FFFFFF',
  header: '#DA3A41',
  headerLight: '#E25A60',
  secondary: '#F5F5F5',
  secondaryForeground: '#1C1C1E',
  muted: '#F2F2F2',
  mutedForeground: '#8E8E93',
  subtle: '#B4B4B4',
  accent: '#FDF1F1',
  accentForeground: '#B71C22',
  destructive: '#E5373D',
  destructiveForeground: '#FFFFFF',
  border: '#DADADA',
  input: '#D6D6D6',
  linkRed: '#C8102E',
  ringTrack: '#B9A2C8',
  ringFill: '#C21F2A',
  tabBar: '#333333',
  tabInactive: '#FFFFFF',
  tabActive: '#EE4B52',
  chevronCircle: '#D4D4D4',
  plusBlue: '#1C4FA0',
  creatorBanner: '#F0F8F3',
  overlay: 'rgba(0,0,0,0.45)',
  success: '#2E8B57',
};

const colors = {
  light: palette,
  radius: 12,
};

export const S = 393 / 472;
export const px = (v: number) => Math.round(v * S * 10) / 10;

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export default colors;
