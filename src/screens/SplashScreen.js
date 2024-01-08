import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {PRIMARY} from '../assets/colors';
import appIcon from '../assets/images/app-icon.png';
import {setUser} from '../store/actions/user.action';
import {getUser} from '../utils/defaultPreference';

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

const mapStateToProps = state => {
  return {
    user: state?.userReducer?.user,
  };
};

const SplashScreen = ({navigation, setUser, user}) => {
  const [userData, setUserInfo] = useState(null);

  useEffect(() => {
    async function setUserData() {
      try {
        const user = await getUser();
        setUserInfo(user);
        setUser(user);
        if (user === null) {
          navigation.navigate('OnBoarding');
        } else if (user?.profileComplete === false) {
          navigation.navigate('RegisterShop');
        } else {
          navigation.navigate('Main');
        }
      } catch (error) {
        console.log(error);
      }
    }
    setUserData();

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:');
      if (remoteMessage) {
        console.log('remoteMessage');
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('remoteMessage-->');
        }
      });
  }, []);

  return (
    <LinearGradient colors={[PRIMARY, '#093c7e']} style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image source={appIcon} style={styles.icon} />
    </LinearGradient>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

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
