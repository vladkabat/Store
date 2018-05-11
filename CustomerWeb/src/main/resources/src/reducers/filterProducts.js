import {SET_NAME_FILTER_PRODUCTS, CLEAR_NAME_FILTER_PRODUCTS} from "../constants/products/filter/filterProducts"

const filterProducts = (state = '', action) => {
    if (action.type === SET_NAME_FILTER_PRODUCTS) {
        return action.payload;
    } else if (action.type === CLEAR_NAME_FILTER_PRODUCTS) {
        return '';
    }
    return state;
};

export default filterProducts