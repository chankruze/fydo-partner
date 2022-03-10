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
import { DARKBLUE, DARKGREY, GREY, LIGHTBLACK, PRIMARY } from '../assets/colors';


const HEIGHT = Dimensions.get('screen').height;


const OTPVerifyScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(null);
  const [otpId, setOtpId] = useState(route.params.otpId);
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInput = ()=> {
    if(otp == null || otp.trim() == ''){
        setError('* Required')
        return false;
    }
    else if(otp.length != 6){
        setError('Must contain 6 digits')
        return false;
    }
    else return true;
  }

  return (
    <View>
      <Text>{otpId}</Text>
      <Text>{phoneNumber}</Text>
    </View>
  );
};

export default OTPVerifyScreen


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
