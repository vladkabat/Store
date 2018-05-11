import React from 'react'
import Menu from '../components/Menu'
import {Switch, Route} from 'react-router-dom'
import {logout} from '../actions/admin'
import LoginPage from './LoginPage'
import Phones from './products/Phones'
import Phone from './product/Phone'
import Tvs from './products/Tvs'
import Tv from './product/Tv'
import Tablet from './product/Tablet'
import VideoCamera from './product/VideoCamera'
import VideoCameras from './products/VideoCameras'
import Tablets from './products/Tablets'
import {connect} from 'react-redux'
import UpdatePhone from "./product/update/UpdatePhone"
import UpdateTv from "./product/update/UpdateTv"
import UpdateTablet from "./product/update/UpdateTablet"
import UpdateVideoCamera from "./product/update/UpdateVideoCamera"
import CreatePhone from "./product/create/CreatePhone"
import CreateTv from "./product/create/CreateTv"
import CreateTablet from "./product/create/CreateTablet"
import CreateVideoCamera from "./product/create/CreateVideoCamera"
import FilterProducts from "../components/FilterProducts"
import 'bootstrap/dist/css/bootstrap.css'

const Page = ({isAuthenticated, onLogout}) => {

    if (isAuthenticated) {
        return (
            <div className="container">
                <Menu logout={onLogout}/>
                <FilterProducts/>
                <Switch>
                    <Route exact path='/' component={Phones}/>
                    <Route exact path='/phones' component={Phones}/>
                    <Route exact path='/tvs' component={Tvs}/>
                    <Route exact path='/videoCameras' component={VideoCameras}/>
                    <Route exact path='/tablets' component={Tablets}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/phones/:id' component={Phone}/>
                    <Route path='/tvs/:id' component={Tv}/>
                    <Route path='/tablets/:id' component={Tablet}/>
                    <Route path='/videoCameras/:id' component={VideoCamera}/>
                    <Route path='/update/phones/:id' component={UpdatePhone}/>
                    <Route path='/update/tvs/:id' component={UpdateTv}/>
                    <Route path='/update/tablets/:id' component={UpdateTablet}/>
                    <Route path='/update/videoCameras/:id' component={UpdateVideoCamera}/>
                    <Route path='/create/phones' component={CreatePhone}/>
                    <Route path='/create/tvs' component={CreateTv}/>
                    <Route path='/create/tablets' component={CreateTablet}/>
                    <Route path='/create/videoCameras' component={CreateVideoCamera}/>
                </Switch>
            </div>
        )
    } else {
        return (
            <div className="container">
                <LoginPage/>
            </div>
        )
    }
};

export default connect(
    state => ({
        isAuthenticated: state.status.authenticatedAdmin
    }),
    dispatch => ({
        onLogout: () => {
            dispatch(logout())
        }
    })
)(Page)