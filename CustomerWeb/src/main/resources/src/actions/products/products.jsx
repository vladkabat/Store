import axios from 'axios'
import {
    SET_PRODUCTS
} from '../../constants/products/products'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getProducts = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/products')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetProducts(response.data))
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetProducts = (products) => {
    return {type: SET_PRODUCTS, payload: products};
};



