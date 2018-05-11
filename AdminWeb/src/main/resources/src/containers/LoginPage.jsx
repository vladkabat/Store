import React from 'react'
import ErrorMessage from '../components/ErrorMessage'
import {login} from '../actions/admin'
import {connect} from 'react-redux'

const LoginPage = ({errorMessage, onLogin}) => {

    let username = '';
    let password = '';

    const handlerLogin = (event) => {
        event.preventDefault();
        let admin = {
            username: username.value,
            password: password.value
        };
        onLogin(admin);
    };

    return (
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Login</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={handlerLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input className="form-control" ref={(input) => {
                                    username = input
                                }}
                                       id="username" placeholder="Username" name="username" required
                                       autoFocus/>
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
                                        <button type="submit" className="btn btn-success">Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default connect(
    state => ({
        errorMessage: state.message
    }),
    dispatch => ({
        onLogin: (admin) => {
            dispatch(login(admin))
        }
    })
)(LoginPage)