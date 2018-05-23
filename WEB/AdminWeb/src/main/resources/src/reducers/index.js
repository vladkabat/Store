import {combineReducers} from 'redux'
import status from './status'
import message from './message'
import engine from './product/engine'
import frequencyConverter from './product/frequencyConverter'
import engines from './products/engines'
import frequencyConverters from './products/frequencyConverters'
import manufacturers from './manufacturers'

export default combineReducers({
    status,
    message,
    engine,
    frequencyConverter,
    engines,
    frequencyConverters,
    manufacturers
})