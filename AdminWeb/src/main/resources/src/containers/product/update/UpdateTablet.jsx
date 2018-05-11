import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updateTablet, getTablet} from '../../../actions/product/tablet'
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
        const {isUpdatedProduct, onUpdateTablet, errorMessage, tablet} = this.props;

        const handlerUpdateTablet = (event) => {
            event.preventDefault();
            onUpdateTablet(file.files[0], tablet.id, name.value,
                description.value, ram.value, numberCores.value, amount.value, screenSize.value);
        };

        if (isUpdatedProduct) {
            return <Redirect to={"/tablets/" + tablet.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update tablet</h1>
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
                                        <input type="text" defaultValue={tablet.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea defaultValue={tablet.description} rows="3"
                                                  ref={(input) => {
                                                      description = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" defaultValue={tablet.amount} required
                                               ref={(input) => {
                                                   amount = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Number cores</label>
                                        <input type="number" defaultValue={tablet.numberCores} required step="0.1"
                                               ref={(input) => {
                                                   numberCores = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>RAM</label>
                                        <input type="number" defaultValue={tablet.ram} required step="0.1"
                                               ref={(input) => {
                                                   ram = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Screen size</label>
                                        <input type="number" defaultValue={tablet.screenSize} required step="0.1"
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
        tablet: state.tablet,
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