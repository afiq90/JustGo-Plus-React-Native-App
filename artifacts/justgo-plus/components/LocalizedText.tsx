import React from 'react';
import { Text as NativeText, TextProps } from 'react-native';
import { translateText } from '@/constants/i18n';
import { useApp } from '@/viewmodels/AppContext';

export function LocalizedText({ children, ...props }: TextProps) {
  const { data } = useApp();
  const childrenInLanguage = React.Children.map(children, (child) =>
    typeof child === 'string' ? translateText(data.language, child) : child,
  );
  return <NativeText {...props}>{childrenInLanguage}</NativeText>;
}
