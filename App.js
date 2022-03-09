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
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Loading = () => {
//   return (
//     <View>
//       <ActivityIndicator />
//     </View>
//   );
// };

// const App = () => {
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   useEffect(() => {
//     AsyncStorage.getItem('@viewedOnboarding').then(value => {
//       if (value == null) {
//         AsyncStorage.setItem('@viewedOnboarding', 'true');
//         setIsFirstLaunch(true);
//       } else {
//         setIsFirstLaunch(false);
//       }
//     }, []);

//   },[]);

//   const handleFirstLaunch = ()=> {
//     setIsFirstLaunch(false);
//   }
//   if (isFirstLaunch === null) {
//     return (<View style={styles.container}><Loading /></View>)
//   } else if (isFirstLaunch === true) {
//     return (
//       <View style={styles.container}>
//         <OnboardingScreen handleFirstLaunch={handleFirstLaunch}/>
//       </View>
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//        <RootNavigation />
//       </View>
//     );
//   }
// };


function App(){
  return <RootNavigation />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
