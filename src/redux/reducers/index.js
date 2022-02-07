import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

const rootReducers = combineReducers({
    admin: authReducer
});

export default rootReducers;