import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootTabParamList, MarketStackParamList } from '@/shared/types/navigation';
import { COLORS } from '@/shared/constants';

import { MarketOverviewScreen } from '@/features/market/screens/MarketOverviewScreen';
import { AssetDetailScreen } from '@/features/asset-detail/screens/AssetDetailScreen';
import { WatchlistScreen } from '@/features/watchlist/screens/WatchlistScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const MarketStack = createNativeStackNavigator<MarketStackParamList>();

const MarketStackNavigator = () => {
  return (
    <MarketStack.Navigator>
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
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
}