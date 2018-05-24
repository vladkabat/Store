import {
    SET_MANUFACTURERS,
    DELETE_MANUFACTURER
} from '../constants/manufacturers'

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

const manufacturers = (state = initialState, action) => {
    if (action.type === SET_MANUFACTURERS) {
        let page = action.payload;
        let manufacturers = page.content;
        if (manufacturers != null && manufacturers.length > 0) {
            return {
                last: page.last,
                first: page.first,
                size: page.size,
                number: page.number,
                numberOfElements: page.numberOfElements,
                totalElements: page.totalElements,
                totalPages: page.totalPages,
                content: manufacturers.map((manufacturer) => {
                    return {
                        ...manufacturer,
                        linkUpdate: "/update/manufacturers/" + manufacturer.id,
                        link: "/manufacturers/" + manufacturer.id
                    };
                })
            }
        } else {
            return initialState;
        }
    } else if (action.type === DELETE_MANUFACTURER) {
        let id = action.payload;
        return {
            ...state,
            content: state.content.filter(manufacturer => manufacturer.id !== id)
        }
    }

    return state
};

export default manufacturers
