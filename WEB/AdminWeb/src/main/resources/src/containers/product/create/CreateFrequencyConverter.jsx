import React from 'react'
import {Redirect} from 'react-router-dom'
import {createFrequencyConverter} from '../../../actions/products/frequencyConverters'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

const CreateFrequencyConverter = ({isCreated, onCreateFrequencyConverter, errorMessage}) => {

    let name = '';
    let file = '';
    let manufacturer = '';
    let outputPower = '';
    let outputCurrent = '';
    let amount = '';
    let outputVoltage = '';

    const handlerCreateFrequencyConverter = (event) => {
        event.preventDefault();
        onCreateFrequencyConverter(file.files[0], name.value,
            manufacturer.value, outputPower.value, outputCurrent.value, amount.value, outputVoltage.value);
    };

    if (isCreated) {
        return <Redirect to="/frequencyConverters"/>
    } else {
        return (
            <div>
                <h1 className="well">Create frequency converter</h1>
                <ErrorMessage message={errorMessage}/>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={handlerCreateFrequencyConverter}>
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
                                    <label>Manufacturer</label>
                                    <input type="text" placeholder="Enter manufacturer here.."
                                              ref={(input) => {
                                                  manufacturer = input
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
                                    <label>Output power</label>
                                    <input type="number" placeholder="Enter output power here.." step="0.1"
                                           ref={(input) => {
                                               outputPower = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Output current</label>
                                    <input type="number" placeholder="Enter output current here.." step="0.1"
                                           ref={(input) => {
                                               outputCurrent = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Output voltage</label>
                                    <input type="number" placeholder="Enter output voltage here.." step="0.1"
                                           ref={(input) => {
                                               outputVoltage = input
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
        onCreateFrequencyConverter: (file, name, manufacturer, outputPower, outputCurrent, amount, outputVoltage) => {
            dispatch(createFrequencyConverter(file, name, manufacturer, outputPower, outputCurrent, amount, outputVoltage))
        }
    })
)(CreateFrequencyConverter)