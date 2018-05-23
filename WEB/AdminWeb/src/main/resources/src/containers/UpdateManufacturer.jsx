import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updateManufacturer} from '../actions/manufacturer'
import {connect} from 'react-redux'
import ErrorMessage from "../components/ErrorMessage";

class UpdateManufacturer extends Component {

    render() {

        const {isUpdated, onUpdateManufacturer, errorMessage, manufacturers} = this.props;
        let id = this.props.match.params.id;
        let manufacturer = manufacturers.content.filter(manufacturer => manufacturer.id == id)[0];
        let name = '';
        let phone = '';
        let email = '';
        let description = '';

        const handlerUpdateManufacturer = (event) => {
            event.preventDefault();
            onUpdateManufacturer({
                id: manufacturer.id,
                name: name.value,
                phone: phone.value,
                email: email.value,
                description: description.value
            });
        };

        if (isUpdated) {
            return <Redirect to={"/manufacturers"}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update manufacturer</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdateManufacturer}>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={manufacturer.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" defaultValue={manufacturer.phone}
                                                  ref={(input) => {
                                                      phone = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" defaultValue={manufacturer.email} required
                                               ref={(input) => {
                                                   email = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea defaultValue={manufacturer.description} required rows="3"
                                               ref={(input) => {
                                                   description = input
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
        manufacturers: state.manufacturers,
        isUpdated: state.status.updated,
        errorMessage: state.message
    }),
    dispatch => ({
        onUpdateManufacturer: (manufacturer) => {
            dispatch(updateManufacturer(manufacturer))
        }
    })
)(UpdateManufacturer)