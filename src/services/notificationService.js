import {GET_NOTIFICATIONS} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

export async function getNotifications(token, limit, page) {
  try {
    const response = await ApiInstance({
      method: 'GET',
      url: `${GET_NOTIFICATIONS}?type=OFFER&limit=${limit}&skip=${page}`,
    });

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
