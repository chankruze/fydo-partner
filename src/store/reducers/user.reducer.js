import { clearData, saveUserData } from './../../utils/defaultPreference';
import { CLEAR_USER, SET_LANGUAGE, SET_SHOP, SET_USER } from "../types";

const intialState = {
    user: null,
    language: null,
    myshop: null
}

function userReducer(state = intialState, action) {
    let { type, payload } = action;
    let { myshop, user } = state;

    switch (type) {
        case SET_USER: {
            let object = Object.assign({ ...state }, { user: payload.user });
            return object;
        }
        case SET_LANGUAGE: {
            let object = Object.assign({ ...state }, { language: payload?.language });
            // saveUserData(object);
            return object;
        }
        case SET_SHOP: {
            let object = Object.assign({ ...state }, { myshop: payload });
            return object;
        }
        case CLEAR_USER: {
            clearData()
            return { user: null }
        }
        default:
            return state;
    }
}

export default userReducer;