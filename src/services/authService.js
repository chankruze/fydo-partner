import axios from 'axios';
import {
  SEND_LOGIN_OTP_API,
  VERIFY_LOGIN_OTP_API,
  LOGOUT,
} from '../config/endpoints';

//header
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

//send login otp
export function sendLoginOTP(phoneNumber) {
  return axios({
    method: 'POST',
    url: SEND_LOGIN_OTP_API,
    responseType: 'json',
    headers: headers,
    data: {
      mobile: phoneNumber,
    },
  });
}

//verify login otp
export function verifyLoginOTP(otpId, otp) {
  return axios({
    method: 'POST',
    url: VERIFY_LOGIN_OTP_API,
    headers: headers,
    responseType: 'json',
    data: {
      otpId: otpId,
      otp: otp,
    },
  });
}

//logout
export function logout() {
  return axios({
    method: 'GET',
    url: LOGOUT,
    headers: headers,
    responseType: 'json',
  });
}
