import { ActionConstants } from "../actionConstants/actionConstants"

export const setAuthStatus = (status, authToken) => {
    return {
        type: ActionConstants.SET_AUTH_STATUS,
        status: status,
        authToken: authToken
    }
}