import axios from 'axios'
import {
    SET_TABLET
} from '../../constants/product/tablet'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getTablet = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tablets/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetTablet(response.data))
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateRatingTablet = (id, rating) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/tablets/' + id + '/rating', rating)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetTablet(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataSetTablet = (tablet) => {
    return {type: SET_TABLET, payload: tablet};
};



