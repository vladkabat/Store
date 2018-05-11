import {
    SET_VIDEO_CAMERA
} from '../../constants/product/videoCamera'
import {API_URL} from "../../constants/store"

const initialState = {
    type: "",
    ratings: [],
    uploadDate: "",
    imageId: "",
    id: "",
    name: "",
    urlImage: "",
    description: "",
    rating: "",
    amount: "",
    numberMatrixPoints: "",
    optionalZoom: "",
    screenSize: "",
    price: "",
    link: ""
};

const videoCamera = (state = initialState, action) => {
    if (action.type === SET_VIDEO_CAMERA) {
        let videoCamera = action.payload;
        let rating = 0;
        videoCamera.ratings.forEach((ratingProduct) => {
            rating = rating + ratingProduct.value;
        });
        if(rating !== 0){
            rating = (rating / videoCamera.ratings.length).toFixed(1);
        }
        return {
            ...videoCamera,
            rating: rating,
            link: "/videoCameras/" + videoCamera.id,
            urlImage: API_URL + "/images/" + videoCamera.imageId
        };
    }
    return state
};

export default videoCamera
