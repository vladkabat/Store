import React from 'react'
import {Redirect} from 'react-router-dom'
import {createManufacturer} from '../actions/manufacturer'
import {connect} from 'react-redux'
import ErrorMessage from "../components/ErrorMessage";

const CreateManufacturer = ({isCreated, onCreateManufacturer, errorMessage}) => {

    let name = '';
    let phone = '';
    let email = '';
    let description = '';

    const handlerCreateManufacturer = (event) => {
        event.preventDefault();
        onCreateManufacturer(name.value, phone.value, email.value, description.value);
    };

    if (isCreated) {
        return <Redirect to="/manufacturers"/>
    } else {
        return (
            <div>
                <h1 className="well">Create manufacturer</h1>
                <ErrorMessage message={errorMessage}/>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={handlerCreateManufacturer}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter name here.."
                                           ref={(input) => {
                                               name = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" placeholder="Enter phone here.."
                                              ref={(input) => {
                                                  phone = input
                                              }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" placeholder="Enter email here.."
                                           ref={(input) => {
                                               email = input
                                           }} className="form-control" required/>
                                </div>
                                 <div className="form-group">
                                    <label>Description</label>
                                    <textarea placeholder="Enter Description Here.." rows="3"
                                            ref={(input) => {
                                                description = input
                                            }} className="form-control" required/>
                                 </div>
                                <button className="btn btn-lg btn-info">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(
    state => ({
        isCreated: state.status.created,
        errorMessage: state.message
    }),
    dispatch => ({
        onCreateManufacturer: (name, phone, email, description) => {
            dispatch(createManufacturer(name, phone, email, description))
        }
    })
)(CreateManufacturer)