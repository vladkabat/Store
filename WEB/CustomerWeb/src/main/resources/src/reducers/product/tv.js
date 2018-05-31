import {
    SET_TV
} from '../../constants/product/tv'
import {API_URL} from "../../constants/store"

const initialState = {
    type: "",
    ratings: [],
    uploadDate: "",
    imageId: "",
    urlImage: "",
    id: "",
    name: "",
    linkUpdate: "",
    description: "",
    rating: "",
    amount: "",
    resolutionScreen: "",
    cpu: "",
    screenSize: "",
    price: "",
    link: ""
};

const tv = (state = initialState, action) => {
    if (action.type === SET_TV) {
        let tv = action.payload;
        let rating = 0;
        tv.ratings.forEach((ratingProduct) => {
            rating = rating + ratingProduct.value;
        });
        if(rating !== 0){
            rating = (rating / tv.ratings.length).toFixed(1);
        }
        return {
            ...tv,
            rating: rating,
            link: "/tvs/" + tv.id,
            urlImage: API_URL + "/images/" + tv.imageId
        };
    }
    return state
};

export default tv
