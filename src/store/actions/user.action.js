import { CLEAR_USER, SET_USER } from "../types";

export function setUser(user){
    return {
        type: SET_USER,
        payload: {
            user: user
        }
    }
}

export function clearUser(){
    return {
        type: CLEAR_USER
    }
}