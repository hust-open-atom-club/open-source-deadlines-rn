import { create } from 'zustand';
import { DeadlineItem } from './data';
import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  items: DeadlineItem[];
  loading: boolean;
  selectedCategory: string | null;
  selectedTags: string[];
  selectedLocations: string[];
  searchQuery: string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (show: boolean) => void;
  mounted: boolean;

  // 时区相关状态 (已注释)
  // displayTimezone: string;
  // setDisplayTimezone: (timezone: string) => void;
  // detectUserTimezone: () => void;

  fetchItems: () => Promise<void>;
  setCategory: (category: string | null) => void;
  toggleTag: (tag: string) => void;
  toggleLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useEventStore = create<AppState>()(
  persist(
    (set) => ({
      // State
      items: [],
      loading: true,
      selectedCategory: null,
      selectedTags: [],
      selectedLocations: [],
      searchQuery: '',
      favorites: [],
      showOnlyFavorites: false,
      mounted: false,

      // 默认使用上海时区 (已注释)
      // displayTimezone: "Asia/Shanghai",

      // Actions
      toggleFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
      setShowOnlyFavorites: (show: boolean) => set({ showOnlyFavorites: show }),
      fetchItems: async () => {
        set({ loading: true });
        try {
          // 直接从网络请求
          const res = await fetch('https://oseddl.openatom.club/api/data');
          const data = await res.json();
          set({ items: data, loading: false });
        } catch (err) {
          console.error('Failed to load data:', err);
          set({ loading: false });
        }
      },

      // 设置时区 (已注释)
      // setDisplayTimezone: (timezone: string) => set({ displayTimezone: timezone }),

      // 检测用户本地时区 (已注释)
      // detectUserTimezone: () => {
      //   // React Native 中没有 Intl.DateTimeFormat().resolvedOptions().timeZone
      //   // 需要使用第三方库或者原生模块来获取
      // },

      setCategory: (category) => set({ selectedCategory: category }),

      toggleTag: (tag) =>
        set((state) => ({
          selectedTags: state.selectedTags.includes(tag)
            ? state.selectedTags.filter((t) => t !== tag)
            : [...state.selectedTags, tag],
        })),

      toggleLocation: (location) =>
        set((state) => ({
          selectedLocations: state.selectedLocations.includes(location)
            ? state.selectedLocations.filter((l) => l !== location)
            : [...state.selectedLocations, location],
        })),

      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        favorites: state.favorites,
        // displayTimezone: state.displayTimezone // 保存用户选择的时区
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.mounted = true
        }
      }
    }
  )
);