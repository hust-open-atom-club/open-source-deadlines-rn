import React from 'react';
import { Text, type TextProps } from 'react-native';

interface IconProps extends TextProps {
  name: 'Calendar' | 'MapPin' | 'Clock' | 'Star' | 'ExternalLink' | 'Search';
}

// 这是图标的临时占位符。
// 您可以将下载的 SVG 内容放入相应的 case 中。
export const Icon: React.FC<IconProps> = ({ name, style }) => {
  const getEmoji = () => {
    switch (name) {
      case 'Calendar':
        return '📅';
      case 'MapPin':
        return '📍';
      case 'Clock':
        return '🕒';
      case 'Star':
        return '⭐';
      case 'ExternalLink':
        return '🔗';
      case 'Search':
        return '🔍';
      default:
        return '❓';
    }
  };

  return <Text style={style}>{getEmoji()}</Text>;
};
