import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEventStore } from '../lib/store';
import { Input } from './ui/Input';
import { Switch } from './ui/Switch';
import { Label } from './ui/Label';
import { Button } from './ui/Button';
import { Icon } from './Icon';

const categoryTranslations: { [key: string]: string } = {
  conference: '会议',
  competition: '竞赛',
  activity: '活动',
};

interface FilterButtonProps {
  isSelected: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

function FilterButton({ isSelected, onPress, children }: FilterButtonProps) {
  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      size="sm"
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

export function FilterBar() {
  const {
    items,
    selectedCategory,
    selectedTags,
    selectedLocations,
    searchQuery,
    setCategory,
    toggleTag,
    toggleLocation,
    setSearchQuery,
    showOnlyFavorites,
    setShowOnlyFavorites,
  } = useEventStore();

  const categories = ['conference', 'competition', 'activity'];
  const allTags = Array.from(new Set(items.flatMap(item => item.tags)));
  const allLocations = Array.from(
    new Set(items.flatMap(item => item.events.map(event => event.place)))
  ).sort();

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="Search" style={styles.searchIcon} />
        <Input
          placeholder="搜索活动、标签或地点..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Favorites Toggle */}
      <View style={styles.favoritesContainer}>
        <Switch
          value={showOnlyFavorites}
          onValueChange={setShowOnlyFavorites}
        />
        <Label>
          <View style={styles.favoritesLabel}>
            <Icon name="Star" style={styles.starIcon} />
            <Text>只显示收藏</Text>
          </View>
        </Label>
      </View>

      {/* Filters */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterTitle}>类别</Text>
        <View style={styles.filterOptions}>
          <FilterButton
            isSelected={selectedCategory === null}
            onPress={() => setCategory(null)}
          >
            <Text>全部</Text>
          </FilterButton>
          {categories.map(category => (
            <FilterButton
              key={category}
              isSelected={selectedCategory === category}
              onPress={() => setCategory(category)}
            >
              <Text>{categoryTranslations[category] || category}</Text>
            </FilterButton>
          ))}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterTitle}>地点</Text>
        <View style={styles.filterOptions}>
          {allLocations.map(location => (
            <FilterButton
              key={location}
              isSelected={selectedLocations.includes(location)}
              onPress={() => toggleLocation(location)}
            >
              <Text>{location}</Text>
            </FilterButton>
          ))}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterTitle}>标签</Text>
        <View style={styles.filterOptions}>
          {allTags.map(tag => (
            <FilterButton
              key={tag}
              isSelected={selectedTags.includes(tag)}
              onPress={() => toggleTag(tag)}
            >
              <Text>{tag}</Text>
            </FilterButton>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    fontSize: 16,
    color: '#9CA3AF',
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 36, // Make space for the icon
  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favoritesLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starIcon: {
    fontSize: 16,
    color: '#FBBF24',
  },
  filterGroup: {
    gap: 8,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
