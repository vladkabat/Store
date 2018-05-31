import {
    SET_PHONES
} from '../../constants/products/phones'
import {
    SORT_PHONES_BY_PRICE_ASC,
    SORT_PHONES_BY_PRICE_DESC
} from '../../constants/products/sort/sortPhones'
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
                        link: "/phones/" + product.id,
                        urlImage: API_URL + "/images/" + product.imageId
                    };
                })
            }
        } else {
            return initialState;
        }
    } else if (action.type === SORT_PHONES_BY_PRICE_ASC) {
        return {
            ...state,
            content: state.content.slice().sort((phone1, phone2) => {
                let sortVal = 0;
                if (phone1.price > phone2.price) {
                    sortVal = 1;
                } else if (phone1.price < phone2.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    } else if (action.type === SORT_PHONES_BY_PRICE_DESC) {
        return {
            ...state,
            content: state.content.slice().sort((phone1, phone2) => {
                let sortVal = 0;
                if (phone2.price > phone1.price) {
                    sortVal = 1;
                } else if (phone2.price < phone1.price) {
                    sortVal = -1;
                }
                return sortVal;
            })
        }
    }

    return state
};

export default phones
