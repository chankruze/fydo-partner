import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import RootNavigation from './src/navigations/rootNavigation';
import OnboardingScreen from './src/screens/OnboardingScreen';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <OnboardingScreen />
//       <StatusBar style="auto" />
//     </View>
//   );
// };

export default function App(){
  return <RootNavigation />
}
