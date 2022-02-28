import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { toastReducer } from "./toastReducer";

const rootReducers = combineReducers({
    admin: authReducer,
    toast: toastReducer
});

export default rootReducers;