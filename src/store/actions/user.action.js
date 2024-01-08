import { CLEAR_USER, SET_LANGUAGE, SET_USER, SET_SHOP } from "../types";

export function setUser(user) {
    return {
        type: SET_USER,
        payload: {
            user: user
        }
    }
}

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        payload: {
            language: language
        }
    }
}

export function setShop(myshop) {
    return {
        type: SET_SHOP,
        payload: myshop
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER
    }
}