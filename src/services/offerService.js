import { ADD_OFFER } from "../config/endpoints";

export function addOffer(token, data){
    return fetch(ADD_OFFER, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: data?.title,
            description: data?.description,
            startDate: data?.startDate,
            endDate: data?.endDate,
            type: 'OFFER',
            imageUrl: data?.imageUrl
        })
    })
}