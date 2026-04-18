import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { PriceChange } from '@/shared/components/PriceChange';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './StatRow.styles';

type TStatRowProps = {
  label: string;
  value: string | null;
  changeValue?: number | null;
};

export const StatRow = ({ label, value, changeValue }: TStatRowProps) => {
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      {value ? (
        <Text style={styles.statValue}>{value}</Text>
      ) : (
        <PriceChange value={changeValue ?? null} />
      )}
    </View>
  );
};
