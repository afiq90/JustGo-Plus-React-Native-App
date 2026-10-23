import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export const tap = () => {
  if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {});
};
export const success = () => {
  if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
};
export const warn = () => {
  if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
};
