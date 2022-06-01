import { StyleSheet, StatusBar, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import appIcon from '../assets/images/app-icon.png';
import { setUser } from '../store/actions/user.action';
import { connect } from 'react-redux';
import { getUser } from '../utils/defaultPreference';
import { PRIMARY } from '../assets/colors';

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
