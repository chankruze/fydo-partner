import { GET_SETTLEMENT, GET_TRANSACTION, GET_TRANSACTION_AMOUNT } from "../config/endpoints";
import ApiInstance from '../utils/ApiInstance';

export async function getTransaction(token, limit, page) {
    try {
        const response = await ApiInstance({
            method: 'POST',
            url: GET_TRANSACTION + `?limit=${limit}&skip=${page}`,
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
    // return fetch(GET_TRANSACTION + `?limit=${limit}&skip=${page}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    // })
}

export async function getSettlement(token, limit, page, params) {
    try {
        const response = await ApiInstance({
            method: 'POST',
            url: GET_SETTLEMENT + `?limit=${limit}&skip=${page}`,
            data: params
        });
        return Promise.resolve(response);
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
    // return fetch(GET_SETTLEMENT + `?limit=${limit}&skip=${page}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    //     params
    // })
}

export async function getTransactionAmount(token) {
    try {
        const response = await ApiInstance({
            method: 'POST',
            url: GET_TRANSACTION_AMOUNT,
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}