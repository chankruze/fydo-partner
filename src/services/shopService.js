import { GET_CAROUSELS, GET_SHOP_STATUS, SHOP_STATUS_CHANGE } from "../config/endpoints"

export function getShopStatus(token){
    return fetch(GET_SHOP_STATUS, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}

export function openShop(token){
    return fetch(SHOP_STATUS_CHANGE, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isOpen: true
        })
    })
}

export function closeShop(token){
    return fetch(SHOP_STATUS_CHANGE, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            isOpen: false
        })
    })
}

export function getCarousels(token){
    return fetch(GET_CAROUSELS, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}