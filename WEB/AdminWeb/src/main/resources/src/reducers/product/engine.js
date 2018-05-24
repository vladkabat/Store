import {
    SET_ENGINE
} from '../../constants/products/engines'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    name: "",
    linkUpdate: "",
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
            id: engine.id,
            name: engine.name,
            linkUpdate: "/update/engines/" + engine.id,
            urlImage: API_URL + "/images/" + engine.imageId,
            manufacturer: engine.manufacturer,
            rating: rating,
            amount: engine.amount,
            ratedPower: engine.ratedPower,
            ratedCurrent: engine.ratedCurrent,
            ratedVoltage: engine.ratedVoltage,
            price: engine.price
        };
    }
    return state
};

export default engine
