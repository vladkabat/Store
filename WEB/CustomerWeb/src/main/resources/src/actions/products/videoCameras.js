import axios from 'axios'
import {
    SET_VIDEO_CAMERAS
} from '../../constants/products/videoCameras'
import {API_URL} from '../../constants/store'
import {dataClearErrorMessage, dataSetErrorMessage} from "../message"
import {dataClearNameFilterProducts} from "./filter/filterProducts"

export const getVideoCameras = (page, size) => {
    return (dispatch) => {
        return axios
            .get(API_URL + '/videoCameras?page=' + page + '&size=' + size + '&sort=id')
            .then((response) => {
                dispatch(dataClearErrorMessage());
                dispatch(dataClearNameFilterProducts());
                dispatch(dataGetVideoCameras(response.data));
            })
            .catch((error) => {
                dispatch(dataSetErrorMessage(error.response.data.errorMessage));
            })
    }
};

const dataGetVideoCameras = (videoCameras) => {
    return {type: SET_VIDEO_CAMERAS, payload: videoCameras};
};



