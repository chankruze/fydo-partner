import {StyleSheet, StatusBar, Image} from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import appIcon from '../assets/images/app-icon.png';
import { setUser } from '../store/actions/user.action';
import { connect } from 'react-redux';
import { getUser } from '../utils/sharedPreferences';

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  }
}

const SplashScreen = ({navigation, setUser, user}) => {

  useEffect(() => {
    async function setUserData(){
      try {
        const user = await getUser();
        console.log("user", typeof user)
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    setUserData();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      // console.log("43", user?.profileComplete)
      if(user?.profileComplete){
        navigation.navigate('Main');        
      }
      else {
        navigation.navigate('OnBoarding');
      }
    }, 3000)
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
