import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TIMEFRAMES } from '@/shared/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { createStyles } from './TimeframeSelector.styles';

type TTimeframeSelectorProps = {
  selected: keyof typeof TIMEFRAMES;
  onSelect: (timeframe: keyof typeof TIMEFRAMES) => void;
};

export const TimeframeSelector = ({
  selected,
  onSelect,
}: TTimeframeSelectorProps) => {
  const colors = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {(Object.keys(TIMEFRAMES) as Array<keyof typeof TIMEFRAMES>).map(
        (timeframe) => (
          <Pressable
            key={timeframe}
            onPress={() => onSelect(timeframe)}
            style={[
              styles.button,
              selected === timeframe && styles.buttonActive,
            ]}
          >
            <Text
              style={[
                styles.text,
                selected === timeframe && styles.textActive,
              ]}
            >
              {timeframe}
            </Text>
          </Pressable>
        ),
      )}
    </View>
  );
};
