import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { TimelineItem } from './TimelineItem';
import { CountdownTimer } from './CountdownTimer';
import { DeadlineItem, EventData, isEventEnded, TimelineEvent } from '../lib/data';
import { useEventStore } from '../lib/store';
import { ScrollArea } from './ui/ScrollArea';
import { Icon } from './Icon';
import { formatDeadline } from '../lib/utils';

interface EventCardProps {
  item: DeadlineItem;
  event: EventData;
}

const categoryTranslations: { [key: string]: string } = {
  conference: '会议',
  competition: '竞赛',
  activity: '活动',
};

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  const categoryStyle =
    categoryStyles[category as keyof typeof categoryStyles] ||
    categoryStyles.default;
  return (
    <View style={[styles.categoryBadge, categoryStyle.container]}>
      <Text style={[styles.categoryBadgeText, categoryStyle.text]}>
        {categoryTranslations[category] || category}
      </Text>
    </View>
  );
};

const Tooltip = ({ event, style }: { event: TimelineEvent; style: any }) => (
  <View style={[styles.tooltipContainer, style]}>
    <View style={styles.tooltipContent}>
      <Text style={styles.tooltipTitle}>{event.comment}</Text>
      <Text style={styles.tooltipText}>{formatDeadline(event.deadline)}</Text>
    </View>
    <View style={styles.tooltipArrow} />
  </View>
);

