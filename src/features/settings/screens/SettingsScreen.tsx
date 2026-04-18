import React, { useMemo } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { useSettingsStore } from '@/shared/stores/settingsStore';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './SettingsScreen.styles';

type TSettingsScreenProps = Record<string, never>;

export const SettingsScreen: React.FC<TSettingsScreenProps> = () => {
  const currency = useSettingsStore((state) => state.currency);
  const theme = useSettingsStore((state) => state.theme);
  const setCurrency = useSettingsStore((state) => state.setCurrency);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Currency</Text>
        <View style={styles.segmentedControl}>
          <Pressable
            style={[
              styles.segment,
              currency === 'usd' && styles.segmentActive,
            ]}
            onPress={() => setCurrency('usd')}
          >
            <Text
              style={[
                styles.segmentText,
                currency === 'usd' && styles.segmentTextActive,
              ]}
            >
              USD
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.segment,
              currency === 'eur' && styles.segmentActive,
            ]}
            onPress={() => setCurrency('eur')}
          >
            <Text
              style={[
                styles.segmentText,
                currency === 'eur' && styles.segmentTextActive,
              ]}
            >
              EUR
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
          trackColor={{ true: colors.primary }}
        />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Market Watch — Practice Project
        </Text>
        <Text style={styles.infoSubtext}>
          Data provided by CoinGecko API
        </Text>
      </View>
    </View>
  );
};
