import {StyleSheet, StatusBar, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import appIcon from '../assets/images/app-icon.png';
import { setUser } from '../store/actions/user.action';
import { connect } from 'react-redux';
import { getUser } from '../utils/sharedPreferences';

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

const SplashScreen = ({navigation, setUser}) => {
  const [userData, setUserInfo] = useState(null);

  useEffect(() => {
    async function setUserData(){
      try {
        const user = await getUser();
        setUserInfo(user);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    setUserData();

    let timeout = setTimeout(() => {
      console.log("23", userData)
      // console.log("43", user?.profileComplete)
      if(userData){
        navigation.navigate('Main');        
      }
      else {
        navigation.navigate('OnBoarding');
      }
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, []);

  return (
    <LinearGradient
      colors={['#003579', '#093c7e']}
      style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image source={appIcon} style={styles.icon} />
    </LinearGradient>
  );
};

export default connect(null, mapDispatchToProps)(SplashScreen);

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
