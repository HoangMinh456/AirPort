import * as React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import '../global.css';
import RootNavigator from './navigations/RootNavigator';
import { store } from './store/store';
import CustomNotifi from './components/CustomNotifi/CustomNotifi';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const safeAreaStyle = () => ({
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    display: 'flex' as const,
    flex: 1,
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={safeAreaStyle()}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <RootNavigator />
        <CustomNotifi />
      </Provider>
    </SafeAreaView>
  );
}
