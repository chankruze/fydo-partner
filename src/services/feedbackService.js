import { FEEDBACK } from "../config/endpoints";

export function sendFeedback(token, feedback, ratingCount){
    return fetch(FEEDBACK, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "type": "FEEDBACK",
            "response": {
                "feedbackText": feedback,
                "rating": ratingCount
            }
        })
    })
}