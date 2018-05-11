import {
    SET_TV
} from '../../constants/product/tv'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    name: "",
    linkUpdate: "",
    urlImage: "",
    description: "",
    rating: "",
    amount: "",
    resolutionScreen: "",
    cpu: "",
    screenSize: "",
    price: ""
};

const tv = (state = initialState, action) => {
    if (action.type === SET_TV) {
        let tv = action.payload;
        let rating = 0;
        for(let i = 0; i < tv.ratings.length; i++){
            rating = rating + tv.ratings[i].value;
        }
        if(rating !== 0){
            rating = (rating / tv.ratings.length).toFixed(1);
        }
        return {
            id: tv.id,
            name: tv.name,
            linkUpdate: "/update/tvs/" + tv.id,
            urlImage: API_URL + "/images/" + tv.imageId,
            description: tv.description,
            rating: rating,
            amount: tv.amount,
            resolutionScreen: tv.resolutionScreen,
            cpu: tv.cpu,
            screenSize: tv.screenSize,
            price: tv.price
        };
    }
    return state
};

export default tv
