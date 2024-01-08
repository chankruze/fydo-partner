import {
  GET_AMENITIES,
  GET_CAROUSELS,
  GET_CATEGORIES,
  GET_MY_SHOP,
  GET_SHOP_STATUS,
  SHOP_STATUS_CHANGE,
  UPDATE_SHOP,
} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

export async function getShopStatus(token) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: GET_SHOP_STATUS,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_SHOP_STATUS, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //     },
  // })
}

export async function openShop(token) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: SHOP_STATUS_CHANGE,
      data: JSON.stringify({
        isOpen: true,
      }),
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(SHOP_STATUS_CHANGE, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //         isOpen: true
  //     })
  // })
}

export async function closeShop(token) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: SHOP_STATUS_CHANGE,
      data: JSON.stringify({
        isOpen: false,
      }),
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(SHOP_STATUS_CHANGE, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //         isOpen: false
  //     })
  // })
}

export async function getCarousels(token) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: GET_CAROUSELS,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_CAROUSELS, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  // })
}

export async function updateShop(token, data) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: UPDATE_SHOP,
      data: JSON.stringify(data),
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getMyShop(token) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: GET_MY_SHOP,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_MY_SHOP, {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  // })
}

export async function getAmenities(token) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: GET_AMENITIES,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_AMENITIES, {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  // })
}

export async function getCategories(token) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: GET_CATEGORIES,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(GET_AMENITIES, {
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //     },
  // })
}
