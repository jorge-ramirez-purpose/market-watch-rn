import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { formatCurrency } from '@/shared/utils/formatters';
import { styles } from './AnimatedPrice.styles';

type TAnimatedPriceProps = {
  price: number;
  previousPrice?: number;
  currency: string;
  fontSize?: number;
};

export const AnimatedPrice = ({
  price,
  previousPrice,
  currency,
  fontSize = 16,
}: TAnimatedPriceProps) => {
  const scale = useSharedValue(1);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    if (previousPrice !== undefined && previousPrice !== price) {
      scale.value = withSequence(
        withSpring(1.1, { damping: 4, stiffness: 300 }),
        withSpring(1, { damping: 10, stiffness: 200 }),
      );

      colorProgress.value = price > previousPrice ? 1 : -1;
      colorProgress.value = withTiming(0, { duration: 1500 });
    }
  }, [price, previousPrice, scale, colorProgress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text
        style={[
          styles.price,
          { fontSize },
          price > (previousPrice ?? price) && styles.positive,
          price < (previousPrice ?? price) && styles.negative,
        ]}
      >
        {formatCurrency(price, currency)}
      </Text>
    </Animated.View>
  );
};