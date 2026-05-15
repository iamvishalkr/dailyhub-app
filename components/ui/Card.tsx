import { useThemeStore } from "@/zustand/theme";
import React from "react";
import type { TextStyle, ViewStyle } from "react-native";
import { Text, View } from "react-native";

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  className?: string | string[];
}

export function Card({ children, style, className }: CardProps) {
    const {theme} = useThemeStore()
  return (
    <View
      className={`${theme} bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden ${
        className ? className : ""
      }`}
      style={style}
    >
      {children}
    </View>
  );
}

// ─── CardHeader ──────────────────────────────────────────────────────────────

interface CardHeaderProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return (
    <View className="p-4 gap-1" style={style}>
      {children}
    </View>
  );
}

// ─── CardTitle ───────────────────────────────────────────────────────────────

interface CardTitleProps {
  children?: string | string[];
  style?: TextStyle | TextStyle[];
}

export function CardTitle({ children, style }: CardTitleProps) {
    const {theme} = useThemeStore()
  return (
    <Text
      className={`${theme} text-base font-semibold tracking-wide text-on-surface`}
      style={style}
    >
      {children}
    </Text>
  );
}

// ─── CardDescription ─────────────────────────────────────────────────────────

interface CardDescriptionProps {
  children?: string | string[];
  style?: TextStyle | TextStyle[];
}

export function CardDescription({ children, style }: CardDescriptionProps) {
    const {theme} = useThemeStore()
  return (
    <Text
      className={`${theme} text-sm font-normal tracking-wide text-on-surface-variant`}
      style={style}
    >
      {children}
    </Text>
  );
}

// ─── CardFooter ──────────────────────────────────────────────────────────────

interface CardFooterProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function CardFooter({ children, style }: CardFooterProps) {
    const {theme} = useThemeStore()
  return (
    <View
      className={`${theme} flex-row items-center gap-2 px-4 py-3 border-t border-outline-variant`}
      style={style}
    >
      {children}
    </View>
  );
}
