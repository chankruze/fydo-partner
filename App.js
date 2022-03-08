import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // const checkOnboarding = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@viewedOnboarding');

  //     if (value !== null) {
  //       setViewedOnboarding(true);
  //     }
  //   } catch (err) {
  //     console.log('Error @checkOnboarding: ', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    AsyncStorage.getItem('@viewedOnboarding').then(value => {
      if (value == null) {
        AsyncStorage.setItem('@viewedOnboarding', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
        setLoading(false);
      }
    }, []);

  },[]);

  const handleFirstLaunch = ()=> {
    setIsFirstLaunch(false);
  }
  if (isFirstLaunch === null) {
    return (<View style={styles.container}><Loading /></View>)
  } else if (isFirstLaunch === true) {
    return (
      <View style={styles.container}>
        <OnboardingScreen handleFirstLaunch={handleFirstLaunch}/>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }

  // useEffect(() => {
  //   checkOnboarding();
  // }, [viewedOnboarding]);
  // return (
  //   <View style={styles.container}>
  //     {loading ? (
  //       <Loading />
  //     ) : isFirstLaunch ? (
  //       <HomeScreen />
  //     ) : (
  //       <OnboardingScreen />
  //     )}
  //     <StatusBar style="auto" />
  //   </View>
  // );
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
