import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    userReducer: userReducer
});

export default rootReducer;