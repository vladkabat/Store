import {
    AUTHENTICATED_ADMIN_FALSE,
    AUTHENTICATED_ADMIN_TRUE,
    UPDATED_PRODUCT_TRUE,
    CREATED_PRODUCT_TRUE,
    DELETED_PRODUCT_TRUE,
    OPERATIONS_PRODUCT_FALSE
} from '../constants/status'

export const dataOperationsProductFalse = () => {
    return {type: OPERATIONS_PRODUCT_FALSE};
};

export const dataAuthenticatedAdminFalse = () => {
    return {type: AUTHENTICATED_ADMIN_FALSE};
};

export const dataAuthenticatedAdminTrue = () => {
    return {type: AUTHENTICATED_ADMIN_TRUE};
};

export const dataCreatedProductTrue = () => {
    return {type: CREATED_PRODUCT_TRUE};
};

export const dataUpdatedProductTrue = () => {
    return {type: UPDATED_PRODUCT_TRUE};
};

export const dataDeleteProductTrue = () => {
    return {type: DELETED_PRODUCT_TRUE};
};

