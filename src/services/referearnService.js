import { REFER_EARN } from "../config/endpoints";

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