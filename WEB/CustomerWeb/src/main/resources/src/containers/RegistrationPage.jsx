import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {registrationUser} from '../actions/customer'
import {clearErrorMessage} from '../actions/message'
import ErrorMessage from "../components/ErrorMessage"
import {getOrders, addOrders} from '../actions/orders'

const RegistrationPage = ({errorMessage, onAddOrders, onRegistrationUser,
                              onGetOrders, onClearErrorMessage, isAuthenticated}) => {

    let username = '';
    let password = '';

    const handlerRegistrationUser = (event) => {
        event.preventDefault();
        let user = {
            username: username.value,
            password: password.value
        };
        onRegistrationUser(user);
    };

    if (isAuthenticated) {
        let ordersLocalStorage = JSON.parse(localStorage.getItem('orders'));
        if(ordersLocalStorage === null) {
            onGetOrders();
        } else {
            onAddOrders(ordersLocalStorage);
        }
        return <Redirect to="/"/>
    } else {
        return (
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-default registrationForm">
                            <br/>
                            <div className="panel-heading">
                                <h3 className="panel-title">Registration user</h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={handlerRegistrationUser}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input className="form-control" ref={(input) => {
                                            username = input
                                        }}
                                               id="username" placeholder="Username" name="username" required autoFocus/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" ref={(input) => {
                                            password = input
                                        }}
                                               id="password" placeholder="Password" name="password" required/>
                                    </div>
                                    <div className="form-group">
                                        <ErrorMessage message={errorMessage}/>
                                    </div>
                                    <div className="form-inline">
                                        <div className="form-group">
                                            <div className="col-md-offset-2 col-md-8">
                                                <button type="submit" className="btn btn-success">Registration
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-offset-2 col-md-8">
                                                <Link to='/login' className="btn btn-primary" onClick={() => onClearErrorMessage()}>Login</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
};

export default connect(
    state => ({
        errorMessage: state.message,
        isAuthenticated: state.customer.isAuthenticated
    }),
    dispatch => ({
        onRegistrationUser: (user) => {
            dispatch(registrationUser(user))
        },
        onClearErrorMessage: () => {
            dispatch(clearErrorMessage())
        },
        onGetOrders: () => {
            dispatch(getOrders())
        },
        onAddOrders: (orders) => {
            dispatch(addOrders(orders))
        }
    })
)(RegistrationPage)