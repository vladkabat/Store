import {combineReducers} from 'redux'
import message from './message'
import products from './products/products'
import orders from './orders'
import customer from './customer'
import engines from './products/engines'
import frequencyConverters from './products/frequencyConverters'
import engine from "./product/engine";
import frequencyConverter from "./product/frequencyConverter";
import purchases from "./purchases";
import filterProducts from "./filterProducts";
import manufacturers from "./manufacturers";

export default combineReducers({
    frequencyConverter,
    engine,
    filterProducts,
    message,
    products,
    orders,
    purchases,
    frequencyConverters,
    engines,
    customer,
    manufacturers
})