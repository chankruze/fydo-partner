import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {createRef, useEffect, useState} from 'react';
import {
  Clipboard,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getHash,
  removeListener,
  startOtpListener,
} from 'react-native-otp-verify';
import {connect} from 'react-redux';
import {DARKBLUE, DARKGREY, LIGHTBLACK, PRIMARY} from '../assets/colors';
import ButtonComponent from '../components/ButtonComponent';
import {sendLoginOTP, verifyLoginOTP} from '../services/authService';
import {setUser} from '../store/actions/user.action';
import {saveUserData} from '../utils/defaultPreference';
import {getValue, storeValue} from '../utils/sharedPreferences';

const mapDispatchToProps = function (dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

const OTPVerifyScreen = ({
  navigationData,
  navigation,
  handleNextScreen,
  setUser,
}) => {
  const otpInput = createRef();

  const [otp, setOtp] = useState('');
  const [otpId, setOtpId] = useState(navigationData?.otpId || '');
  const phoneNumber = navigationData?.phoneNumber;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      otpInput?.current?.focusField(0);
    }, 500);

    // getHash = () =>
    getHash()
      .then(hash => {
        // use this hash in the message.
      })
      .catch(console.log);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      otpHandler(message);
    });

    return () => removeListener();
  }, []);

  const otpHandler = async message => {
    const _otp = /(\d{6})/g.exec(message)?.[1];

    if (_otp) {
      setOtp(_otp);
      Clipboard.setString(_otp);
      verify(_otp);
    }

    Keyboard.dismiss();
  };

  const validateInput = autoOtp => {
    let otps = autoOtp ? autoOtp : otp;

    if (otps === null || otps.trim() === '') {
      setError('* Required');
      return false;
    } else if (otps.length !== 6) {
      setError('Must contain 6 digits');
      return false;
    } else {
      return true;
    }
  };

  const handleOTP = value => {
    setOtp(value);
  };

  const verify = async autoOtp => {
    const otpIds = await getValue('otpId');

    if (!validateInput(autoOtp)) {
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await verifyLoginOTP(otpIds, autoOtp || otp);

      setLoading(false);
      if (response?.message) {
        setError(response?.message);
      } else {
        storeValue('token', JSON.stringify(response?.accessToken));
        setUser(response);
        saveUserData(response);
        if (response?.profileComplete) {
          // handleNextScreen(SCREENS.LANGUAGE);
          navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });

          // navigation.navigate('Language');
          console.log('User Profile Complete, add suitable route');
        } else {
          navigation.navigate('RegisterShop');
        }
      }
    } catch (e) {
      console.log(e);
      if (e?.message === 'Request failed with status code 403') {
        setError('Invalid OTP');
        setLoading(false);
      } else {
        setError(e?.message);
        setLoading(false);
      }
    }
  };

  const resendOTP = async () => {
    try {
      const response = await sendLoginOTP(phoneNumber);
      const {otpId} = response;
      // setOtp('');
      await storeValue('otpId', JSON.stringify(otpId));

      setOtpId(otpId);
      setError(null);
      // otpInput.current.clear();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={Platform.OS === 'ios'}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.label}>
          Please enter the 6-digit OTP sent to you at {phoneNumber}
        </Text>
        <OTPInputView
          ref={otpInput}
          style={styles.optContainer}
          pinCount={6}
          // code={otp}
          editable={true}
          code={otp}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={handleOTP}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.otpBox}
          // codeInputHighlightStyle={styles.optContainer}
          onCodeFilled={handleOTP}
        />
        {error != null && <Text style={styles.error}>{error}</Text>}
        <ButtonComponent
          backgroundColor={PRIMARY}
          color="white"
          label="Verify & continue"
          onPress={() => verify()}
          loading={loading}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Didn't get the OTP?</Text>
          <TouchableOpacity
            // disabled={otp?.length != 6}
            onPress={resendOTP}
            style={styles.resendButton}>
            <Text style={styles.resendLabel}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerLabel}>By continuing you agree to our</Text>
          <TouchableOpacity>
            <Text style={styles.footerOtherLabel}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, mapDispatchToProps)(OTPVerifyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    // minHeight: HEIGHT * 0.6,
    width: '100%',
  },
  title: {
    color: LIGHTBLACK,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
  },
  label: {
    marginVertical: 15,
    color: DARKGREY,
    lineHeight: 20,
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  footer: {
    // position: 'absolute',
    bottom: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'Gilroy-Medium',
  },
  footerLabel: {
    fontSize: 12,
    color: DARKGREY,
    fontFamily: 'Gilroy-Medium',
  },
  footerOtherLabel: {
    fontSize: 12,
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',

    marginTop: 3,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  resendButton: {
    marginLeft: 10,
  },
  resendLabel: {
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',
  },
  otpInput: {
    height: 48,
    backgroundColor: '#F4F5F5',
    marginVertical: 20,
    width: '22%',
    textAlign: 'center',

    fontSize: 13,
    color: DARKGREY,
    fontFamily: 'Gilroy-Medium',
  },
  optContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 15,
  },
  otpBox: {
    borderRadius: 10,
    backgroundColor: '#F4F5F5',
    borderBottomWidth: 1,
    fontSize: 14,
    color: 'black',
    width: 45,
    // marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 12,
    paddingLeft: 5,
    color: 'red',
    fontFamily: 'Gilroy-Medium',
  },
});
