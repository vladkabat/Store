import {
    SET_FREQUENCY_CONVERTERS
} from '../../constants/products/frequencyConverters'
import {
    SORT_FREQUENCY_CONVERTERS_BY_PRICE_DESC,
    SORT_FREQUENCY_CONVERTERS_BY_PRICE_ASC
} from '../../constants/products/sort/sortFrequencyConverters'
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

const frequencyConverters = (state = initialState, action) => {
    if (action.type === SET_FREQUENCY_CONVERTERS) {
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
                        link: "/frequencyConverters/" + product.id
                    };
                })
            }
        } else {
            return initialState;
        }
    } else if (action.type === SORT_FREQUENCY_CONVERTERS_BY_PRICE_ASC) {
        return {
            ...state,
            content: state.content.slice().sort((frequencyConverter1, frequencyConverter2) => {
                let sortVal = 0;
                if (frequencyConverter1.price > frequencyConverter2.price) {
                    sortVal = 1;
                } else if (frequencyConverter1.price < frequencyConverter2.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    } else if (action.type === SORT_FREQUENCY_CONVERTERS_BY_PRICE_DESC) {
        return {
            ...state,
            content: state.content.slice().sort((frequencyConverter1, frequencyConverter2) => {
                let sortVal = 0;
                if (frequencyConverter2.price > frequencyConverter1.price) {
                    sortVal = 1;
                } else if (frequencyConverter2.price < frequencyConverter1.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    }

    return state
};

export default frequencyConverters

