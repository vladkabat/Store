import {
    SET_FREQUENCY_CONVERTER
} from '../../constants/product/frequencyConverter'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    name: "",
    linkUpdate: "",
    urlImage: "",
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
        for(let i = 0; i < frequencyConverter.ratings.length; i++){
            rating = rating + frequencyConverter.ratings[i].value;
        }
        if(rating !== 0){
            rating = (rating / frequencyConverter.ratings.length).toFixed(1);
        }
        return {
            id: frequencyConverter.id,
            name: frequencyConverter.name,
            linkUpdate: "/update/frequencyConverters/" + frequencyConverter.id,
            urlImage: API_URL + "/images/" + frequencyConverter.imageId,
            manufacturer: frequencyConverter.manufacturer,
            rating: rating,
            amount: frequencyConverter.amount,
            outputPower: frequencyConverter.outputPower,
            outputCurrent: frequencyConverter.outputCurrent,
            outputVoltage: frequencyConverter.outputVoltage,
            price: frequencyConverter.price
        };
    }
    return state
};

export default frequencyConverter
