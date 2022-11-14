import { ADD_OFFER, GET_OFFERS } from "../config/endpoints";
import ApiInstance from '../utils/ApiInstance';

export async function addSale(token, data) {
    try {
        const response = await ApiInstance({
            method: 'POST',
            url: ADD_OFFER,
            data: JSON.stringify({
                title: data?.title,
                description: data?.description,
                startDate: data?.startDate,
                endDate: data?.endDate,
                type: 'SALE',
                imageUrl: data?.imageUrl
            })
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
    // return fetch(ADD_OFFER, {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         title: data?.title,
    //         description: data?.description,
    //         startDate: data?.startDate,
    //         endDate: data?.endDate,
    //         type: 'SALE',
    //         imageUrl: data?.imageUrl
    //     })
    // })
}

export async function getOffers(token, limit, page) {
    try {
        const response = await ApiInstance({
            method: 'GET',
            url: GET_OFFERS + `?type=SALE&limit=${limit}&skip=${page}`,
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
    // return fetch(GET_OFFERS + `?type=SALE&limit=${limit}&skip=${page}` , {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    // })
}
