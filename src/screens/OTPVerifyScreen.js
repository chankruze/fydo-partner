import Clipboard from '@react-native-clipboard/clipboard';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {createRef, useEffect, useState} from 'react';
import {
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
import {BLACK, DARKBLUE, DARKGREY, PRIMARY} from '../assets/colors';
import ButtonComponent from '../components/ButtonComponent';
import {sendLoginOTP, verifyLoginOTP} from '../services/authService';
import {setUser} from '../store/actions/user.action';
import {saveUserData} from '../utils/defaultPreference';
import {getValue, storeValue} from '../utils/sharedPreferences';

// const HEIGHT = Dimensions.get('screen').height;

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
  const [otp, setOtp] = useState('');
  const [otpId, setOtpId] = useState(navigationData?.otpId || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const otpInputRef = createRef();

  const phoneNumber = navigationData?.phoneNumber;

  useEffect(() => {
    if (otpInputRef.current) {
      setTimeout(() => {
        otpInputRef.current.focusField(0);
      }, 500);
    }

    // hash code for the application which should be added at the end of message. This is just a one time process.
    getHash()
      .then(hash => {
        // use this hash in the message.
        console.log(hash);
      })
      .catch(console.log);

    // start listening for OTP/SMS and adds listener for the handler passed which is called when message is received..
    startOtpListener(message => {
      // extract the otp using regex
      const _otp = /(\d{6})/g.exec(message)?.[1];

      if (_otp) {
        setOtp(_otp);
        Clipboard.setString(_otp);
        verify(_otp);
        Keyboard.dismiss();
      }
    });

    return () => removeListener();
  }, []);

  const isValidOTPFormat = autoOtp => {
    let _otp = autoOtp ? autoOtp : otp;

    if (typeof _otp === 'string' && _otp.length === 6) {
      return /^\d+$/.test(_otp);
    }

    return false;
  };

  const handleOTP = value => {
    setOtp(value);
  };

  const verify = async autoOtp => {
    const otpIds = await getValue('otpId');

    if (!isValidOTPFormat(autoOtp)) {
      setError('Invalid OTP');
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
      console.error(e);
      if (e.message) {
        setError(e.message);
        setLoading(false);
      } else {
        setError(e?.message);
        setLoading(false);
      }
    }
  };

  const resendOTP = async () => {
    try {
      const {otpId: _otpId} = await sendLoginOTP(phoneNumber);
      setOtp('');
      await storeValue('otpId', JSON.stringify(_otpId));

      setOtpId(_otpId);
      setError(null);

      if (otpInputRef.current) {
        otpInputRef.current.clear();
      }
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

        {/* otp input */}
        <OTPInputView
          ref={otpInputRef}
          style={styles.optContainer}
          pinCount={6}
          editable={true}
          code={otp}
          onCodeChanged={handleOTP}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.otpBox}
          onCodeFilled={handleOTP}
          keyboardType="number-pad"
        />

        {/* error message */}
        {error != null && <Text style={styles.error}>{error}</Text>}

        {/* verify button */}
        <ButtonComponent
          backgroundColor={PRIMARY}
          color="white"
          label="Continue"
          onPress={() => verify(otp)}
          loading={loading}
          disabled={!isValidOTPFormat(otp)}
        />

        {/* resend */}
        <View style={styles.row}>
          <Text style={styles.label}>Didn't get the OTP?</Text>
          <TouchableOpacity
            disabled={otp.length !== 6}
            onPress={resendOTP}
            style={styles.resendButton}>
            <Text style={styles.resendLabel}>Resend</Text>
          </TouchableOpacity>
        </View>

        {/* footer */}
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
    paddingVertical: 24,
    paddingHorizontal: 24,
    // minHeight: HEIGHT * 0.6,
    width: '100%',
  },
  title: {
    color: BLACK,
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
  },
  label: {
    marginVertical: 16,
    color: DARKGREY,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    display: 'flex',
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
    marginTop: 4,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  resendButton: {
    marginLeft: 12,
  },
  resendLabel: {
    color: DARKBLUE,
    fontFamily: 'Gilroy-Medium',
  },
  otpInput: {
    height: 48,
    backgroundColor: '#F4F5F5',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 14,
    color: DARKGREY,
    fontFamily: 'Gilroy-Medium',
  },
  optContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  otpBox: {
    borderRadius: 12,
    backgroundColor: '#F4F5F5',
    fontSize: 16,
    color: 'black',
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    paddingBottom: 8,
    fontSize: 12,
    paddingLeft: 4,
    color: 'red',
    fontFamily: 'Gilroy-Medium',
  },
});
