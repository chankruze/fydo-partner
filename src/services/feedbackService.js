import { FEEDBACK } from "../config/endpoints";

export function feedback(userId, feedback, ratingCount){
    return fetch(FEEDBACK, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            fileNames: fileNames
        })
    })
}