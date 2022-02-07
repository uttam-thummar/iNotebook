import { ActionConstants } from "../actionConstants/actionConstants";

const initialAuthStatus = {
    isAuth: false,
    authToken: null
}

export const authReducer = (state = initialAuthStatus, {type, status, authToken}) => {
    switch (type) {
        case ActionConstants.SET_AUTH_STATUS:
            return {
                ...state,
                isAuth: status,
                authToken: authToken
            };
        default:
            return state;
    }
}