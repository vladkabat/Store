import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {updateFrequencyConverter, getFrequencyConverter} from '../../../actions/product/frequencyConverter'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

class UpdateFrequencyConverter extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetFrequencyConverter} = this.props;
        onGetFrequencyConverter(id);
    }

    render() {
        let name = '';
        let file = '';
        let manufacturer = '';
        let outputPower = '';
        let outputCurrent = '';
        let amount = '';
        let outputVoltage = '';

        const {isUpdated, onUpdateFrequencyConverter, errorMessage, frequencyConverter} = this.props;

        const handlerUpdateFrequencyConverter = (event) => {
            event.preventDefault();
            onUpdateFrequencyConverter(file.files[0], frequencyConverter.id, name.value,
                manufacturer.value, outputPower.value, outputCurrent.value, amount.value, outputVoltage.value);
        };

        if (isUpdated) {
            return <Redirect to={"/frequencyConverters/" + frequencyConverter.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update frequency converter</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdateFrequencyConverter}>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <input type="file" accept="image/*" className="form-control-file"
                                               ref={(input) => {
                                                   file = input
                                               }} name="file"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={frequencyConverter.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Manufacturer</label>
                                        <input type="text" defaultValue={frequencyConverter.manufacturer}
                                                  ref={(input) => {
                                                      manufacturer = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" defaultValue={frequencyConverter.amount} required
                                               ref={(input) => {
                                                   amount = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Output power</label>
                                        <input type="number" defaultValue={frequencyConverter.outputPower} required step="0.1"
                                               ref={(input) => {
                                                   outputPower = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Output current</label>
                                        <input type="number" defaultValue={frequencyConverter.outputCurrent} required step="0.1"
                                               ref={(input) => {
                                                   outputCurrent = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Output voltage</label>
                                        <input type="number" defaultValue={frequencyConverter.outputVoltage} required step="0.1"
                                               ref={(input) => {
                                                   outputVoltage = input
                                               }} className="form-control"/>
                                    </div>
                                    <button className="btn btn-lg btn-info">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(
    state => ({
        frequencyConverter: state.frequencyConverter,
        isUpdated: state.status.updated,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetFrequencyConverter: (id) => {
            dispatch(getFrequencyConverter(id))
        },
        onUpdateFrequencyConverter: (file, id, name, manufacturer, outputPower, outputCurrent, amount, outputVoltage) => {
            dispatch(updateFrequencyConverter(file, id, name, manufacturer, outputPower, outputCurrent, amount, outputVoltage))
        }
    })
)(UpdateFrequencyConverter)