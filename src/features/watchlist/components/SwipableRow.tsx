import React, { useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { styles } from './SwipableRow.styles';

type TSwipableRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const DELETE_THRESHOLD = -SCREEN_WIDTH * 0.3;

export const SwipableRow = ({ children, onDelete }: TSwipableRowProps) => {
  const translateX = useSharedValue(0);

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd((event) => {
      if (translateX.value < DELETE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(handleDelete)();
        });
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, DELETE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.deleteContainer, deleteButtonStyle]}>
        <Text style={styles.deleteText}>Delete</Text>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.row, rowStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};