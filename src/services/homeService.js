import {CHECK_UPDATE, UPLOAD_DEVICE_DEAILS_API} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

//upload device info
export async function uploadDeviceInfo(params, token) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: UPLOAD_DEVICE_DEAILS_API,
      data: params,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }

  // return axios({
  //     method: 'POST',
  //     url: UPLOAD_DEVICE_DEAILS_API,
  //     headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //     },
  //     data: params
  // });

  // return fetch(UPLOAD_DEVICE_DEAILS_API, {
  //     method: 'POST',
  //     headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify(params)
  // })
}

export async function getSupportVersion() {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: CHECK_UPDATE,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
