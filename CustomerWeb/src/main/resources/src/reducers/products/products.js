import {
    SET_PRODUCTS
} from '../../constants/products/products'
import {API_URL} from "../../constants/store"

const products = (state = [], action) => {
    if (action.type === SET_PRODUCTS) {
        let products = action.payload;
        if (products.length > 0) {
            return products.map((product) => {
                    let rating = 0;
                    product.ratings.forEach((ratingProduct) => {
                        rating = rating + ratingProduct.value;
                    });
                    if (rating !== 0) {
                        rating = (rating / product.ratings.length).toFixed(1);
                    }
                    let link = '';
                    if (product.type === 'PHONE') {
                        link = "/phones/" + product.id;
                    } else if (product.type === 'TV') {
                        link = "/tvs/" + product.id;
                    } else if (product.type === 'TABLET') {
                        link = "/tablets/" + product.id;
                    } else if (product.type === 'VIDEO_CAMERA') {
                        link = "/videoCameras/" + product.id;
                    }
                    return {
                        ...product,
                        rating: rating,
                        link: link,
                        urlImage: API_URL + "/images/" + product.imageId
                    };
                }
            )
        } else {
            return [];
        }
    }
    return state
};

export default products