import axios from 'axios'
import {
    SET_VIDEO_CAMERA
} from '../../constants/product/videoCamera'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"

export const getVideoCamera = (id) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/videoCameras/' + id)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetVideoCamera(response.data))
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

export const updateRatingVideoCamera = (id, rating) => {
    return (dispatch) => {
        return axios
            .put(API_URL + '/videoCameras/' + id + '/rating', rating)
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataSetVideoCamera(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataSetVideoCamera = (videoCamera) => {
    return {type: SET_VIDEO_CAMERA, payload: videoCamera};
};



