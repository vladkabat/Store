import {
    AUTHENTICATED_FALSE,
    AUTHENTICATED_TRUE,
    UPDATED_TRUE,
    CREATED_TRUE,
    DELETED_TRUE,
    OPERATIONS_FALSE
} from '../constants/status'

export const dataOperationsFalse = () => {
    return {type: OPERATIONS_FALSE};
};

export const dataAuthenticatedFalse = () => {
    return {type: AUTHENTICATED_FALSE};
};

export const dataAuthenticatedTrue = () => {
    return {type: AUTHENTICATED_TRUE};
};

export const dataCreatedTrue = () => {
    return {type: CREATED_TRUE};
};

export const dataUpdatedTrue = () => {
    return {type: UPDATED_TRUE};
};

export const dataDeleteTrue = () => {
    return {type: DELETED_TRUE};
};

