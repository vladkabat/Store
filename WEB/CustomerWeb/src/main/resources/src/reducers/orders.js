import {SET_ORDERS, DELETE_ORDERS, ADD_ORDER, DELETE_ORDER} from '../constants/orders'
import {API_URL} from "../constants/store"

const orders = (state = [], action) => {
    if (action.type === DELETE_ORDER) {
        let id = action.payload;
        let isAmountOne = false;
        state.forEach((order) => {
            if (order.id === id && order.amount === 1) {
                isAmountOne = true;
            }
        });
        if (isAmountOne) {
            let localOrders = state.filter((order) => order.id !== id);
            if(localOrders.length > 0) {
                localStorage.setItem("orders", JSON.stringify(localOrders));
            } else {
                localStorage.removeItem("orders");
            }
            return localOrders;
        } else {
            let localOrders = state.map((order) => {
                if (order.id === id) {
                    return {
                        ...order,
                        amount: order.amount - 1
                    }
                } else {
                    return order;
                }
            });
            if(localOrders.length > 0) {
                localStorage.setItem("orders", JSON.stringify(localOrders));
            } else {
                localStorage.removeItem("orders");
            }
            return localOrders;
        }
    } else if (action.type === ADD_ORDER) {
        let product = action.payload.product;
        let isHaveProduct = false;
        state.forEach((order) => {
            if (order.product.id === product.id) {
                isHaveProduct = true;
            }
        });
        if (isHaveProduct) {
            let localOrders = state.map((order) => {
                if (order.product.id === product.id) {
                    return {
                        ...order,
                        amount: order.amount + 1
                    }
                } else {
                    return order;
                }
            });
            localStorage.setItem("orders", JSON.stringify(localOrders));
            return localOrders;
        } else {
            let link = '';
            if (product.type === 'ENGINE') {
                link = "/engines/" + product.id;
            } else if (product.type === 'FREQUENCY_CONVERTER') {
                link = "/frequencyConverters/" + product.id;
            }
            let order = {
                product: product,
                id: 'order' + product.id,
                rating: product.rating,
                linkProduct: link,
                urlImageProduct: API_URL + "/images/" + product.imageId,
                price: product.price,
                amount: 1
            };
            let localOrders = [
                ...state,
                order
            ];
            localStorage.setItem("orders", JSON.stringify(localOrders));
            return localOrders;
        }
    } else if (action.type === DELETE_ORDERS) {
        localStorage.removeItem("orders");
        return [];
    } else if (action.type === SET_ORDERS) {
        let orders = action.payload;
        if (orders.length > 0) {
            let localOrders = orders.map((order) => {
                let product = order.product;
                let rating = 0;
                for (let i = 0; i < product.ratings.length; i++) {
                    rating = rating + product.ratings[i].value;
                }
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
                };
            });
            localStorage.setItem("orders", JSON.stringify(localOrders));
            return localOrders;
        } else {
            localStorage.removeItem("orders");
            return [];
        }
    }

    return state;
};

export default orders