import {
    SET_ENGINE
} from '../../constants/product/engine'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    type: "",
    name: "",
    uploadDate: "",
    ratings: [],
    imageId: "",
    link: "",
    urlImage: "",
    manufacturer: "",
    rating: "",
    amount: "",
    ratedPower: "",
    ratedCurrent: "",
    ratedVoltage: "",
    price: ""
};

const engine = (state = initialState, action) => {
    if (action.type === SET_ENGINE) {
        let engine = action.payload;
        let rating = 0;
        for (let i = 0; i < engine.ratings.length; i++) {
            rating = rating + engine.ratings[i].value;
        }
        if (rating !== 0) {
            rating = (rating / engine.ratings.length).toFixed(1);
        }
        return {
            ...engine,
            rating: rating,
            link: "/engines/" + engine.id,
            urlImage: API_URL + "/images/" + engine.imageId
        };
    }
    return state
};

export default engine
