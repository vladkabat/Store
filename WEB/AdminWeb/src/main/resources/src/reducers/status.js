import {
    AUTHENTICATED_ADMIN_TRUE,
    AUTHENTICATED_ADMIN_FALSE,
    UPDATED_PRODUCT_TRUE,
    CREATED_PRODUCT_TRUE,
    DELETED_PRODUCT_TRUE,
    OPERATIONS_PRODUCT_FALSE
} from '../constants/status'

const initialState = {
    authenticatedAdmin: false,
    createdProduct: false,
    deletedProduct: false,
    updatedProduct: false
};

const status = (state = initialState, action) => {
    if (action.type === AUTHENTICATED_ADMIN_TRUE) {
        return {
            ...state,
            authenticatedAdmin: true
        };
    } else if (action.type === AUTHENTICATED_ADMIN_FALSE) {
        return {
            ...state,
            authenticatedAdmin: false
        };
    } else if (action.type === DELETED_PRODUCT_TRUE) {
        return {
            ...state,
            deletedProduct: true
        };
    } else if (action.type === UPDATED_PRODUCT_TRUE) {
        return {
            ...state,
            updatedProduct: true
        };
    } else if (action.type === CREATED_PRODUCT_TRUE) {
        return {
            ...state,
            createdProduct: true
        };
    } else if (action.type === OPERATIONS_PRODUCT_FALSE) {
        return {
            ...state,
            createdProduct: false,
            deletedProduct: false,
            updatedProduct: false
        };
    }
    return state
};

export default status
