import { GET_REFERRALS, GET_REFERRALS_CODE, REFER_EARN } from "../config/endpoints";

export function refer(token, shopName, shopContactNumber){
    return fetch(REFER_EARN, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "type": "CLOSE_SHOP",
            "response": {
                "contactNumber" : shopContactNumber,
                "shopName" : shopName
            }
        })
    })
}
export function getRefer(token,limit,page){
    return fetch(GET_REFERRALS + `?limit=${limit}&skip=${page}` , {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}

export function getReferCode(token){
    return fetch(GET_REFERRALS_CODE, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
}