import {
  GET_REFERRALS,
  GET_REFERRALS_CODE,
  REFER_EARN,
} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

export async function refer(token, shopName, shopContactNumber) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: REFER_EARN,
      data: JSON.stringify({
        type: 'CLOSE_SHOP',
        response: {
          contactNumber: shopContactNumber,
          shopName: shopName,
        },
      }),
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(REFER_EARN, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //         "type": "CLOSE_SHOP",
  //         "response": {
  //             "contactNumber" : shopContactNumber,
  //             "shopName" : shopName
  //         }
  //     })
  // })
}
export async function getRefer(token, limit, page) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: `${GET_REFERRALS}?limit=${limit}&skip=${page}`,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_REFERRALS + `?limit=${limit}&skip=${page}` , {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  // })
}

export async function getReferCode(token) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: GET_REFERRALS_CODE,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_REFERRALS_CODE, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  // })
}
