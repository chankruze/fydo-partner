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

export const ADD_OFFER = BASE + "offer/add-offer-request";
export const GET_OFFERS = BASE + "offer/my-offers?type=OFFER&limit=0&skip=0";

export const GENERATE_PRESIGN_URL = BASE + "aws-util/generate-presigned-url";

export const FEEDBACK = BASE + "shop/form-response";

export const UPDATE_SHOP = BASE + "shop/update";
export const GET_MY_SHOP = BASE + "shop/my-shop";
export const REFER_EARN = BASE + "shop/form-response";