export function EventCard({ item, event }: EventCardProps) {
  const { favorites, toggleFavorite } = useEventStore();
  const [tooltip, setTooltip] = useState<{ event: TimelineEvent; style: any } | null>(null);
  const timelineContainerRef = useRef<View>(null);

  const cardId = `${event.id}`;
  const isFavorited = favorites.includes(cardId);
  const ended = isEventEnded(event);

  const upcomingDeadlines = event.timeline
    .map((t, index) => ({ ...t, date: new Date(t.deadline), index }))
    .filter(t => t.date.getTime() > Date.now())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const nextDeadline = upcomingDeadlines[0];
  const upcomingIndexes = upcomingDeadlines.map(t => t.index);

  const handleLinkPress = () => Linking.openURL(event.link);

  const handleTimelineItemPress = (
    timelineEvent: TimelineEvent,
    itemRef: React.RefObject<View>
  ) => {
    if (tooltip && tooltip.event.deadline === timelineEvent.deadline) {
      setTooltip(null);
      return;
    }

    if (itemRef.current && timelineContainerRef.current) {
      itemRef.current.measureLayout(
        timelineContainerRef.current,
        (x, y, width, height) => {
          setTooltip({
            event: timelineEvent,
            style: {
              left: x + width / 2 - 110, // Center the tooltip (110 is half of tooltip width)
              top: y - 100, // Position above the item
            },
          });
        },
        () => {}
      );
    }
  };

  return (
    <Card style={ended ? styles.endedCard : {}}>
      <CardContent>
        {/* ... (rest of the card content is the same) ... */}
        <View style={styles.mainContent}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.titleHeader}>
              <CategoryBadge category={item.category} />
              <TouchableOpacity onPress={handleLinkPress} style={styles.titleLink}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Icon name="ExternalLink" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleBadges}>
              <Badge variant="outline">{String(event.year)}</Badge>
              {ended && <Badge variant="secondary">已结束</Badge>}
              <TouchableOpacity onPress={() => toggleFavorite(cardId)}>
                <Icon
                  name="Star"
                  style={[styles.icon, isFavorited && styles.favoritedIcon]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {item.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Icon name="Calendar" style={styles.icon} />
              <Text style={styles.infoText}>{event.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="Clock" style={styles.icon} />
              <Text style={styles.infoText}>{event.timezone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="MapPin" style={styles.icon} />
              <Text style={styles.infoText}>{event.place}</Text>
            </View>
          </View>
        </View>

        {/* Mobile Layout for Timeline and Deadline */}
        <View style={styles.mobileTimelineSection}>
          <View style={styles.timelineHeader}>
            <Icon name="Clock" style={styles.icon} />
            <Text style={styles.sectionTitle}>时间线</Text>
          </View>
          <View style={styles.timelineContainer} ref={timelineContainerRef}>
            <ScrollArea>
              <View style={[styles.timeline, { width: event.timeline.length * 80 }]}>
                <View style={styles.timelineTrack} />
                {event.timeline.map((timelineEvent, index) => (
                  <TimelineItem
                    key={index}
                    event={timelineEvent}
                    isEnded={ended}
                    isActive={nextDeadline?.index === index}
                    isUpcoming={upcomingIndexes.slice(1).includes(index)}
                    totalEvents={event.timeline.length}
                    index={index}
                    onItemPress={handleTimelineItemPress}
                  />
                ))}
              </View>
            </ScrollArea>
            {tooltip && <Tooltip event={tooltip.event} style={tooltip.style} />}
          </View>
        </View>

        {/* Countdown Section */}
        <View style={styles.countdownSection}>
          {!ended && nextDeadline ? (
            <View style={styles.countdownBox}>
              <View style={styles.countdownInfo}>
                <Text style={styles.countdownTitle}>下一个截止日期</Text>
                <Text style={styles.countdownComment}>{nextDeadline.comment}</Text>
                <Text style={styles.countdownDate}>
                  {formatDeadline(nextDeadline.deadline)}
                </Text>
              </View>
              <CountdownTimer deadline={nextDeadline.deadline} />
            </View>
          ) : (
            <View style={styles.endedBox}>
              <Text style={styles.endedTitle}>活动已结束</Text>
              <Text style={styles.endedSubtitle}>所有截止日期已过</Text>
            </View>
          )}
        </View>
      </CardContent>
    </Card>
  );
}

const categoryStyles = {
    conference: StyleSheet.create({
      container: { backgroundColor: '#16A34A' }, // green-600
      text: { color: '#FFFFFF' },
    }),
    competition: StyleSheet.create({
      container: { backgroundColor: '#DC2626' }, // red-600
      text: { color: '#FFFFFF' },
    }),
    activity: StyleSheet.create({
      container: { backgroundColor: '#9333EA' }, // purple-600
      text: { color: '#FFFFFF' },
    }),
    default: StyleSheet.create({
      container: { backgroundColor: '#007AFF' }, // primary
      text: { color: '#FFFFFF' },
    }),
  };

const styles = StyleSheet.create({
  endedCard: { opacity: 0.6 },
  mainContent: { gap: 16 },
  titleSection: { gap: 12 },
  titleHeader: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  titleLink: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  titleText: { fontSize: 20, fontWeight: '600', textDecorationLine: 'underline' },
  titleBadges: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  description: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  infoSection: { gap: 8 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 14, color: '#6B7280' },
  icon: { fontSize: 16, color: '#6B7280' },
  favoritedIcon: { color: '#FBBF24' },
  mobileTimelineSection: { gap: 12, marginTop: 24 },
  timelineHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '500' },
  timelineContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    height: 80,
    justifyContent: 'center',
    // overflow: 'hidden' is removed to allow tooltip to show
  },
  timeline: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timelineTrack: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#D1D5DB',
    top: '50%',
  },
  // Tooltip Styles
  tooltipContainer: {
    position: 'absolute',
    zIndex: 10,
    width: 220,
  },
  tooltipContent: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1F2937',
    alignSelf: 'center',
  },
  tooltipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  tooltipText: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  countdownSection: { marginTop: 24 },
  countdownBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FDBA74',
    padding: 16,
    gap: 12,
    alignItems: 'center',
  },
  countdownInfo: { alignItems: 'center', gap: 4 },
  countdownTitle: { fontSize: 14, fontWeight: 'bold', color: '#9A3412' },
  countdownComment: { fontSize: 16, fontWeight: 'bold', color: '#7C2D12', textAlign: 'center' },
  countdownDate: { fontSize: 12, color: '#C2410C' },
  endedBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  endedTitle: { fontSize: 14, fontWeight: 'bold', color: '#4B5563' },
  endedSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});

