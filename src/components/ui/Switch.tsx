import React from 'react';
import { Switch as RNSwitch, StyleSheet, type SwitchProps as RNSwitchProps } from 'react-native';

// 定义一些基础颜色
const colors = {
  primary: '#007AFF',
  input: '#E5E7EB', // Unchecked background
  background: '#FFFFFF', // Thumb color when unchecked
  foreground: '#000000', // Thumb color when unchecked in dark mode (not implemented)
  primaryForeground: '#FFFFFF', // Thumb color when checked
};

interface SwitchProps extends RNSwitchProps {}

const Switch: React.FC<SwitchProps> = ({ ...props }) => {
  return (
    <RNSwitch
      trackColor={{ false: colors.input, true: colors.primary }}
      thumbColor={props.value ? colors.primaryForeground : colors.background}
      ios_backgroundColor={colors.input}
      style={styles.switch}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    // The size of the Switch is controlled by the platform, but we can apply transforms
    // For example: transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    // However, for a simple conversion, we'll stick to the default size.
  },
});

export { Switch };
