import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updatePhone, getPhone} from '../../../actions/product/phone'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

class UpdatePhone extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetPhone} = this.props;
        onGetPhone(id);
    }

    render() {

        const {isUpdatedProduct, onUpdatePhone, errorMessage, phone} = this.props;
        let name = '';
        let file = '';
        let description = '';
        let ram = '';
        let numberCores = '';
        let amount = '';
        let screenSize = '';

        const handlerUpdatePhone = (event) => {
            event.preventDefault();
            onUpdatePhone(file.files[0], phone.id, name.value,
                description.value, ram.value, numberCores.value, amount.value, screenSize.value);
        };

        if (isUpdatedProduct) {
            return <Redirect to={"/phones/" + phone.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update phone</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdatePhone}>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <input type="file" accept="image/*" className="form-control-file"
                                               ref={(input) => {
                                                   file = input
                                               }} name="file"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={phone.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea defaultValue={phone.description} rows="3"
                                                  ref={(input) => {
                                                      description = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" defaultValue={phone.amount} required
                                               ref={(input) => {
                                                   amount = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Number cores</label>
                                        <input type="number" defaultValue={phone.numberCores} required step="0.1"
                                               ref={(input) => {
                                                   numberCores = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>RAM</label>
                                        <input type="number" defaultValue={phone.ram} required step="0.1"
                                               ref={(input) => {
                                                   ram = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Screen size</label>
                                        <input type="number" defaultValue={phone.screenSize} required step="0.1"
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
        phone: state.phone,
        isUpdatedProduct: state.status.updatedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetPhone: (id) => {
            dispatch(getPhone(id))
        },
        onUpdatePhone: (file, id, name, description, ram, numberCores, amount, screenSize) => {
            dispatch(updatePhone(file, id, name, description, ram, numberCores, amount, screenSize))
        }
    })
)(UpdatePhone)