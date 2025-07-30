import React from 'react';
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';

// 定义一些基础颜色，后续可以统一管理
const colors = {
  primary: '#007AFF',
  primaryForeground: '#FFFFFF',
  secondary: '#6c757d',
  secondaryForeground: '#FFFFFF',
  destructive: '#dc3545',
  destructiveForeground: '#FFFFFF',
  foreground: '#000000',
  border: '#E5E7EB',
};

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  style,
  textStyle,
  children,
}) => {
  const containerStyle = [
    styles.base,
    variantStyles[variant].container,
    style,
  ];

  const contentStyle = [
    styles.text,
    variantStyles[variant].text,
    textStyle,
  ];

  return (
    <View style={containerStyle}>
      <Text style={contentStyle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start', // 类似于 w-fit
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

const variantStyles = {
  default: StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderColor: 'transparent',
    },
    text: {
      color: colors.primaryForeground,
    },
  }),
  secondary: StyleSheet.create({
    container: {
      backgroundColor: colors.secondary,
      borderColor: 'transparent',
    },
    text: {
      color: colors.secondaryForeground,
    },
  }),
  destructive: StyleSheet.create({
    container: {
      backgroundColor: colors.destructive,
      borderColor: 'transparent',
    },
    text: {
      color: colors.destructiveForeground,
    },
  }),
  outline: StyleSheet.create({
    container: {
      borderColor: colors.border,
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.foreground,
    },
  }),
};

export { Badge };
