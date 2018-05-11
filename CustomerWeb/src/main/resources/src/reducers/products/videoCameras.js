import {
    SET_VIDEO_CAMERAS
} from '../../constants/products/videoCameras'
import {
    SORT_VIDEO_CAMERAS_BY_PRICE_DESC,
    SORT_VIDEO_CAMERAS_BY_PRICE_ASC
} from '../../constants/products/sort/sortVideoCameras'
import {API_URL} from "../../constants/store"

const initialState = {
    content: [],
    last: false,
    first: false,
    size: 2,
    number: 0,
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0
};

const videoCameras = (state = initialState, action) => {
    if (action.type === SET_VIDEO_CAMERAS) {
        let page = action.payload;
        let products = page.content;
        if (products.length > 0) {
            return {
                last: page.last,
                first: page.first,
                size: page.size,
                number: page.number,
                numberOfElements: page.numberOfElements,
                totalElements: page.totalElements,
                totalPages: page.totalPages,
                content: products.map((product) => {
                    let rating = 0;
                    product.ratings.forEach((ratingProduct) => {
                        rating = rating + ratingProduct.value;
                    });
                    if (rating !== 0) {
                        rating = (rating / product.ratings.length).toFixed(1);
                    }
                    return {
                        ...product,
                        rating: rating,
                        link: "/videoCameras/" + product.id,
                        urlImage: API_URL + "/images/" + product.imageId
                    };
                })
            }
        } else {
            return initialState;
        }
    } else if (action.type === SORT_VIDEO_CAMERAS_BY_PRICE_ASC) {
        return {
            ...state,
            content: state.content.slice().sort((videoCamera1, videoCamera2) => {
                let sortVal = 0;
                if (videoCamera1.price > videoCamera2.price) {
                    sortVal = 1;
                } else if (videoCamera1.price < videoCamera2.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    } else if (action.type === SORT_VIDEO_CAMERAS_BY_PRICE_DESC) {
        return {
            ...state,
            content: state.content.slice().sort((videoCamera1, videoCamera2) => {
                let sortVal = 0;
                if (videoCamera2.price > videoCamera1.price) {
                    sortVal = 1;
                } else if (videoCamera2.price < videoCamera1.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    }

    return state
};

export default videoCameras



