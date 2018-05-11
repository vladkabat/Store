import axios from 'axios'
import {SET_PURCHASES, DELETE_PURCHASE} from '../constants/purchases'
import {dataDeleteOrders} from './orders'
import {API_URL} from '../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "./message"

export const getPurchases = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/purchases')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetPurchases(response.data));
            })
            .catch((error) => {
            console.log(error);
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const deletePurchase = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/purchases/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeletePurchase(id));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const createPurchase = (orders) => {
    return (dispatch) => {
        return axios
            .post(API_URL + '/purchases', orders)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteOrders());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataDeletePurchase = (id) => {
    return {type: DELETE_PURCHASE, payload: id};
};

const dataSetPurchases = (purchases) => {
    return {type: SET_PURCHASES, payload: purchases};
};
