import React from 'react';
import { View, Text, StyleSheet, type ViewProps, type TextProps } from 'react-native';

// 定义一些基础颜色
const colors = {
  card: '#FFFFFF',
  cardForeground: '#000000',
  mutedForeground: '#6c757d',
  border: '#E5E7EB',
};

const Card: React.FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.card, style]} {...props} />
);

const CardHeader: React.FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.cardHeader, style]} {...props} />
);

const CardTitle: React.FC<TextProps> = ({ style, ...props }) => (
  <Text style={[styles.cardTitle, style]} {...props} />
);

const CardDescription: React.FC<TextProps> = ({ style, ...props }) => (
  <Text style={[styles.cardDescription, style]} {...props} />
);

// CardAction is a simple container for alignment purposes in the header
const CardAction: React.FC<ViewProps> = ({ style, ...props }) => (
    <View style={[styles.cardAction, style]} {...props} />
);

const CardContent: React.FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.cardContent, style]} {...props} />
);

const CardFooter: React.FC<ViewProps> = ({ style, ...props }) => (
  <View style={[styles.cardFooter, style]} {...props} />
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 24,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    // Shadow for Android
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24, // Replaces gap from parent Card
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardForeground,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 4,
  },
  cardAction: {
    // This view will align to the right in the header
  },
  cardContent: {
    paddingHorizontal: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 24,
    marginTop: 24,
  },
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
