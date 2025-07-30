import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { TimelineEvent } from '../lib/data';

export interface TimelineItemProps {
  event: TimelineEvent;
  isEnded: boolean;
  isActive?: boolean;
  isUpcoming?: boolean;
  totalEvents: number;
  index: number;
}

// Helper to format date to MM-dd
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}-${day}`;
};

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
}

export const TimelineItem = React.forwardRef<View, TimelineItemProps>(
  ({ event, isEnded, isActive = false, isUpcoming = false, totalEvents, index }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);

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
      <>
        <TouchableOpacity
          style={[styles.container, { left: `${position}%` }]}
          onPress={() => !isEnded && setModalVisible(true)}
          ref={ref as React.Ref<TouchableOpacity>}
        >
          <View style={dotStyle} />
          <View style={styles.dateContainer}>
            <Text style={dateStyle}>
              {formatDate(event.deadline)}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Tooltip Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{event.comment}</Text>
              <Text style={styles.modalText}>
                {formatDateTime(event.deadline)}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>关闭</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    transform: [{ translateY: -12 }, { translateX: -12 }], // Center the touch area
    padding: 6, // Increase touch area
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1F2937', // bg-gray-800
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#D1D5DB', // text-gray-300
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
      backgroundColor: '#4B5563',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
  },
  closeButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
  }
});
