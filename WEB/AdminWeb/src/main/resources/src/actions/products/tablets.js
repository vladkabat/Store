import axios from 'axios'
import {
    SET_TABLETS
} from '../../constants/products/tablets'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataOperationsProductFalse} from "../status"

export const getTablets = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tablets?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataOperationsProductFalse());
                dispatch(dataClearErrorMessage());
                dispatch(dataGetTablets(response.data));
            })
    }
};

const dataGetTablets = (tablets) => {
    return {type: SET_TABLETS, payload: tablets};
};



