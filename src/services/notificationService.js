import { GET_NOTIFICATIONS } from "../config/endpoints";

export function getNotifications(token,limit,page){
    return fetch(GET_NOTIFICATIONS+`?type=OFFER&limit=${limit}&skip=${page}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}