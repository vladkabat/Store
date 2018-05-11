import {
    SET_VIDEO_CAMERA
} from '../../constants/product/videoCamera'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    name: "",
    linkUpdate: "",
    urlImage: "",
    description: "",
    rating: "",
    amount: "",
    numberMatrixPoints: "",
    optionalZoom: "",
    screenSize: "",
    price: ""
};

const videoCamera = (state = initialState, action) => {
    if (action.type === SET_VIDEO_CAMERA) {
        let videoCamera = action.payload;
        let rating = 0;
        for(let i = 0; i < videoCamera.ratings.length; i++){
            rating = rating + videoCamera.ratings[i].value;
        }
        if(rating !== 0){
            rating = (rating / videoCamera.ratings.length).toFixed(1);
        }
        return {
            id: videoCamera.id,
            name: videoCamera.name,
            linkUpdate: "/update/videoCameras/" + videoCamera.id,
            urlImage: API_URL + "/images/" + videoCamera.imageId,
            description: videoCamera.description,
            rating: rating,
            amount: videoCamera.amount,
            numberMatrixPoints: videoCamera.numberMatrixPoints,
            optionalZoom: videoCamera.optionalZoom,
            screenSize: videoCamera.screenSize,
            price: videoCamera.price
        };
    }
    return state
};

export default videoCamera
