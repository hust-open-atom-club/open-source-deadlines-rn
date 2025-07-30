import React from 'react';
import { ScrollView, StyleSheet, type ScrollViewProps, View } from 'react-native';

// ScrollAreaProps 继承自 ScrollViewProps，允许传入所有 ScrollView 的标准属性
interface ScrollAreaProps extends ScrollViewProps {
  // 可以在这里添加自定义的 props，如果需要的话
}

const ScrollArea = React.forwardRef<ScrollView, ScrollAreaProps>(
  ({ style, contentContainerStyle, children, ...props }, ref) => {
    return (
      <View style={[styles.container, style]}>
        <ScrollView
          ref={ref}
          horizontal={true} // 明确设置为水平滚动
          showsHorizontalScrollIndicator={true} // 始终显示水平滚动条
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          {...props}
        >
          {children}
        </ScrollView>
      </View>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

const styles = StyleSheet.create({
  container: {
    flex: 1, // 使滚动区域占据父容器的可用空间
    position: 'relative', // 对应 web 的 'relative'
  },
  contentContainer: {
    // 这里可以为滚动内容本身设置样式，例如内边距
    paddingVertical: 4,
  },
});

// React Native 中不需要单独的 ScrollBar 组件，因为它由 ScrollView 管理。
// 如果需要高度自定义的滚动条，通常需要更复杂的实现或第三方库。
// 但对于大多数情况，原生的滚动条已经足够。

export { ScrollArea };
