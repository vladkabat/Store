import axios from 'axios'
import {
    SET_ENGINES
} from '../../constants/products/engines'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataClearNameFilterProducts} from "./filter/filterProducts"

export const getEngines = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/engines?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataClearNameFilterProducts());
                dispatch(dataGetEngines(response.data));
            })
    }
};

const dataGetEngines = (engines) => {
    return {type: SET_ENGINES, payload: engines};
};



