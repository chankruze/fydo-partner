import axios from "axios";
import { UPLOAD_DEVICE_DEAILS_API } from "../config/endpoints";

//upload device info
export function uploadDeviceInfo(params, token) {

    console.log('====================================');
    console.log("token==>", token, params);
    console.log('====================================');
    return axios({
        method: 'POST',
        url: UPLOAD_DEVICE_DEAILS_API,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: params
    });

    // return fetch(UPLOAD_DEVICE_DEAILS_API, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify(params)
    // })
}