import axios from 'axios'
import {
    SET_TV
} from '../../constants/product/tv'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getTv = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tvs/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetTv(response.data))
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateRatingTv = (id, rating) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/tvs/' + id + '/rating', rating)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetTv(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataSetTv = (tv) => {
    return {type: SET_TV, payload: tv};
};



