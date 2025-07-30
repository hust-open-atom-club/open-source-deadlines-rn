import React, { useState } from 'react';
import { TextInput, StyleSheet, type TextInputProps, View, type ViewStyle } from 'react-native';

// 定义一些基础颜色
const colors = {
  foreground: '#000000',
  mutedForeground: '#6c757d',
  primary: '#007AFF',
  destructive: '#dc3545',
  border: '#E5E7EB',
  ring: '#007AFF', // For focus ring color
  background: 'transparent',
};

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ style, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = [
    styles.base,
    isFocused && styles.focused,
    props.editable === false && styles.disabled,
    error && styles.error,
    style,
  ];

  return (
    <View style={containerStyle}>
        <TextInput
            style={styles.input}
            placeholderTextColor={colors.mutedForeground}
            onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
            }}
            onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
            }}
            {...props}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38, // h-9 equivalent
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: colors.foreground,
    padding: 0, // Remove default padding
  },
  focused: {
    borderColor: colors.ring,
    borderWidth: 2, // Simulates ring effect
  },
  disabled: {
    opacity: 0.5,
  },
  error: {
    borderColor: colors.destructive,
  },
});

export { Input };
