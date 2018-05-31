import {
    SET_TABLETS
} from '../../constants/products/tablets'
import {
    SORT_TABLETS_BY_PRICE_DESC,
    SORT_TABLETS_BY_PRICE_ASC
} from '../../constants/products/sort/sortTablets'
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

const tablets = (state = initialState, action) => {
    if (action.type === SET_TABLETS) {
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
                        urlImage: API_URL + "/images/" + product.imageId,
                        link: "/tablets/" + product.id
                    };
                })
            }
        } else {
            return initialState;
        }
    } else if (action.type === SORT_TABLETS_BY_PRICE_ASC) {
        return {
            ...state,
            content: state.content.slice().sort((tablet1, tablet2) => {
                let sortVal = 0;
                if (tablet1.price > tablet2.price) {
                    sortVal = 1;
                } else if (tablet1.price < tablet2.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    } else if (action.type === SORT_TABLETS_BY_PRICE_DESC) {
        return {
            ...state,
            content: state.content.slice().sort((tablet1, tablet2) => {
                let sortVal = 0;
                if (tablet2.price > tablet1.price) {
                    sortVal = 1;
                } else if (tablet2.price < tablet1.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    }

    return state
};

export default tablets

