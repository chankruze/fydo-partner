import {StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import appIcon from '../assets/images/app-icon.png';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#003579', '#093c7e']}
      style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image source={appIcon} style={styles.icon} />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '50%',
    resizeMode: 'contain',
  },
});
