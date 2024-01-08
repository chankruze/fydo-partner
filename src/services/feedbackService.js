import {FEEDBACK} from '../config/endpoints';
import ApiInstance from '../utils/ApiInstance';

export async function sendFeedback(token, feedback, ratingCount) {
  try {
    const response = await ApiInstance({
      method: 'POST',
      url: FEEDBACK,
      data: JSON.stringify({
        type: 'FEEDBACK',
        response: {
          feedbackText: feedback,
          rating: ratingCount,
        },
      }),
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
  // return fetch(FEEDBACK, {
  //     method: 'POST',
  //     headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //         "type": "FEEDBACK",
  //         "response": {
  //             "feedbackText": feedback,
  //             "rating": ratingCount
  //         }
  //     })
  // })
}
