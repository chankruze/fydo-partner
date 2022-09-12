import { StyleSheet, StatusBar, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import appIcon from '../assets/images/app-icon.png';
import { setUser } from '../store/actions/user.action';
import { connect } from 'react-redux';
import { getUser } from '../utils/defaultPreference';
import { PRIMARY } from '../assets/colors';
import messaging from '@react-native-firebase/messaging';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user,
  }
}

const SplashScreen = ({ navigation, setUser, user }) => {
  const [userData, setUserInfo] = useState(null);

  useEffect(() => {
    async function setUserData() {
      try {
        const user = await getUser();
        setUserInfo(user);
        setUser(user);
        console.log("user", user)
        if (user == null) {
          navigation.navigate('OnBoarding')
        }
        else if (user?.profileComplete == false) {
          navigation.navigate('RegisterShop');
        }
        else {
          navigation.navigate('Main');
        }
      } catch (error) {
        console.log(error);
      }
    }
    setUserData();

    // let timeout = setTimeout(async () => {
    //   // let user = await getUser();
    //   console.log("jj--.", user);
    //   if (user == null) {
    //     navigation.navigate('OnBoarding')
    //   }
    //   else if (user?.profileComplete == false) {
    //     navigation.navigate('RegisterShop');
    //   }
    //   else {
    //     navigation.navigate('Main');
    //   }
    // }, 3000)
    // return () => {
    //   clearTimeout(timeout)
    // }
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification, remoteMessage.data
      );
      if (remoteMessage) {
        console.log('remoteMessage',remoteMessage)
          // let { entityType, entityId } = remoteMessage.data;
          // if (entityId && entityType == NOTIFICATION_TYPES.SINGLE_BRAND) {
          //     this.setState({ initialRoute: 'Brand', id: entityId })ˀ
          // }
          // else if (entityId && entityType == NOTIFICATION_TYPES.SINGLE_STORE) {
          //     this.setState({ initialRoute: 'Store', id: entityId })
          // }
          // else if (entityId && entityType == NOTIFICATION_TYPES.SINGLE_OFFER) {
          //     this.setState({ initialRoute: 'Offer', id: entityId })
          // }
      }
      // navigation.navigate(remoteMessage.data.type);
  });

  messaging()
      .getInitialNotification()
      .then(remoteMessage => {
          if (remoteMessage) {
            console.log('remoteMessage-->',remoteMessage)
              // console.log(
              //     'Notification caused app to open from quit state:',
              //     remoteMessage.notification, remoteMessage.data
              // );
              // let { entityType, entityId } = remoteMessage.data;
              // if (entityId && entityType == NOTIFICATION_TYPES.SINGLE_BRAND) {
              //     this.setState({ initialRoute: 'Brand', id: entityId })
              // }
              // else if (entityId && entityType == NOTIFICATION_TYPES.SINGLE_STORE) {
              //     this.setState({ initialRoute: 'Store', id: entityId })
              // }
              // else if (entityId && entityType == NOTIFICATION_TYPES.SINGLE_OFFER) {
              //     this.setState({ initialRoute: 'Offer', id: entityId })
              // }
              // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
      });
  }, []);

  return (
    <LinearGradient
      colors={[PRIMARY, '#093c7e']}
      style={styles.container}>
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
