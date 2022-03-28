import { saveUserData } from './../../utils/defaultPreference';
import { CLEAR_USER, SET_LANGUAGE, SET_USER } from "../types";

const intialState = {
    user: null,
    language: null
}

function userReducer(state = intialState, action) {
    let { type, payload } = action;
    switch (type) {
        case SET_USER: {
            let object = Object.assign({ ...state }, { user: payload.user });
            saveUserData(object);
            return object;
        }
        case SET_LANGUAGE: {
            console.log(payload?.language)
            let object = Object.assign({ ...state }, { language: payload?.language });
            saveUserData(object);
            return object;
        }
        case CLEAR_USER: {
            return { user: null }
        }
        default:
            return state;
    }
}

export default userReducer;