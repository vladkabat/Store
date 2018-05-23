import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updateEngine, getEngine} from '../../../actions/product/engine'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

class UpdateEngine extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetEngine} = this.props;
        onGetEngine(id);
    }

    render() {

        const {isUpdated, onUpdateEngine, errorMessage, engine} = this.props;
        let name = '';
        let file = '';
        let manufacturer = '';
        let ratedPower = '';
        let ratedCurrent = '';
        let amount = '';
        let ratedVoltage = '';

        const handlerUpdateEngine = (event) => {
            event.preventDefault();
            onUpdateEngine(file.files[0], engine.id, name.value,
                manufacturer.value, ratedPower.value, ratedCurrent.value, amount.value, ratedVoltage.value);
        };

        if (isUpdated) {
            return <Redirect to={"/engines/" + engine.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update engine</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdateEngine}>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <input type="file" accept="image/*" className="form-control-file"
                                               ref={(input) => {
                                                   file = input
                                               }} name="file"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={engine.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Manufacturer</label>
                                        <input type="text" defaultValue={engine.manufacturer}
                                                  ref={(input) => {
                                                      manufacturer = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" defaultValue={engine.amount} required
                                               ref={(input) => {
                                                   amount = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Rated power</label>
                                        <input type="number" defaultValue={engine.ratedPower} required step="0.1"
                                               ref={(input) => {
                                                   ratedPower = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Rated current</label>
                                        <input type="number" defaultValue={engine.ratedCurrent} required step="0.1"
                                               ref={(input) => {
                                                   ratedCurrent = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Rated voltage</label>
                                        <input type="number" defaultValue={engine.ratedVoltage} required step="0.1"
                                               ref={(input) => {
                                                   ratedVoltage = input
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
        engine: state.engine,
        isUpdated: state.status.updated,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetEngine: (id) => {
            dispatch(getEngine(id))
        },
        onUpdateEngine: (file, id, name, manufacturer, ratedPower, ratedCurrent, amount, ratedVoltage) => {
            dispatch(updateEngine(file, id, name, manufacturer, ratedPower, ratedCurrent, amount, ratedVoltage))
        }
    })
)(UpdateEngine)