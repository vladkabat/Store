import {
    SET_TABLET
} from '../../constants/product/tablet'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    name: "",
    type: "",
    ratings: [],
    uploadDate: "",
    imageId: "",
    urlImage: "",
    description: "",
    rating: "",
    amount: "",
    numberCores: "",
    ram: "",
    screenSize: "",
    price: "",
    link: ""
};

const tablet = (state = initialState, action) => {
    if (action.type === SET_TABLET) {
        let tablet = action.payload;
        let rating = 0;
        tablet.ratings.forEach((ratingProduct) => {
            rating = rating + ratingProduct.value;
        });
        if(rating !== 0){
            rating = (rating / tablet.ratings.length).toFixed(1);
        }
        return {
            ...tablet,
            rating: rating,
            link: "/tablets/" + tablet.id,
            urlImage: API_URL + "/images/" + tablet.imageId
        };
    }
    return state
};

export default tablet
