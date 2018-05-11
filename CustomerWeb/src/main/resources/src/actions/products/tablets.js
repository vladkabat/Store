import axios from 'axios'
import {
    SET_TABLETS
} from '../../constants/products/tablets'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataClearNameFilterProducts} from "./filter/filterProducts"

export const getTablets = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tablets?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataClearNameFilterProducts());
                dispatch(dataGetTablets(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetTablets = (tablets) => {
    return {type: SET_TABLETS, payload: tablets};
};



