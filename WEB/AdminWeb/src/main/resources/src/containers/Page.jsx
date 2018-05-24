import React from 'react'
import Menu from '../components/Menu'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout, login} from '../actions/admin'
import LoginPage from '../components/LoginPage'
import Engines from './products/Engines'
import Engine from './product/Engine'
import FrequencyConverter from './product/FrequencyConverter'
import FrequencyConverters from './products/FrequencyConverters'
import UpdateEngine from "./product/update/UpdateEngine"
import UpdateFrequencyConverter from "./product/update/UpdateFrequencyConverter"
import CreateEngine from "./product/create/CreateEngine"
import CreateFrequencyConverter from "./product/create/CreateFrequencyConverter"
import Manufacturers from "./Manufacturers"
import CreateManufacturer from "./CreateManufacturer"
import UpdateManufacturer from "./UpdateManufacturer"
import 'bootstrap/dist/css/bootstrap.css'

const Page = ({isAuthenticated, onLogout, errorMessage, onLogin}) => {

    if (isAuthenticated) {
        return (
            <div className="container">
                <Menu logout={onLogout}/>
                <Switch>
                    <Route exact path='/' component={Engines}/>
                    <Route exact path='/login' component={Engines}/>
                    <Route exact path='/engines' component={Engines}/>
                    <Route exact path='/frequencyConverters' component={FrequencyConverters}/>
                    <Route exact path='/manufacturers' component={Manufacturers}/>
                    <Route path='/engines/:id' component={Engine}/>
                    <Route path='/frequencyConverters/:id' component={FrequencyConverter}/>
                    <Route path='/update/engines/:id' component={UpdateEngine}/>
                    <Route path='/update/frequencyConverters/:id' component={UpdateFrequencyConverter}/>
                    <Route path='/create/engines' component={CreateEngine}/>
                    <Route path='/create/frequencyConverters' component={CreateFrequencyConverter}/>
                    <Route path='/create/manufacturers' component={CreateManufacturer}/>
                    <Route path='/update/manufacturers/:id' component={UpdateManufacturer}/>
                </Switch>
            </div>
        )
    } else {
        return (
            <div className="container">
                <LoginPage errorMessage={errorMessage} login={onLogin}/>
            </div>
        )
    }
};

export default connect(
    state => ({
        isAuthenticated: state.status.authenticated,
        errorMessage: state.message
    }),
    dispatch => ({
        onLogout: () => {
            dispatch(logout())
        },
        onLogin: (admin) => {
            dispatch(login(admin))
        }
    })
)(Page)