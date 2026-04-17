import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { TIMEFRAMES } from '@/shared/constants';
import { styles } from './TimeframeSelector.styles';

type TimeframeSelectorProps = {
  selected: keyof typeof TIMEFRAMES;
  onSelect: (timeframe: keyof typeof TIMEFRAMES) => void;
};

export const TimeframeSelector = ({
  selected,
  onSelect,
}: TimeframeSelectorProps) => {
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