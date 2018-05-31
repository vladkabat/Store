import React from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import Products from './products/Products'
import RegistrationPage from './RegistrationPage'
import Engines from './products/Engines'
import FrequencyConverters from './products/FrequencyConverters'
import Engine from './product/Engine'
import FrequencyConverter from './product/FrequencyConverter'
import {connect} from 'react-redux'
import Cart from './Orders'
import 'bootstrap/dist/css/bootstrap.css'
import {getOrders, dataSetOrders} from '../actions/orders'
import {dataLoginUserData, logoutUser} from '../actions/customer'
import Purchases from "./Purchases"
import Manufacturers from "./Manufacturers"

const Page = ({orders, customer, onGetOrders, onLoginCustomer, onSetOrders, onLogoutUser}) => {

    //if refresh page set CUSTOMER
    let customerLocalStorage = JSON.parse(localStorage.getItem('customer'));
    if(customer.isAuthenticated === false && customerLocalStorage !== null){
        let token = btoa(customerLocalStorage.username + ':' + customerLocalStorage.password);
        axios.defaults.headers.common['Authorization'] = 'Basic ' + token;
        onLoginCustomer(customerLocalStorage);
        onGetOrders();
    } else if(customer.isAuthenticated === false && customerLocalStorage === null){
        let ordersLocalStorage = JSON.parse(localStorage.getItem('orders'));
        if(orders.length === 0 && ordersLocalStorage !== null){
            onSetOrders(ordersLocalStorage);
        }
    }

    return (
        <div className="container">
            <Menu orders={orders} isAuthenticated={customer.isAuthenticated} logoutUser={onLogoutUser}/>
            <Switch>
                <Route exact path='/' component={Products}/>
                <Route exact path='/engines' component={Engines}/>
                <Route exact path='/frequencyConverters' component={FrequencyConverters}/>
                <Route exact path='/manufacturers' component={Manufacturers}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/purchases' component={Purchases}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/registration' component={RegistrationPage}/>
                <Route path='/engines/:id' component={Engine}/>
                <Route path='/frequencyConverters/:id' component={FrequencyConverter}/>
            </Switch>
        </div>
    )
};

export default connect(
    state => ({
        customer: state.customer,
        orders: state.orders
    }),
    dispatch => ({
        onGetOrders: () => {
            dispatch(getOrders())
        },
        onSetOrders: (orders) => {
            dispatch(dataSetOrders(orders))
        },
        onLoginCustomer: (customer) => {
            dispatch(dataLoginUserData(customer))
        },
        onLogoutUser: () => {
            dispatch(logoutUser())
        }
    })
)(Page)