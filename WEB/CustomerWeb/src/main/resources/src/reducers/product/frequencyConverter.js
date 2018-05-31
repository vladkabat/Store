import {
    SET_FREQUENCY_CONVERTER
} from '../../constants/product/frequencyConverter'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    type: "",
    name: "",
    uploadDate: "",
    urlImage: "",
    ratings: [],
    link: "",
    manufacturer: "",
    rating: "",
    amount: "",
    outputPower: "",
    outputCurrent: "",
    outputVoltage: "",
    price: ""
};

const frequencyConverter = (state = initialState, action) => {
    if (action.type === SET_FREQUENCY_CONVERTER) {
        let frequencyConverter = action.payload;
        let rating = 0;
        for (let i = 0; i < frequencyConverter.ratings.length; i++) {
            rating = rating + frequencyConverter.ratings[i].value;
        }
        if (rating !== 0) {
            rating = (rating / frequencyConverter.ratings.length).toFixed(1);
        }
        return {
            ...frequencyConverter,
            rating: rating,
            link: "/frequencyConverters/" + frequencyConverter.id,
            urlImage: API_URL + "/images/" + frequencyConverter.imageId
        };
    }
    return state
};

export default frequencyConverter