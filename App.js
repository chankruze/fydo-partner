import RootNavigation from './src/navigations/rootNavigation';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  LogBox
} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import AuthNavigation from './src/navigations/authNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneLoginScreen from './src/screens/PhoneLoginScreen';
import OTPVerifyScreen from './src/screens/OTPVerifyScreen';
import ChooseLanguage from './src/screens/ChooseLanguage';
import ShopDetails from './src/screens/shop/ShopDetails';
import ShopTiming from './src/screens/shop/ShopTiming';
import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])


// const Loading = () => {
//   return (
//     <View>
//       <ActivityIndicator />
//     </View>
//   );
// };

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  // useEffect(() => {
  //   AsyncStorage.getItem('@viewedOnboarding').then(value => {
  //     if (value == null) {
  //       AsyncStorage.setItem('@viewedOnboarding', 'true');
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   }, []);

  // },[]);

  const handleFirstLaunch = () => {
    setIsFirstLaunch(false);
  };

 return (
  <Provider store={store}>
    <RootNavigation />
</Provider>
    );

// return <MapScreen />
  // if (isFirstLaunch === null) {
  //   return (<View style={styles.container}><Loading /></View>)
  // } else if (isFirstLaunch === true) {
  //   return (
  //     <View style={styles.container}>
  //       <OnboardingScreen handleFirstLaunch={handleFirstLaunch} />
  //     </View>
  //   );
  // } else {
  //       <OnboardingScreen handleFirstLaunch={handleFirstLaunch}/>
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
