import axios from "axios";
import { UPLOAD_DEVICE_DEAILS_API } from "../config/endpoints";

//upload device info
export function uploadDeviceInfo(params) {
    return axios({
        method: 'POST',
        url: UPLOAD_DEVICE_DEAILS_API,
        data: params
    });
}