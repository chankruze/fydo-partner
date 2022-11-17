import RootNavigation from './src/navigations/rootNavigation';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  LogBox,
  Alert
} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux';
import store from './src/store';
import SplashScreen from './src/screens/SplashScreen';
import Tts from 'react-native-tts';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])


const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  const otpHandler = (msg) => {
    alert(msg);
  }

  const handleFirstLaunch = () => {
    setIsFirstLaunch(false);
  };

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );

  // if (isFirstLaunch === null) {
  //   return (<View style={styles.container}><Loading /></View>)
  // } else if (isFirstLaunch === true) {
  //   return (
  //     <View style={styles.container}>
  //       <OnboardingScreen handleFirstLaunch={handleFirstLaunch} />
  //     </View>
  //   );
  // } else {
  //   return (
  //      <RootNavigation />
  //   );
  // }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
