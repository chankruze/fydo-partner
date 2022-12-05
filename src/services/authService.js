import axios from 'axios';
import {
  SEND_LOGIN_OTP_API,
  VERIFY_LOGIN_OTP_API,
  LOGOUT,
} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

//header
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

//send login otp
export async function sendLoginOTP(phoneNumber) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: SEND_LOGIN_OTP_API,
      data: {
        mobile: phoneNumber,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return axios({
  //   method: 'POST',
  //   url: SEND_LOGIN_OTP_API,
  //   responseType: 'json',
  //   headers: headers,
  //   data: {
  //     mobile: phoneNumber,
  //   },
  // });
}

//verify login otp
export async function verifyLoginOTP(otpId, otp) {

  console.log('====================================');
  console.log("params==>", otpId, otp);
  console.log('====================================');
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: VERIFY_LOGIN_OTP_API,
      data: {
        otpId: otpId,
        otp: otp,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return axios({
  //   method: 'POST',
  //   url: VERIFY_LOGIN_OTP_API,
  //   headers: headers,
  //   responseType: 'json',
  //   data: {
  //     otpId: otpId,
  //     otp: otp,
  //   },
  // });
}

//logout
export async function logout() {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: LOGOUT
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return axios({
  //   method: 'GET',
  //   url: LOGOUT,
  //   headers: headers,
  //   responseType: 'json',
  // });
}
