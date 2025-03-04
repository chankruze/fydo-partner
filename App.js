import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import RootNavigation from './src/navigations/rootNavigation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
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
