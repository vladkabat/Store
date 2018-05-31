import React from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import {Switch, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import Products from './products/Products'
import RegistrationPage from './RegistrationPage'
import Phones from './products/Phones'
import Phone from './product/Phone'
import Tvs from './products/Tvs'
import Tv from './product/Tv'
import Tablet from './product/Tablet'
import VideoCamera from './product/VideoCamera'
import VideoCameras from './products/VideoCameras'
import Tablets from './products/Tablets'
import {connect} from 'react-redux'
import Cart from './Orders'
import 'bootstrap/dist/css/bootstrap.css'
import {getOrders, dataSetOrders} from '../actions/orders'
import {dataLoginUserData, logoutUser} from '../actions/customer'
import Purchases from "./Purchases"

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
                <Route exact path='/phones' component={Phones}/>
                <Route exact path='/tvs' component={Tvs}/>
                <Route exact path='/videoCameras' component={VideoCameras}/>
                <Route exact path='/tablets' component={Tablets}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/purchases' component={Purchases}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/registration' component={RegistrationPage}/>
                <Route path='/phones/:id' component={Phone}/>
                <Route path='/tvs/:id' component={Tv}/>
                <Route path='/tablets/:id' component={Tablet}/>
                <Route path='/videoCameras/:id' component={VideoCamera}/>
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