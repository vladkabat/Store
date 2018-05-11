import axios from 'axios'
import {
    SET_VIDEO_CAMERA
} from '../../constants/product/videoCamera'
import {
    dataDeleteProductTrue,
    dataCreatedProductTrue,
    dataUpdatedProductTrue
} from '../status'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getVideoCamera = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/videoCameras/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataGetVideoCamera(response.data))
            })
    }
};

export const createVideoCamera = (file, name, description, numberMatrixPoints, optionalZoom, amount, screenSize) => {
    let data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("description", description);
    data.append("numberMatrixPoints", numberMatrixPoints);
    data.append("optionalZoom", optionalZoom);
    data.append("amount", amount);
    data.append("screenSize", screenSize);
    return (dispatch) => {
        return axios
            .post(API_URL + '/videoCameras/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataCreatedProductTrue());
            })
            .catch(() => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateVideoCamera = (file, id, name, description, numberMatrixPoints, optionalZoom, amount, screenSize) => {
    let data = new FormData();
    if(file !== undefined){
        data.append("file", file);
    }
    data.append("id", id);
    data.append("name", name);
    data.append("description", description);
    data.append("numberMatrixPoints", numberMatrixPoints);
    data.append("optionalZoom", optionalZoom);
    data.append("amount", amount);
    data.append("screenSize", screenSize);
    return (dispatch) => {
        return axios
            .put(API_URL + '/videoCameras/', data, {
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

export const deleteVideoCamera = (id) => {
    return (dispatch) => {
        return axios
            .delete(API_URL + '/videoCameras/' + id)
            .then(() => {
                dispatch(dataClearErrorMessage());
                dispatch(dataDeleteProductTrue());
            })
            .catch(() => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetVideoCamera = (videoCamera) => {
    return {type: SET_VIDEO_CAMERA, payload: videoCamera};
};



