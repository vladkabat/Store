import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updateTablet, getTablet} from '../../../actions/product/frequencyConverter'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

class UpdateTablet extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetTablet} = this.props;
        onGetTablet(id);
    }

    render() {
        let name = '';
        let file = '';
        let description = '';
        let ram = '';
        let numberCores = '';
        let amount = '';
        let screenSize = '';
        const {isUpdatedProduct, onUpdateTablet, errorMessage, frequencyConverter} = this.props;

        const handlerUpdateTablet = (event) => {
            event.preventDefault();
            onUpdateTablet(file.files[0], frequencyConverter.id, name.value,
                description.value, ram.value, numberCores.value, amount.value, screenSize.value);
        };

        if (isUpdatedProduct) {
            return <Redirect to={"/frequencyConverters/" + frequencyConverter.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update frequencyConverter</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdateTablet}>
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
                                        <label>Description</label>
                                        <textarea defaultValue={frequencyConverter.description} rows="3"
                                                  ref={(input) => {
                                                      description = input
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
                                        <label>Number cores</label>
                                        <input type="number" defaultValue={frequencyConverter.numberCores} required step="0.1"
                                               ref={(input) => {
                                                   numberCores = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>RAM</label>
                                        <input type="number" defaultValue={frequencyConverter.ram} required step="0.1"
                                               ref={(input) => {
                                                   ram = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Screen size</label>
                                        <input type="number" defaultValue={frequencyConverter.screenSize} required step="0.1"
                                               ref={(input) => {
                                                   screenSize = input
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
        isUpdatedProduct: state.status.updatedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetTablet: (id) => {
            dispatch(getTablet(id))
        },
        onUpdateTablet: (file, id, name, description, ram, numberCores, amount, screenSize) => {
            dispatch(updateTablet(file, id, name, description, ram, numberCores, amount, screenSize))
        }
    })
)(UpdateTablet)