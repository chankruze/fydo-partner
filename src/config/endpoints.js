// export const BASE = 'https://api2.lfyd.in/';
export const BASE = 'https://api.fydo.in/';
// export const GOOGLE_MAP_API = 'AIzaSyAqTqXuRHOdBKs9Vmmqyrm966Lu-kGL7Qs';
export const GOOGLE_MAP_API = 'AIzaSyAJ_qAklmjyYP_fo6as_npbuVTslECfr_A';

export const SEND_LOGIN_OTP_API = BASE + 'shop-login/send-otp-for-auth';
export const VERIFY_LOGIN_OTP_API = BASE + 'shop-login/validate-otp-for-auth';
export const LOGOUT = BASE + 'shop-login/logout';

//upload device info
export const UPLOAD_DEVICE_DEAILS_API =
  BASE + 'communication/user-device-details';

//shop
export const SHOP_STATUS_CHANGE = BASE + 'shop/set-shop-open-status';
export const GET_SHOP_STATUS = BASE + 'shop/shop-open-status';

export const GET_CAROUSELS = BASE + 'shop/homepage-carousel';

export const GET_NOTIFICATIONS = BASE + 'notification/all';

export const ADD_OFFER = BASE + 'offer/add-offer-request';
export const GET_OFFERS = BASE + 'offer/my-offers';

export const GENERATE_PRESIGN_URL = BASE + 'aws-util/generate-presigned-url';

export const FEEDBACK = BASE + 'shop/form-response';

export const UPDATE_SHOP = BASE + 'shop/update';
export const GET_MY_SHOP = BASE + 'shop/my-shop';
export const REFER_EARN = BASE + 'shop/form-response';

export const GET_REFERRALS = BASE + 'referral/my-referrals';
export const GET_REFERRALS_CODE = BASE + 'referral/my-referral-code';

export const GET_AMENITIES = BASE + 'amenity/all';
export const GET_CATEGORIES = BASE + 'category/all';

export const GET_TRANSACTION =
  BASE + 'transaction/v1/fetch-my-shop-transactions';
export const GET_SETTLEMENT = BASE + 'transaction/v1/fetch-my-shop-settlements';
export const GET_TRANSACTION_AMOUNT =
  BASE + 'transaction/v1/fetch-unsettled-amount';

export const GET_POSTAL_ADDRESS =
  'https://maps.googleapis.com/maps/api/geocode/json';
export const CHECK_UPDATE = BASE + 'shop/min-supported-version';
