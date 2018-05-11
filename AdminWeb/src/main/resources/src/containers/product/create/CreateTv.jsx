import React from 'react'
import {Redirect} from 'react-router-dom'
import {createTv} from '../../../actions/product/tv'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

const CreateTv = ({isCreatedProduct, onCreateTv, errorMessage}) => {

    let name = '';
    let file = '';
    let description = '';
    let resolutionScreen = '';
    let cpu = '';
    let amount = '';
    let screenSize = '';

    const handlerCreateTv = (event) => {
        event.preventDefault();
        onCreateTv(file.files[0], name.value,
            description.value, resolutionScreen.value, cpu.value, amount.value, screenSize.value);
    };

    if (isCreatedProduct) {
        return <Redirect to="/tvs"/>
    } else {
        return (
            <div>
                <h1 className="well">Create tv</h1>
                <ErrorMessage message={errorMessage}/>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={handlerCreateTv}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input type="file" accept="image/*" className="form-control-file"
                                           ref={(input) => {
                                               file = input
                                           }} name="file" required/>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter Name Here.."
                                           ref={(input) => {
                                               name = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea placeholder="Enter Description Here.." rows="3"
                                              ref={(input) => {
                                                  description = input
                                              }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input type="number" placeholder="Enter Amount Here.."
                                           ref={(input) => {
                                               amount = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Resolution screen</label>
                                    <input type="text" placeholder="Enter Resolution Screen Here.."
                                           ref={(input) => {
                                               resolutionScreen = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>CPU</label>
                                    <input type="text" placeholder="Enter Type Here.."
                                           ref={(input) => {
                                               cpu = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Screen size</label>
                                    <input type="number" placeholder="Enter Screen Size Here.." step="0.1"
                                           ref={(input) => {
                                               screenSize = input
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
        isCreatedProduct: state.status.createdProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onCreateTv: (file, name, description, resolutionScreen, cpu, amount, screenSize) => {
            dispatch(createTv(file, name, description, resolutionScreen, cpu, amount, screenSize))
        }
    })
)(CreateTv)