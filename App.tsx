import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { MainNavigator } from '@/navigation/MainNavigator';
import { queryClient } from '@/shared/api/queryClient';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <MainNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;