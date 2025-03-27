import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { HomeScreen } from './src/presentation/screens/HomeScreen';
import { ThemeProvider } from './src/presentation/components/ThemeProvider';
import './src/core/config/mobx';

const App = observer(() => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
});

export default App; 