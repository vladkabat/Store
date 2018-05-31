import {SET_PURCHASES, DELETE_PURCHASE} from '../constants/purchases'
import {API_URL} from "../constants/store"

const purchases = (state = [], action) => {
    if (action.type === DELETE_PURCHASE) {
        let id = action.payload;
        return state.filter((order) => order.id !== id);
    } else if (action.type === SET_PURCHASES) {
        let orders = action.payload;
        if (orders.length > 0) {
            return orders.map((order) => {
                let product = order.product;
                let rating = 0;
                product.ratings.forEach((ratingProduct) =>{
                    rating = rating + ratingProduct.value;
                });
                if(rating !== 0){
                    rating = (rating / product.ratings.length).toFixed(1);
                }
                let link = '';
                if (product.type === 'ENGINE') {
                    link = "/engines/" + product.id;
                } else if (product.type === 'FREQUENCY_CONVERTER') {
                    link = "/frequencyConverters/" + product.id;
                }
                return {
                    ...order,
                    rating: rating,
                    linkProduct: link,
                    urlImageProduct: API_URL + "/images/" + product.imageId,
                    price: product.price * order.amount
                }
            })
        } else {
            return [];
        }
    }
    return state;
};

export default purchases