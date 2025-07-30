import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type GestureResponderEvent,
} from 'react-native';

// 定义一些基础颜色，与 Badge 组件保持一致
const colors = {
  primary: '#007AFF',
  primaryForeground: '#FFFFFF',
  secondary: '#6c757d',
  secondaryForeground: '#FFFFFF',
  destructive: '#dc3545',
  destructiveForeground: '#FFFFFF',
  background: '#F8F9FA',
  accent: '#E9ECEF',
  accentForeground: '#000000',
  border: '#E5E7EB',
  link: '#007AFF',
};

interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  onPress,
  disabled,
  style,
  textStyle,
  children,
}) => {
  const containerStyle = [
    styles.baseContainer,
    variantStyles[variant].container,
    sizeStyles[size].container,
    disabled && styles.disabled,
    style,
  ];

  const contentStyle = [
    styles.baseText,
    variantStyles[variant].text,
    sizeStyles[size].text,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={contentStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  baseText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles = {
  default: StyleSheet.create({
    container: { backgroundColor: colors.primary },
    text: { color: colors.primaryForeground },
  }),
  destructive: StyleSheet.create({
    container: { backgroundColor: colors.destructive },
    text: { color: colors.destructiveForeground },
  }),
  outline: StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    text: { color: colors.accentForeground },
  }),
  secondary: StyleSheet.create({
    container: { backgroundColor: colors.secondary },
    text: { color: colors.secondaryForeground },
  }),
  ghost: StyleSheet.create({
    container: { backgroundColor: 'transparent' },
    text: { color: colors.accentForeground },
  }),
  link: StyleSheet.create({
    container: { backgroundColor: 'transparent' },
    text: { color: colors.link, textDecorationLine: 'underline' },
  }),
};

const sizeStyles = {
  default: StyleSheet.create({
    container: { height: 36 },
    text: {},
  }),
  sm: StyleSheet.create({
    container: { height: 32, paddingHorizontal: 12, borderRadius: 6 },
    text: { fontSize: 12 },
  }),
  lg: StyleSheet.create({
    container: { height: 40, paddingHorizontal: 24, borderRadius: 6 },
    text: { fontSize: 16 },
  }),
  icon: StyleSheet.create({
    container: { width: 36, height: 36, paddingHorizontal: 0 },
    text: {},
  }),
};

export { Button };
