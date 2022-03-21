import { GENERATE_PRESIGN_URL } from "../config/endpoints";

export async function generatePresignUrl(token, fileNames){
    console.log(fileNames)
    return fetch(GENERATE_PRESIGN_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            fileNames: fileNames
        })
    })
}