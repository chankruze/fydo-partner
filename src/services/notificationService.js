import { GET_NOTIFICATIONS } from "../config/endpoints";

export function getNotifications(token){
    return fetch(GET_NOTIFICATIONS, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}