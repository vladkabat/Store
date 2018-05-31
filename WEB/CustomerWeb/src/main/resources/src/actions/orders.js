import axios from 'axios'
import {SET_ORDERS, DELETE_ORDERS, ADD_ORDER, DELETE_ORDER} from '../constants/orders'
import {API_URL} from '../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from './message'

export const getOrders = () => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/orders')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetOrders(response.data))
            })
    }
};

export const addOrder = (order) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/orders/one', order)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetOrders(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const addOrders = (orders) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/orders/many', orders)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetOrders(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const deleteOrder = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/orders/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteOrder(id));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const dataSetOrders = (orders) => {
    return {type: SET_ORDERS, payload: orders};
};

export const dataDeleteOrder = (id) => {
    return {type: DELETE_ORDER, payload: id};
};

export const dataAddOrder = (order) => {
    return {type: ADD_ORDER, payload: order};
};

export const dataDeleteOrders = () => {
    return {type: DELETE_ORDERS};
};