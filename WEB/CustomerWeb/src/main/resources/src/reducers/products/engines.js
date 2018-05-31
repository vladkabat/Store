import {
    SET_ENGINES
} from '../../constants/products/engines'
import {
    SORT_ENGINES_BY_PRICE_ASC,
    SORT_ENGINES_BY_PRICE_DESC
} from '../../constants/products/sort/sortEngines'
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

const engines = (state = initialState, action) => {
    if (action.type === SET_ENGINES) {
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
                        link: "/engines/" + product.id,
                        urlImage: API_URL + "/images/" + product.imageId
                    };
                })
            }
        } else {
            return initialState;
        }
    } else if (action.type === SORT_ENGINES_BY_PRICE_ASC) {
        return {
            ...state,
            content: state.content.slice().sort((engine1, engine2) => {
                let sortVal = 0;
                if (engine1.price > engine2.price) {
                    sortVal = 1;
                } else if (engine1.price < engine2.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    } else if (action.type === SORT_ENGINES_BY_PRICE_DESC) {
        return {
            ...state,
            content: state.content.slice().sort((engine1, engine2) => {
                let sortVal = 0;
                if (engine2.price > engine1.price) {
                    sortVal = 1;
                } else if (engine2.price < engine1.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    }

    return state
};

export default engines
