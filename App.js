import RootNavigation from './src/navigations/rootNavigation';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterShop from './src/screens/RegisterShop';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

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

  // return <RegisterShop />;
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
       <RootNavigation />
    );
  }
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
