import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updateTv, getTv} from '../../../actions/product/tv'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

class UpdateTv extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetTv} = this.props;
        onGetTv(id);
    }

    render() {

        let name = '';
        let file = '';
        let description = '';
        let resolutionScreen = '';
        let cpu = '';
        let amount = '';
        let screenSize = '';
        const {isUpdatedProduct, onUpdateTv, errorMessage, tv} = this.props;

        const handlerUpdateTv = (event) => {
            event.preventDefault();
            onUpdateTv(file.files[0], tv.id, name.value,
                description.value, resolutionScreen.value, cpu.value, amount.value, screenSize.value);
        };

        if (isUpdatedProduct) {
            return <Redirect to={"/tvs/" + tv.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update tv</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdateTv}>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <input type="file" accept="image/*" className="form-control-file"
                                               ref={(input) => {
                                                   file = input
                                               }} name="file"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={tv.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea defaultValue={tv.description} rows="3"
                                                  ref={(input) => {
                                                      description = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" defaultValue={tv.amount} required
                                               ref={(input) => {
                                                   amount = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Resolution screen</label>
                                        <input type="text" defaultValue={tv.resolutionScreen} required
                                               ref={(input) => {
                                                   resolutionScreen = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>CPU</label>
                                        <input type="text" defaultValue={tv.cpu} required
                                               ref={(input) => {
                                                   cpu = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Screen size</label>
                                        <input type="number" defaultValue={tv.screenSize} required step="0.1"
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
        tv: state.tv,
        isUpdatedProduct: state.status.updatedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetTv: (id) => {
            dispatch(getTv(id))
        },
        onUpdateTv: (file, id, name, description, resolutionScreen, cpu, amount, screenSize) => {
            dispatch(updateTv(file, id, name, description, resolutionScreen, cpu, amount, screenSize))
        }
    })
)(UpdateTv)