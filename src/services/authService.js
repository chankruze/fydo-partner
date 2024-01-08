import {
  LOGOUT,
  SEND_LOGIN_OTP_API,
  VERIFY_LOGIN_OTP_API,
} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

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
}

export async function verifyLoginOTP(otpId, otp) {
  console.log('====================================');
  console.log('params==>', otpId, otp);
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
}

export async function logout() {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: LOGOUT,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
