import React from 'react'
import ErrorMessage from '../components/ErrorMessage'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const LoginPage = ({errorMessage, login}) => {

    let username = '';
    let password = '';

    const handlerLogin = (event) => {
        event.preventDefault();
        let admin = {
            username: username.value,
            password: password.value
        };
        login(admin);
    };

    return (
        <form className="form-horizontal" role="form">
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <h2>Please Login</h2>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <div className="form-group has-danger">
                        <label className="sr-only" htmlFor="username">Username</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon"><i className="fa fa-at"/></div>
                            <input type="text" name="username" className="form-control" id="username"
                                   ref={(input) => {
                                       username = input
                                   }}
                                   placeholder="Username" required autoFocus/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon"><i className="fa fa-key"></i></div>
                            <input type="password" name="password" className="form-control" id="password"
                                   ref={(input) => {
                                       password = input
                                   }}
                                   placeholder="Password" required/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <ErrorMessage message={errorMessage}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <Link className='btn btn-success' to='/' onClick={handlerLogin}>Login</Link>
                </div>
            </div>
        </form>
    )
};

export default LoginPage