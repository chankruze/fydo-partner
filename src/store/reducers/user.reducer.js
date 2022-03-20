import {saveUserData} from './../../utils/sharedPreferences';
import { CLEAR_USER, SET_LANGUAGE, SET_USER } from "../types";

const intialState = {
    user: {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wSWQiOiI2MWY5MTRiNTkwZTUyMjk1OTNmM2U0NGYiLCJsb2dpblRpbWUiOjE2NDc4MDAxNjQ1ODIsImlhdCI6MTY0NzgwMDE2NCwiZXhwIjoxNjUwNDI4MTY0fQ.qurxvIP9hHOxCrRd8Y6hC9X_Qd3oMMkRWgFVA7HVDys",
        "_id": "61f914b590e5229593f3e44f",
        "mobile": "7409252064",
        "pics": [
            "https://lfydstaging.s3.ap-south-1.amazonaws.com/SHOP_IMAGE/755d73c3-2095-4397-8a6c-362c06b03e5e.png",
            "https://lfydstaging.s3.ap-south-1.amazonaws.com/SHOP_IMAGE/c13cb143-5b96-4d1d-8f8b-ce5c1bbc1418.png"
        ],
        "images": [
            {
                "url": "https://lfydstaging.s3.ap-south-1.amazonaws.com/SHOP_IMAGE/755d73c3-2095-4397-8a6c-362c06b03e5e.png"
            },
            {
                "url": "https://lfydstaging.s3.ap-south-1.amazonaws.com/SHOP_IMAGE/c13cb143-5b96-4d1d-8f8b-ce5c1bbc1418.png"
            }
        ],
        "amenities": [
            "61a5fd3fda4ca8137d18c4c9",
            "61a5fd3fda4ca8137d18c4cd"
        ],
        "status": "PENDING",
        "categories": [
            "61a5e366c09be2920647d192",
            "61f8a76590e5229593f3cd02"
        ],
        "brands": [],
        "isActive": true,
        "deleted": false,
        "timing": [],
        "comments": [],
        "createdAt": 1643713717108,
        "updatedAt": 1644905288027,
        "__v": 0,
        "address": {
            "addressLine1": "Unnamed Road, Lachhiwala Range, Uttarakhand 248140, India",
            "pin": "248140",
            "_id": "61fb8a21864f8f2df87812b4"
        },
        "bankDetails": {
            "upiIds": [],
            "_id": "61fb8a21864f8f2df87812b3"
        },
        "break": [
            {
                "dayOfWeek": "SUN",
                "breaks": [
                    {}
                ]
            },
            {
                "dayOfWeek": "MON",
                "breaks": [
                    {
                        "startTime": "",
                        "endTime": ""
                    }
                ]
            },
            {
                "dayOfWeek": "TUE",
                "breaks": [
                    {
                        "startTime": "",
                        "endTime": ""
                    }
                ]
            },
            {
                "dayOfWeek": "WED",
                "breaks": [
                    {
                        "startTime": "",
                        "endTime": ""
                    }
                ]
            },
            {
                "dayOfWeek": "THU",
                "breaks": [
                    {
                        "startTime": "",
                        "endTime": ""
                    }
                ]
            },
            {
                "dayOfWeek": "FRI",
                "breaks": [
                    {}
                ]
            },
            {
                "dayOfWeek": "SAT",
                "breaks": [
                    {}
                ]
            }
        ],
        "location": [
            78.0894605,
            30.1752109
        ],
        "name": "hdhdjd",
        "owner": {
            "ownerName": "Abhishek",
            "ownerMobile": "7409252064",
            "_id": "61fb8a21864f8f2df87812b2"
        },
        "type": "Independent store owners",
        "searchTags": [],
        "documents": [
            {
                "_id": "61f9153bc1d7d9c014d6affb",
                "documentType": "Pan Card",
                "shopId": "61f914b590e5229593f3e44f",
                "__v": 0,
                "createdAt": 1643713851849,
                "documentBackUrl": "",
                "documentFrontUrl": "",
                "updatedAt": 1644905288038
            }
        ],
        "profileComplete": true
    },
    language: null
}

function userReducer(state = intialState, action){
    let {type, payload} = action;
    switch(type){
        case SET_USER: {
            let object = Object.assign({...state}, {user: payload.user});
            saveUserData(object);
            return object;
        }
        case SET_LANGUAGE: {
            let object = Object.assign({...state}, {language: payload?.language});
            saveUserData(object);
            return object;
        }
        case CLEAR_USER: {
            return {user: null}
        }
        default : 
            return state;
    }
}

export default userReducer;