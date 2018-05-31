import {
    SET_MANUFACTURERS
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
                        link: "/manufacturers/" + manufacturer.id
                    };
                })
            }
        } else {
            return initialState;
        }
    }

    return state
};

export default manufacturers
