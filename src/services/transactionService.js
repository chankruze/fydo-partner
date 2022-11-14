import { GET_SETTLEMENT, GET_TRANSACTION, GET_TRANSACTION_AMOUNT } from "../config/endpoints";

export function getTransaction(token, limit, page) {
    return fetch(GET_TRANSACTION + `?limit=${limit}&skip=${page}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}

export function getSettlement(token, limit, page, params) {
    return fetch(GET_SETTLEMENT + `?limit=${limit}&skip=${page}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        params
    })
}

export function getTransactionAmount(token) {
    return fetch(GET_TRANSACTION_AMOUNT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}