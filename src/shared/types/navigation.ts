import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  MarketTab: undefined;
  WatchlistTab: undefined;
  SettingsTab: undefined;
};

export type MarketStackParamList = {
  MarketOverview: undefined;
  AssetDetail: { coinId: string };
};

export type MarketOverviewScreenProps = NativeStackScreenProps<
  MarketStackParamList,
  'MarketOverview'
>;

export type AssetDetailScreenProps = NativeStackScreenProps<
  MarketStackParamList,
  'AssetDetail'
>;

export type WatchlistScreenProps = BottomTabScreenProps<
  RootTabParamList,
  'WatchlistTab'
>;