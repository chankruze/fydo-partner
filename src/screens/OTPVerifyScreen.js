import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {DARKBLUE, DARKGREY, GREY, LIGHTBLACK, PRIMARY} from '../assets/colors';
import {sendLoginOTP, verifyLoginOTP} from '../services/authService';
import {setUser} from '../store/actions/user.action';
import {createRef} from 'react';
import {connect} from 'react-redux';
import {saveUserData} from '../utils/sharedPreferences';
import ButtonComponent from '../components/ButtonComponent';
import OTPTextInput from 'react-native-otp-textinput';

const HEIGHT = Dimensions.get('screen').height;

const mapDispatchToProps = function (dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

const OTPVerifyScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(null);
  const [otpId, setOtpId] = useState(route.params.otpId);
  const {phoneNumber} = route.params.phoneNumber;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const otpInput = createRef();

  const validateInput = () => {
    if (otp == null || otp.trim() == '') {
      setError('* Required');
      return false;
    } else if (otp.length != 6) {
      setError('Must contain 6 digits');
      return false;
    } else return true;
  };

  const handleOTP = value => {
    setOtp(value);
  };
  const verify = async () => {
    setError(null);
    setLoading(true);
    if (!validateInput()) return;
    try {
      const response = await verifyLoginOTP(otpId, otp);
      const {data} = response;
      setLoading(false);
      if (data.message) {
        setError(data.message);
      } else {
        setUser(data);
        saveUserData(data);
        if (data.profileComplete) {
          console.log('User Profile Complete, add suitable route');
        } else {
          navigation.navigate("RegisterShop", {
            phoneNumber: phoneNumber
          })
        }
      }
    } catch (error) {
      if (error.message == 'Request failed with status code 403') {
        setError('Invalid OTP');
        setLoading(false);
      } else {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  const resendOTP = async () => {
    try {
      const response = await sendLoginOTP(phoneNumber);
      const {otpId} = response?.data;
      setOtp(null);
      setOtpId(otpId);
      otpInput.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.label}>
        Please enter the 6-digit OTP sent to you at {phoneNumber}
      </Text>
      <OTPTextInput
        // ref={e => (otpInput = e)}
        handleTextChange={handleOTP}
        inputCount={6}
        containerStyle={styles.optContainer}
        textInputStyle={styles.otpBox}
      />
      {error != null && <Text style={styles.error}>{error}</Text>}
      <ButtonComponent
        backgroundColor={PRIMARY}
        color="white"
        label="Verify & continue"
        onPress={verify}
        loading={loading}
      />
      <View style={styles.row}>
        <Text style={styles.label}>Didn't get the OTP?</Text>
        <TouchableOpacity
          disabled={otp?.length != 6}
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
    </SafeAreaView>
  );
};

export default OTPVerifyScreen;

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
    fontWeight: 'bold',
    color: DARKBLUE,
  },
  otpInput: {
    height: 48,
    backgroundColor: '#F4F5F5',
    marginVertical: 20,
    width: '22%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    color: DARKGREY,
  },
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 15,
  },
  otpBox: {
    backgroundColor: '#F4F5F5',
    borderBottomWidth: 0,
    fontSize: 14,
    color: 'black',
    width: 45,
  },
  error: {
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 12,
    paddingLeft: 5,
    color: 'red',
  },
});
