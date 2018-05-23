import {
    AUTHENTICATED_TRUE,
    AUTHENTICATED_FALSE,
    UPDATED_TRUE,
    CREATED_TRUE,
    DELETED_TRUE,
    OPERATIONS_FALSE
} from '../constants/status'

const initialState = {
    authenticated: false,
    created: false,
    deleted: false,
    updated: false
};

const status = (state = initialState, action) => {
    if (action.type === AUTHENTICATED_TRUE) {
        return {
            ...state,
            authenticated: true
        };
    } else if (action.type === AUTHENTICATED_FALSE) {
        return {
            ...state,
            authenticated: false
        };
    } else if (action.type === DELETED_TRUE) {
        return {
            ...state,
            deleted: true
        };
    } else if (action.type === UPDATED_TRUE) {
        return {
            ...state,
            updated: true
        };
    } else if (action.type === CREATED_TRUE) {
        return {
            ...state,
            created: true
        };
    } else if (action.type === OPERATIONS_FALSE) {
        return {
            ...state,
            created: false,
            deleted: false,
            updated: false
        };
    }
    return state
};

export default status
