import { useThemeStore } from '@/zustand/theme';
import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

export function M3View({ className, ...props }: ViewProps) {
    const {theme} = useThemeStore()
  return (
    <View
      className={`${theme} bg-background ${className ?? ''}`}
      {...props}
    />
  );
}