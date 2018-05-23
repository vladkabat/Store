import React from 'react'
import {Redirect} from 'react-router-dom'
import {createEngine} from '../../../actions/product/engine'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

const CreateEngine = ({isCreated, onCreateEngine, errorMessage}) => {

    let name = '';
    let file = '';
    let manufacturer = '';
    let ratedPower = '';
    let ratedCurrent = '';
    let amount = '';
    let ratedVoltage = '';

    const handlerCreateEngine = (event) => {
        event.preventDefault();
        onCreateEngine(file.files[0], name.value,
            manufacturer.value, ratedPower.value, ratedCurrent.value, amount.value, ratedVoltage.value);
    };

    if (isCreated) {
        return <Redirect to="/engines"/>
    } else {
        return (
            <div>
                <h1 className="well">Create engine</h1>
                <ErrorMessage message={errorMessage}/>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={handlerCreateEngine}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <input type="file" accept="image/*" className="form-control-file"
                                           ref={(input) => {
                                               file = input
                                           }} name="file" required/>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter name here.."
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
                                    <input type="number" placeholder="Enter amount here.."
                                           ref={(input) => {
                                               amount = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Rated power</label>
                                    <input type="number" placeholder="Enter rated power here.." step="0.1"
                                           ref={(input) => {
                                               ratedPower = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Rated current</label>
                                    <input type="number" placeholder="Enter rated current here.." step="0.1"
                                           ref={(input) => {
                                               ratedCurrent = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Rated voltage</label>
                                    <input type="number" placeholder="Enter rated voltage here.." step="0.1"
                                           ref={(input) => {
                                               ratedVoltage = input
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
        onCreateEngine: (file, name, manufacturer, ratedPower, ratedCurrent, amount, ratedVoltage) => {
            dispatch(createEngine(file, name, manufacturer, ratedPower, ratedCurrent, amount, ratedVoltage))
        }
    })
)(CreateEngine)