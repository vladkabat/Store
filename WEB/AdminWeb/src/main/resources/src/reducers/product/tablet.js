import {
    SET_TABLET
} from '../../constants/product/tablet'
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

const tablet = (state = initialState, action) => {
    if (action.type === SET_TABLET) {
        let tablet = action.payload;
        let rating = 0;
        for(let i = 0; i < tablet.ratings.length; i++){
            rating = rating + tablet.ratings[i].value;
        }
        if(rating !== 0){
            rating = (rating / tablet.ratings.length).toFixed(1);
        }
        return {
            id: tablet.id,
            name: tablet.name,
            linkUpdate: "/update/tablets/" + tablet.id,
            urlImage: API_URL + "/images/" + tablet.imageId,
            description: tablet.description,
            rating: rating,
            amount: tablet.amount,
            numberCores: tablet.numberCores,
            ram: tablet.ram,
            screenSize: tablet.screenSize,
            price: tablet.price
        };
    }
    return state
};

export default tablet
