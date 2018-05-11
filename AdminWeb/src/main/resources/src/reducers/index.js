import {combineReducers} from 'redux'
import status from './status'
import message from './message'
import phone from './product/phone'
import tv from './product/tv'
import videoCamera from './product/videoCamera'
import tablet from './product/tablet'
import phones from './products/phones'
import tvs from './products/tvs'
import videoCameras from './products/videoCameras'
import tablets from './products/tablets'

export default combineReducers({
    status,
    message,
    tablet,
    tv,
    phone,
    videoCamera,
    tablets,
    tvs,
    phones,
    videoCameras
})