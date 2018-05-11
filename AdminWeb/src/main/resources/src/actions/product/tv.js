import axios from 'axios'
import {
    SET_TV
} from '../../constants/product/tv'
import {
    dataDeleteProductTrue,
    dataCreatedProductTrue,
    dataUpdatedProductTrue
} from '../status'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getTv = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/tvs/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetTv(response.data))
            })
    }
};

export const createTv = (file, name, description, resolutionScreen, cpu, amount, screenSize) => {
    let data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("description", description);
    data.append("resolutionScreen", resolutionScreen);
    data.append("cpu", cpu);
    data.append("amount", amount);
    data.append("screenSize", screenSize);
    return (dispatch) => {
        return axios
            .post(API_URL + '/tvs/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataCreatedProductTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateTv = (file, id, name, description, resolutionScreen, cpu, amount, screenSize) => {
    let data = new FormData();
    if(file !== undefined){
        data.append("file", file);
    }
    data.append("id", id);
    data.append("name", name);
    data.append("description", description);
    data.append("resolutionScreen", resolutionScreen);
    data.append("cpu", cpu);
    data.append("amount", amount);
    data.append("screenSize", screenSize);
    return (dispatch) => {
        return axios
            .put(API_URL + '/tvs/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataUpdatedProductTrue());
            })
            .catch(() => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const deleteTv = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/tvs/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteProductTrue());
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetTv = (tv) => {
    return {type: SET_TV, payload: tv};
};



