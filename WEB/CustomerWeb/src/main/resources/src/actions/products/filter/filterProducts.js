import {
    SET_NAME_FILTER_PRODUCTS,
    CLEAR_NAME_FILTER_PRODUCTS
} from '../../../constants/products/filter/filterProducts'

export const dataSetNameFilterProducts = (name) => {
    return {type: SET_NAME_FILTER_PRODUCTS, payload: name}
};

export const dataClearNameFilterProducts = () => {
    return {type: CLEAR_NAME_FILTER_PRODUCTS}
};

