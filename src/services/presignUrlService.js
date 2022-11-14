import { GENERATE_PRESIGN_URL } from "../config/endpoints";
import ApiInstance from '../utils/ApiInstance';

export async function generatePresignUrl(token, fileNames) {
    try {
        const response = await ApiInstance({
            method: 'POST',
            url: GENERATE_PRESIGN_URL,
            data: JSON.stringify({
                fileNames: fileNames
            })
        });

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
    // return fetch(GENERATE_PRESIGN_URL, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify({
    //         fileNames: fileNames
    //     })
    // })
}