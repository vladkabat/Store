import React from 'react'
import {Redirect} from 'react-router-dom'
import {createTablet} from '../../../actions/product/frequencyConverter'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

const CreateTablet = ({isCreatedProduct, onCreateTablet, errorMessage}) => {

    let name = '';
    let file = '';
    let description = '';
    let ram = '';
    let numberCores = '';
    let amount = '';
    let screenSize = '';

    const handlerCreateTablet = (event) => {
        event.preventDefault();
        onCreateTablet(file.files[0], name.value,
            description.value, ram.value, numberCores.value, amount.value, screenSize.value);
    };

    if (isCreatedProduct) {
        return <Redirect to="/frequencyConverters"/>
    } else {
        return (
            <div>
                <h1 className="well">Create frequencyConverter</h1>
                <ErrorMessage message={errorMessage}/>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={handlerCreateTablet}>
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
                                    <label>Number cores</label>
                                    <input type="number" placeholder="Enter Number Cores Here.." step="0.1"
                                           ref={(input) => {
                                               numberCores = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>RAM</label>
                                    <input type="number" placeholder="Enter RAM Here.." step="0.1"
                                           ref={(input) => {
                                               ram = input
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
        onCreateTablet: (file, name, description, ram, numberCores, amount, screenSize) => {
            dispatch(createTablet(file, name, description, ram, numberCores, amount, screenSize))
        }
    })
)(CreateTablet)