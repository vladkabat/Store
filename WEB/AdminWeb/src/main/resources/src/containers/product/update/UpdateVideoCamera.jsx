import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {updateVideoCamera, getVideoCamera} from '../../../actions/product/videoCamera'
import {connect} from 'react-redux'
import ErrorMessage from "../../../components/ErrorMessage";

class UpdateVideoCamera extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetVideoCamera} = this.props;
        onGetVideoCamera(id);
    }

    render() {

        let name = '';
        let file = '';
        let description = '';
        let numberMatrixPoints = '';
        let optionalZoom = '';
        let amount = '';
        let screenSize = '';
        const {isUpdatedProduct, onUpdateVideoCamera, errorMessage, videoCamera} = this.props;

        const handlerUpdateVideoCamera = (event) => {
            event.preventDefault();
            onUpdateVideoCamera(file.files[0], videoCamera.id, name.value,
                description.value, numberMatrixPoints.value, optionalZoom.value, amount.value, screenSize.value);
        };

        if (isUpdatedProduct) {
            return <Redirect to={"/videoCameras" + videoCamera.id}/>
        } else {
            return (
                <div>
                    <h1 className="well">Update video camera</h1>
                    <ErrorMessage message={errorMessage}/>
                    <div className="col-lg-12 well">
                        <div className="row">
                            <form onSubmit={handlerUpdateVideoCamera}>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Example file input</label>
                                        <input type="file" accept="image/*" className="form-control-file"
                                               ref={(input) => {
                                                   file = input
                                               }} name="file"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={videoCamera.name}
                                               ref={(input) => {
                                                   name = input
                                               }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea defaultValue={videoCamera.description} rows="3"
                                                  ref={(input) => {
                                                      description = input
                                                  }} className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" defaultValue={videoCamera.amount} required
                                               ref={(input) => {
                                                   amount = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Number matrix points</label>
                                        <input type="text" defaultValue={videoCamera.numberMatrixPoints} required
                                               ref={(input) => {
                                                   numberMatrixPoints = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Optional zoom</label>
                                        <input type="text" defaultValue={videoCamera.optionalZoom} required
                                               ref={(input) => {
                                                   optionalZoom = input
                                               }} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Screen size</label>
                                        <input type="number" defaultValue={videoCamera.screenSize} required step="0.1"
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
        videoCamera: state.videoCamera,
        isUpdatedProduct: state.status.updatedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetVideoCamera: (id) => {
            dispatch(getVideoCamera(id))
        },
        onUpdateVideoCamera: (file, id, name, description, numberMatrixPoints, optionalZoom, amount, screenSize) => {
            dispatch(updateVideoCamera(file, id, name, description, numberMatrixPoints, optionalZoom, amount, screenSize))
        }
    })
)(UpdateVideoCamera)