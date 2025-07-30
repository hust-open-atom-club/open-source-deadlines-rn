import React, { useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import Fuse from 'fuse.js';
import { useEventStore } from './lib/store';
import { DeadlineItem, EventData } from './lib/data';
import { EventCard } from './components/EventCard';
import { FilterBar } from './components/FilterBar';
import { Lucide } from '@react-native-vector-icons/lucide'

interface FlatEvent {
  item: DeadlineItem;
  event: EventData;
  timeRemaining: number;
}

const AppHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerTitleRow}>
      <View style={styles.headerIconContainer}>
        <Lucide name="calendar" style={styles.headerIcon} />
      </View>
      <Text style={styles.headerTitle}>开源活动截止日期</Text>
    </View>
    <TouchableOpacity
      onPress={() => Linking.openURL('https://github.com/hust-open-atom-club/open-source-deadlines')}
    >
      <Image
        style={styles.githubBadge}
        source={{ uri: 'https://img.shields.io/github/stars/hust-open-atom-club/open-source-deadlines?style=for-the-badge&logo=github&logoColor=white&labelColor=155dfc&color=white' }}
      />
    </TouchableOpacity>
    <Text style={styles.headerSubtitle}>
      开源会议、竞赛和活动重要截止日期概览，不再错过为社区贡献、学习和交流的机会。
    </Text>
    <Text style={styles.disclaimer}>
      *免责声明：数据由人工维护，仅供参考
    </Text>
  </View>
);

const AppFooter = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>
            使用 React Native 构建 • 由{' '}
            <Text style={styles.link} onPress={() => Linking.openURL('https://hust.openatom.club')}>
                华科开放原子开源俱乐部
            </Text>
            {' '}维护
        </Text>
    </View>
);

const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>🔍</Text>
    <Text style={styles.emptyTitle}>未找到任何活动</Text>
    <Text style={styles.emptySubtitle}>
      请尝试调整筛选器或搜索词以查看更多活动。
    </Text>
  </View>
);

function App(): React.ReactElement {
  const {
    items,
    loading,
    fetchItems,
    selectedCategory,
    selectedTags,
    selectedLocations,
    searchQuery,
    favorites,
    showOnlyFavorites,
  } = useEventStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const flatEvents: FlatEvent[] = useMemo(
    () =>
      items.flatMap(item =>
        item.events.map(event => {
          const now = new Date().getTime();
          const upcomingDeadlines = event.timeline
            .map(t => new Date(t.deadline).getTime())
            .filter(d => d > now)
            .sort((a, b) => a - b);

          const nextDeadline =
            upcomingDeadlines[0] ||
            new Date(event.timeline[event.timeline.length - 1].deadline).getTime();
          const timeRemaining = nextDeadline - now;

          return { item, event, timeRemaining };
        })
      ),
    [items]
  );

  const fuse = useMemo(() => {
    return new Fuse(flatEvents, {
      keys: ['item.title', 'item.description', 'item.tags', 'event.place'],
      threshold: 0.3,
    });
  }, [flatEvents]);

  const filteredEvents = useMemo(() => {
    let results: FlatEvent[];

    if (searchQuery.trim() && fuse) {
      results = fuse.search(searchQuery.trim()).map(result => result.item);
    } else {
      results = flatEvents;
    }

    return results
      .filter(({ item, event }) => {
        if (showOnlyFavorites && !favorites.includes(`${event.id}`)) return false;
        if (selectedCategory && item.category !== selectedCategory) return false;
        if (selectedTags.length > 0 && !selectedTags.some(tag => item.tags.includes(tag)))
          return false;
        if (selectedLocations.length > 0 && !selectedLocations.includes(event.place))
          return false;
        return true;
      })
      .sort((a, b) => {
        const aEnded = a.timeRemaining < 0;
        const bEnded = b.timeRemaining < 0;

        if (aEnded && !bEnded) return 1;
        if (!aEnded && bEnded) return -1;
        if (aEnded && bEnded) return b.timeRemaining - a.timeRemaining;

        return a.timeRemaining - b.timeRemaining;
      });
  }, [
    flatEvents,
    searchQuery,
    fuse,
    selectedCategory,
    selectedTags,
    selectedLocations,
    favorites,
    showOnlyFavorites,
  ]);

  if (loading && items.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>正在加载活动...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={filteredEvents}
        keyExtractor={({ event }) => event.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <EventCard item={item.item} event={item.event} />
          </View>
        )}
        ListHeaderComponent={
          <>
            <AppHeader />
            <View style={styles.filterContainer}>
              <FilterBar />
            </View>
          </>
        }
        ListFooterComponent={filteredEvents.length > 0 ? <AppFooter /> : null}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6', // slate-100
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerContainer: {
    marginBottom: 16,
    gap: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconContainer: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 999,
  },
  headerIcon: {
    fontSize: 24,
    color: 'white',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  githubBadge: {
    height: 32,
    width: 240,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 12,
    color: '#4B5563',
  },
  filterContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardContainer: {
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  footer: {
      marginTop: 16,
      paddingVertical: 16,
      alignItems: 'center',
  },
  footerText: {
      fontSize: 12,
      color: '#4B5563',
      textAlign: 'center',
  },
  link: {
      textDecorationLine: 'underline',
      color: '#007AFF',
  }
});

export default App;
