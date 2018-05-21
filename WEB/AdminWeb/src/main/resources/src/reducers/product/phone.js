import {
    SET_PHONE
} from '../../constants/product/phone'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    name: "",
    linkUpdate: "",
    urlImage: "",
    description: "",
    rating: "",
    amount: "",
    numberCores: "",
    ram: "",
    screenSize: "",
    price: ""
};

const phone = (state = initialState, action) => {
    if (action.type === SET_PHONE) {
        let phone = action.payload;
        let rating = 0;
        for(let i = 0; i < phone.ratings.length; i++){
            rating = rating + phone.ratings[i].value;
        }
        if(rating !== 0){
            rating = (rating / phone.ratings.length).toFixed(1);
        }
        return {
            id: phone.id,
            name: phone.name,
            linkUpdate: "/update/phones/" + phone.id,
            urlImage: API_URL + "/images/" + phone.imageId,
            description: phone.description,
            rating: rating,
            amount: phone.amount,
            numberCores: phone.numberCores,
            ram: phone.ram,
            screenSize: phone.screenSize,
            price: phone.price
        };
    }
    return state
};

export default phone
