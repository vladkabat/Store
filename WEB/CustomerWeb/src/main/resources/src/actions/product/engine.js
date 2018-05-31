import axios from 'axios'
import {
    SET_ENGINE
} from '../../constants/product/engine'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getEngine = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/engines/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetEngine(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateRatingEngine = (id, rating) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/engines/' + id + '/rating', rating)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetEngine(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataSetEngine = (engine) => {
    return {type: SET_ENGINE, payload: engine};
};



