import {
    SET_PHONES
} from '../../constants/products/phones'
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

const phones = (state = initialState, action) => {
    if (action.type === SET_PHONES) {
        let page = action.payload;
        let products = page.content;
        if (products != null && products.length > 0) {
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
                    for (let i = 0; i < product.ratings.length; i++) {
                        rating = rating + product.ratings[i].value;
                    }
                    if (rating !== 0) {
                        rating = (rating / product.ratings.length).toFixed(1);
                    }
                    return {
                        ...product,
                        rating: rating,
                        link: "/phones/" + product.id,
                        urlImage: API_URL + "/images/" + product.imageId
                    };
                })
            }
        } else {
            return initialState;
        }
    }

    return state
};

export default phones
