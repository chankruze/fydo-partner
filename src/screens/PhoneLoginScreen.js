import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import flag from '../assets/images/flag.png';
import {DARKBLUE, DARKGREY, GREY, LIGHTBLACK, PRIMARY} from '../assets/colors';
import ButtonComponent from '../components/ButtonComponent';
import WithNetInfo from '../components/hoc/withNetInfo';

import {sendLoginOTP} from '../services/authService';

const HEIGHT = Dimensions.get('screen').height;

const PhoneLoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    code: '+91',
    icon: null,
    name: 'India',
  });


  const validateInput = () => {
    if (phoneNumber == null || phoneNumber.trim() == '') {
      setError('* Required');
      return false;
    } else if (phoneNumber.length != 10) {
      setError('Must contain 10 digits');
      return false;
    } else return true;
  };

  const sendOTP = async () => {
    setLoading(true);
    setError(null);
    if (validateInput()) {
      try {
        const response = await sendLoginOTP(phoneNumber);
        const {otpId} = response?.data;
        setLoading(false);
        if (otpId) {
          navigation.navigate('OTPVerify', {
            phoneNumber: phoneNumber,
            otpId: otpId,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.message == 'Network Error') {
          setError(error.message);
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
    if (value?.length == 10) Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter phone number</Text>
      <Text style={styles.label}>
        We will send you a 4-digit OTP to your phone number for verification.
      </Text>
      <TouchableOpacity style={styles.countryButton} activeOpacity={0.8}>
        <Image source={flag} style={styles.flagIcon} />
        <Text style={styles.countryLabel}>{country.name}</Text>
        <View style={styles.separator} />
        <Text style={styles.countryCode}>{country.code}</Text>
      </TouchableOpacity>
      <TextInput
        maxLength={10}
        value={phoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Phone number"
        placeholderTextColor={DARKGREY}
        onChangeText={handlePhoneNumber}
      />
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
    </SafeAreaView>
  );
};

export default WithNetInfo(PhoneLoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: HEIGHT * 0.6,
  },
  title: {
    color: LIGHTBLACK,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    marginVertical: 15,
    color: DARKGREY,
    lineHeight: 20,
    fontSize: 13,
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
  },
  countryLabel: {
    fontSize: 12,
    color: LIGHTBLACK,
    fontWeight: '500',
    marginLeft: 15,
  },
  countryCode: {
    fontSize: 12,
    color: LIGHTBLACK,
    fontWeight: '500',
  },
  separator: {
    height: 13,
    borderLeftWidth: 0.8,
    borderLeftColor: 'rgba(0, 53, 121, 0.2)',
    marginHorizontal: 10,
  },
  flagIcon: {
    width: 20,
    height: 20,
  },
  dropIcon: {
    marginLeft: 'auto',
  },
  input: {
    backgroundColor: '#F4F5F5',
    borderRadius: 8,
    height: 48,
    fontSize: 13,
    paddingHorizontal: 10,
    marginTop: 20,
    color: DARKGREY,
  },
  error: {
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 12,
    paddingLeft: 5,
    color: 'red',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerLabel: {
    fontSize: 12,
    color: DARKGREY,
  },
  footerOtherLabel: {
    fontSize: 12,
    color: DARKBLUE,
    fontWeight: '500',
    marginTop: 3,
  },
  otherLabel: {
    fontSize: 12,
    color: LIGHTBLACK,
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: 'rgba(0, 53, 121, 0.2)',
  },
  buttonIcon: {
    height: 22,
    width: 22,
  },
});
