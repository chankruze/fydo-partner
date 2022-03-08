import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <OnboardingScreen />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#493d8a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
