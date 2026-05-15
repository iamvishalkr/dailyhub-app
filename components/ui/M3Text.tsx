import { useThemeStore } from '@/zustand/theme';
import React from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';

export function M3Text({ className, style, ...props }: TextProps) {
    const {theme} = useThemeStore()
  return (
    <Text
      className={`${theme} text-on-background ${className ?? ''}`}
      style={[{ fontFamily: 'SpaceMono' }, style]}
      {...props}
    />
  );
}