export const BASE = 'https://api2.lfyd.in/';
export const GOOGLE_MAP_API = '';

export const SEND_LOGIN_OTP_API = BASE + 'shop-login/send-otp-for-auth';
export const VERIFY_LOGIN_OTP_API = BASE + 'shop-login/validate-otp-for-auth';
export const LOGOUT = BASE + 'shop-login/logout';

//upload device info
export const UPLOAD_DEVICE_DEAILS_API = BASE + "communication/user-device-details";

//shop
export const SHOP_STATUS_CHANGE= BASE + "shop/set-shop-open-status";
export const GET_SHOP_STATUS = BASE + "shop/shop-open-status";

export const GET_CAROUSELS = BASE + "shop/homepage-carousel";

export const GET_NOTIFICATIONS = BASE + "notification/all?skip=0";
