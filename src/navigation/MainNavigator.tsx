import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootTabParamList, MarketStackParamList } from '@/shared/types/navigation';
import { useTheme } from '@/shared/hooks/useTheme';

import { MarketOverviewScreen } from '@/features/market/screens/MarketOverviewScreen';
import { AssetDetailScreen } from '@/features/asset-detail/screens/AssetDetailScreen';
import { WatchlistScreen } from '@/features/watchlist/screens/WatchlistScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const MarketStack = createNativeStackNavigator<MarketStackParamList>();

const MarketStackNavigator = () => {
  const colors = useTheme();

  return (
    <MarketStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <MarketStack.Screen
        name="MarketOverview"
        component={MarketOverviewScreen}
        options={{ title: 'Market' }}
      />
      <MarketStack.Screen
        name="AssetDetail"
        component={AssetDetailScreen}
        options={{ title: 'Details' }}
      />
    </MarketStack.Navigator>
  );
};

export const MainNavigator = () => {
  const colors = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    dark: colors.background === '#121212',
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.negative,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        }}
      >
        <Tab.Screen
          name="MarketTab"
          component={MarketStackNavigator}
          options={{ title: 'Market' }}
        />
        <Tab.Screen
          name="WatchlistTab"
          component={WatchlistScreen}
          options={{ title: 'Watchlist' }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
