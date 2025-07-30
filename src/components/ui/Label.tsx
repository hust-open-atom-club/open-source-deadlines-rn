import React from 'react';
import { Text, StyleSheet, type TextProps } from 'react-native';

const colors = {
  foreground: '#000000',
};

interface LabelProps extends TextProps {
  disabled?: boolean;
}

const Label: React.FC<LabelProps> = ({ style, disabled, ...props }) => {
  const labelStyle = [
    styles.base,
    disabled && styles.disabled,
    style,
  ];

  return <Text style={labelStyle} {...props} />;
};

const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Label };
