import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CountdownTimerProps {
  deadline: string; // Expecting an ISO date string
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(deadline) - +new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft(null);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [deadline]);

  if (!timeLeft) {
    return (
      <View style={styles.expiredContainer}>
        <Text style={styles.expiredText}>已过期</Text>
      </View>
    );
  }

  return (
    <View style={styles.timerContainer}>
      {timeLeft.days > 0 && (
        <View style={styles.timeBlock}>
          <View style={styles.timeValueContainer}>
            <Text style={styles.timeValueText}>
              {timeLeft.days.toString().padStart(2, '0')}
            </Text>
          </View>
          <Text style={styles.timeUnitText}>天</Text>
        </View>
      )}
      <View style={styles.timeBlock}>
        <View style={styles.timeValueContainer}>
          <Text style={styles.timeValueText}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </Text>
        </View>
        <Text style={styles.timeUnitText}>小时</Text>
      </View>
      <View style={styles.timeBlock}>
        <View style={styles.timeValueContainer}>
          <Text style={styles.timeValueText}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </Text>
        </View>
        <Text style={styles.timeUnitText}>分钟</Text>
      </View>
      <View style={styles.timeBlock}>
        <View style={styles.timeValueContainer}>
          <Text style={styles.timeValueText}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </Text>
        </View>
        <Text style={styles.timeUnitText}>秒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expiredContainer: {
    backgroundColor: '#FEE2E2', // red-100
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  expiredText: {
    color: '#DC2626', // red-600
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeBlock: {
    alignItems: 'center',
  },
  timeValueContainer: {
    backgroundColor: '#F97316', // orange-500 (solid color instead of gradient)
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 40,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  timeValueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeUnitText: {
    color: '#C2410C', // orange-700
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
