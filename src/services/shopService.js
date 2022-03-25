import { GET_AMENITIES, GET_CAROUSELS, GET_MY_SHOP, GET_SHOP_STATUS, SHOP_STATUS_CHANGE, UPDATE_SHOP } from "../config/endpoints"

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

export function updateShop(token, data){
    return fetch(UPDATE_SHOP, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
}

export function getMyShop(token){
    return fetch(GET_MY_SHOP, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}

export function getAmenities(token){
    return fetch(GET_AMENITIES, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}