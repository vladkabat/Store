import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {getVideoCamera, deleteVideoCamera} from '../../actions/product/videoCamera'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage";

class VideoCamera extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetVideoCamera} = this.props;
        onGetVideoCamera(id);
    }

    render() {
        const {isDeletedProduct, videoCamera, onDeleteVideoCamera, errorMessage} = this.props;

        if (isDeletedProduct) {
            return <Redirect to="/videoCameras"/>
        } else {
            return (
                <div className="col-md-12">
                    <div className="col-md-4 container-fluid bg-1">
                        <div className="alert alert-success text-center">
                            <h4><strong>{videoCamera.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={videoCamera.urlImage} width="220" height="240"/>
                        </div>
                        <br/>
                        <div className="alert alert-info"><h5>{videoCamera.description}</h5></div>
                    </div>
                    <div className="col-md-8">
                        <div className="portlet light bordered">
                            <ErrorMessage message={errorMessage}/>
                        </div>
                        <div className="portlet light bordered">
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span className="caption-subject font-blue-madison bold uppercase">
                                        <h2>
                                            Data &nbsp;
                                            <Link to={videoCamera.linkUpdate}
                                                  className="btn btn-primary">Update &raquo;</Link> &nbsp;
                                            <button onClick={() => onDeleteVideoCamera(videoCamera.id)}
                                                    className="btn btn-primary">Delete &raquo;</button>
                                        </h2>
                                    </span>
                                </div>
                            </div>
                            <div className="body">
                                <table className="table">
                                    <thead>
                                    <tr className="active">
                                        <th>#</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="warning">
                                        <th scope="row">Rating</th>
                                        <td>{videoCamera.rating}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Amount</th>
                                        <td>{videoCamera.amount}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="portlet light bordered">
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span
                                        className="caption-subject font-blue-madison bold uppercase"><h2>Description</h2></span>
                                </div>
                            </div>
                            <div className="body">
                                <table className="table">
                                    <thead>
                                    <tr className="active">
                                        <th>#</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="warning">
                                        <th scope="row">Number matrix points</th>
                                        <td>{videoCamera.numberMatrixPoints}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Optional zoom</th>
                                        <td>{videoCamera.optionalZoom}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Screen size</th>
                                        <td>{videoCamera.screenSize}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{videoCamera.price} RUB</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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
        isDeletedProduct: state.status.deletedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetVideoCamera: (id) => {
            dispatch(getVideoCamera(id))
        },
        onDeleteVideoCamera: (id) => {
            dispatch(deleteVideoCamera(id))
        }
    })
)(VideoCamera)