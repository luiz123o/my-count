import { observer } from 'mobx-react-lite';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/core/config/mobx';
import './src/core/i18n/config';
import { getI18n } from './src/core/i18n/config';
import { ThemeProvider } from './src/presentation/components/ThemeProvider';
import HomeScreen from './src/presentation/screens/HomeScreen';


getI18n();
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