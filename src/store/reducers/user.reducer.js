import { CLEAR_USER, SET_USER } from "../types";

const intialState = {
    user: null
}

function userReducer(state = intialState, action){
    let {type, payload} = action;
    switch(type){
        case SET_USER: {
            return Object.assign({...state}, {user: payload.user});
        }
        case CLEAR_USER: {
            return {user: null}
        }
        default : 
            return state;
    }
}

export default userReducer;