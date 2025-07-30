import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimelineEvent } from '../lib/data';
import { formatTimelineDate } from '../lib/utils';

export interface TimelineItemProps {
  event: TimelineEvent;
  isEnded: boolean;
  isActive?: boolean;
  isUpcoming?: boolean;
  totalEvents: number;
  index: number;
  onItemPress: (event: TimelineEvent, ref: React.RefObject<View>) => void;
}

export const TimelineItem = React.forwardRef<View, TimelineItemProps>(
  ({ event, isEnded, isActive = false, isUpcoming = false, totalEvents, index, onItemPress }, ref) => {
    const itemRef = useRef<View>(null);

    const handlePress = () => {
      if (!isEnded) {
        onItemPress(event, itemRef);
      }
    };

    // Calculate the position on the timeline (from 10% to 90%)
    const position = totalEvents > 1 ? (index / (totalEvents - 1)) * 80 + 10 : 50;

    const dotStyle = [
      styles.dotBase,
      isActive ? styles.dotActive : isUpcoming ? styles.dotUpcoming : styles.dotDefault,
      isEnded && styles.ended,
    ];

    const dateStyle = [
      styles.dateTextBase,
      isActive ? styles.dateTextActive : styles.dateTextDefault,
      isEnded && styles.ended,
    ];

    return (
      <View 
        ref={itemRef}
        style={[styles.container, { left: `${position}%` }]}
      >
        <TouchableOpacity
          style={styles.touchableArea}
          onPress={handlePress}
          ref={ref as React.Ref<TouchableOpacity>}
          activeOpacity={0.8}
        >
          <View style={dotStyle} />
          <View style={styles.dateContainer}>
            <Text style={dateStyle}>
              {formatTimelineDate(event.deadline)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    transform: [{ translateY: -21 }], // Adjust to center dot + text
  },
  touchableArea: {
    padding: 6,
    alignItems: 'center',
  },
  dotBase: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  dotActive: {
    backgroundColor: '#F97316',
    borderColor: '#FDBA74',
    transform: [{ scale: 1.25 }],
  },
  dotUpcoming: {
    backgroundColor: '#3B82F6',
    borderColor: '#93C5FD',
  },
  dotDefault: {
    backgroundColor: '#9CA3AF',
    borderColor: '#D1D5DB',
  },
  dateContainer: {
    position: 'absolute',
    top: '100%',
    marginTop: 4,
  },
  dateTextBase: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  dateTextActive: {
    color: '#C2410C',
    fontWeight: 'bold',
  },
  dateTextDefault: {
    color: '#4B5563',
  },
  ended: {
    opacity: 0.5,
  },
});


