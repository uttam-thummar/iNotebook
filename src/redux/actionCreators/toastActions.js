import { ActionConstants } from "../actionConstants/actionConstants"

export const setToastConfiguration = (message = null, variant = null) => {
    return {
        type: ActionConstants.SET_TOAST_CONFIGURATION,
        message: message,
        variant: variant
    }
}