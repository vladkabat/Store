import {
    SET_PHONE
} from '../../constants/product/phone'
import {API_URL} from "../../constants/store"

const initialState = {
    id: "",
    type: "",
    name: "",
    uploadDate: "",
    imageId: "",
    ratings: [],
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

const phone = (state = initialState, action) => {
    if (action.type === SET_PHONE) {
        let phone = action.payload;
        let rating = 0;
        phone.ratings.forEach((ratingProduct) =>{
            rating = rating + ratingProduct.value;
        });
        if(rating !== 0){
            rating = (rating / phone.ratings.length).toFixed(1);
        }
        return {
            ...phone,
            rating: rating,
            link: "/phones/" + phone.id,
            urlImage: API_URL + "/images/" + phone.imageId
        };
    }
    return state
};

export default phone
