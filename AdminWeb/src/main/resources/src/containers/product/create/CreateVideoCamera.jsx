import React from 'react'
import {Redirect} from 'react-router-dom'
import {createVideoCamera} from '../../../actions/product/videoCamera'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

const CreateVideoCamera = ({isCreatedProduct, onCreateVideoCamera, errorMessage}) => {

    let name = '';
    let file = '';
    let description = '';
    let numberMatrixPoints = '';
    let optionalZoom = '';
    let amount = '';
    let screenSize = '';

    const handlerCreateVideoCamera = (event) => {
        event.preventDefault();
        onCreateVideoCamera(file.files[0], name.value,
            description.value, numberMatrixPoints.value, optionalZoom.value, amount.value, screenSize.value);
    };

    if (isCreatedProduct) {
        return <Redirect to="/videoCameras"/>
    } else {
        return (
            <div>
                <h1 className="well">Create video camera</h1>
                <ErrorMessage message={errorMessage}/>
                <div className="col-lg-12 well">
                    <div className="row">
                        <form onSubmit={handlerCreateVideoCamera}>
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
                                    <label>Number matrix points</label>
                                    <input type="text" placeholder="Enter Number Matrix Points Here.."
                                           ref={(input) => {
                                               numberMatrixPoints = input
                                           }} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Optional zoom</label>
                                    <input type="text" placeholder="Enter Optional Zoom Here.."
                                           ref={(input) => {
                                               optionalZoom = input
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
        onCreateVideoCamera: (file, name, description, numberMatrixPoints, optionalZoom, amount, screenSize) => {
            dispatch(createVideoCamera(file, name, description, numberMatrixPoints, optionalZoom, amount, screenSize))
        }
    })
)(CreateVideoCamera)