import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {requestHint} from 'react-native-otp-verify';
import {
  BLACK,
  DARKBLACK,
  DARKBLUE,
  DARKGREY,
  LIGHTBLACK,
  PRIMARY,
} from '../assets/colors';
import flag from '../assets/images/flag.png';
import ButtonComponent from '../components/ButtonComponent';
import {SCREENS} from '../constants/authScreens';
import {sendLoginOTP} from '../services/authService';
import {storeValue} from '../utils/sharedPreferences';
const HEIGHT = Dimensions.get('screen').height;
const TAB_BAR_HEIGHT = 49;

global.is401Navigated = false;

const PhoneLoginScreen = ({navigation, handleNextScreen}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    code: '+91',
    icon: null,
    name: 'India',
  });

  const validateInput = () => {
    if (phoneNumber === null || phoneNumber.trim() === '') {
      setError('* Required');
      return false;
    } else if (phoneNumber.length !== 10) {
      setError('Must contain 10 digits');
      return false;
    } else {
      return true;
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    setError(null);

    if (validateInput()) {
      try {
        const res = await sendLoginOTP(phoneNumber);

        if (res.otpId) {
          setLoading(false);
          await storeValue('otpId', JSON.stringify(res.otpId));
          handleNextScreen(SCREENS.OTP_VERIFY, {
            phoneNumber: phoneNumber,
            otpId: res.otpId,
          });
        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
        if (e.message) {
          setError(e.message);
          setLoading(false);
        } else {
          setError('Something went wrong');
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const handlePhoneNumber = value => {
    setPhoneNumber(value);

    if (value?.length === 10) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    (async () => {
      const phone = await requestHint();

      if (phone) {
        setPhoneNumber(phone.slice(3));
      }
    })();
  }, []);

  useEffect(() => {
    if (phoneNumber) {
      sendOTP();
    }
  }, [phoneNumber]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={Platform.OS === 'ios'}>
        <StatusBar backgroundColor={PRIMARY} translucent={false} />
        <Text style={styles.title}>Enter phone number</Text>
        <Text style={styles.label}>
          We will send you a 6-digit OTP to your phone number for verification.
        </Text>
        <TouchableOpacity style={styles.countryButton} activeOpacity={0.8}>
          <Image source={flag} style={styles.flagIcon} />
          <Text style={styles.countryCode}>{country.code}</Text>
          <View style={styles.separator} />
          <TextInput
            style={styles.input}
            maxLength={10}
            value={phoneNumber}
            keyboardType="phone-pad"
            placeholder="1234567890"
            placeholderTextColor={DARKGREY}
            onChangeText={handlePhoneNumber}
          />
        </TouchableOpacity>

        <Text style={styles.error}>{error}</Text>

        <ButtonComponent
          backgroundColor={PRIMARY}
          color="white"
          label="Send OTP"
          onPress={sendOTP}
          loading={loading}
        />

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

export default PhoneLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 24,
    // minHeight: HEIGHT * 0.6,
  },
  title: {
    color: BLACK,
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
    textTransform: 'capitalize',
  },
  label: {
    marginVertical: 16,
    color: DARKGREY,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  countryButton: {
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: 'rgba(0, 53, 121, 0.2)',
    borderRadius: 8,
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    fontFamily: 'Gilroy-Medium',
  },
  countryLabel: {
    fontSize: 12,
    color: LIGHTBLACK,
    marginLeft: 15,
    fontFamily: 'Gilroy-Medium',
  },
  countryCode: {
    color: LIGHTBLACK,
    fontFamily: 'Gilroy-Bold',
    paddingLeft: 15,
    fontSize: 20,
  },
  separator: {
    height: 16,
    borderLeftWidth: 0.8,
    borderLeftColor: 'rgba(0, 53, 121, 0.2)',
    marginHorizontal: 10,
  },
  flagIcon: {
    width: 24,
    height: 24,
  },
  input: {
    color: DARKBLACK,
    width: '80%',
    fontFamily: 'Gilroy-Bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  error: {
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 12,
    paddingLeft: 5,
    color: 'red',
    fontFamily: 'Gilroy-Medium',
  },
  footer: {
    display: 'flex',
    padding: 16,
    width: '100%',
    fontFamily: 'Gilroy-Medium',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    color: DARKGREY,
    fontFamily: 'Gilroy-Medium',
  },
  footerOtherLabel: {
    fontSize: 12,
    color: DARKBLUE,
    fontWeight: '500',
    marginTop: 4,
    fontFamily: 'Gilroy-Medium',
  },
});
