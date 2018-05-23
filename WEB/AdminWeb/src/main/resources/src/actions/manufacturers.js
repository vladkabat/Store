import axios from 'axios'
import {
    SET_MANUFACTURERS
} from '../constants/manufacturers'
import {API_URL} from '../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "./message"
import {dataOperationsFalse} from "./status"

export const getManufacturers = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/manufacturers?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataOperationsFalse());
                dispatch(dataClearErrorMessage());
                dispatch(dataGetManufacturers(response.data));
            })
    }
};

const dataGetManufacturers= (manufacturers) => {
    return {type: SET_MANUFACTURERS, payload: manufacturers};
};