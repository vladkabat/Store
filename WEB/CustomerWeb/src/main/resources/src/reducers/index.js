import {combineReducers} from 'redux'
import message from './message'
import products from './products/products'
import orders from './orders'
import customer from './customer'
import phones from './products/phones'
import tvs from './products/tvs'
import videoCameras from './products/videoCameras'
import tablets from './products/tablets'
import tv from "./product/tv";
import videoCamera from "./product/videoCamera";
import tablet from "./product/tablet";
import phone from "./product/phone";
import purchases from "./purchases";
import filterProducts from "./filterProducts";

export default combineReducers({
    tv,
    videoCamera,
    tablet,
    phone,
    filterProducts,
    message,
    products,
    orders,
    purchases,
    tablets,
    tvs,
    phones,
    videoCameras,
    customer
})