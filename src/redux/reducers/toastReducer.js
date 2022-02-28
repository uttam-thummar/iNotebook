import { ActionConstants } from "../actionConstants/actionConstants";

const initialToastStatus = null;

export const toastReducer = (state = initialToastStatus, {type, message, variant}) => {
    switch (type) {
        case ActionConstants.SET_TOAST_CONFIGURATION:
            {
                if(message===null && variant===null) {
                    return null;
                }
                return {
                ...state,
                message: message,
                variant: variant
                };
            }
        default:
            return state;
    }
}