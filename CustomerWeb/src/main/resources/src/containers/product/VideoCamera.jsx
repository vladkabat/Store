import React, {Component} from 'react'
import {getVideoCamera, updateRatingVideoCamera} from '../../actions/product/videoCamera'
import {connect} from 'react-redux'
import {addOrder, dataAddOrder} from '../../actions/orders'
import ErrorMessage from "../../components/ErrorMessage"
import Rating from "../../components/Rating"

class VideoCamera extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetVideoCamera} = this.props;
        onGetVideoCamera(id);
    }

    render() {
        const {videoCamera, errorMessage, onAuthAddOrder, onNoAuthAddOrder, orders, customer, onUpdateRatingVideoCamera} = this.props;

        let count = 0;
        let orderWithVideoCamera = orders.filter((order) => order.product.id === videoCamera.id);
        if (orderWithVideoCamera.length > 0) {
            count = videoCamera.amount - orderWithVideoCamera[0].amount
        } else {
            count = videoCamera.amount;
        }

        const handlerCreateOrder = () => {
            let order = {product: videoCamera};
            if (customer.isAuthenticated) {
                onAuthAddOrder(order);
            } else {
                onNoAuthAddOrder(order);
            }
        };

        if (errorMessage === "") {
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
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span className="caption-subject font-blue-madison bold uppercase">
                                        <h2>
                                            Data &nbsp;
                                            {count > 0 ? <button onClick={handlerCreateOrder}
                                                                 className="btn btn-primary">
                                                Add &raquo;</button> : null}
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
                                        <td>
                                            <div className="form-inline">
                                                <div className="form-group">
                                                    <div className="col-md-8">
                                                        {videoCamera.rating}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Rating customer={customer} product={videoCamera}
                                                            updateRating={onUpdateRatingVideoCamera}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Amount</th>
                                        <td>
                                            <div className="form-inline">
                                                <div className="form-group">
                                                    <div className="col-md-8">
                                                        {count}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
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
        } else {
            return <ErrorMessage message={errorMessage}/>
        }
    }
}

export default connect(
    state => ({
        videoCamera: state.videoCamera,
        orders: state.orders,
        errorMessage: state.message,
        customer: state.customer
    }),
    dispatch => ({
        onGetVideoCamera: (id) => {
            dispatch(getVideoCamera(id))
        },
        onAuthAddOrder: (order) => {
            dispatch(addOrder(order))
        },
        onNoAuthAddOrder: (order) => {
            dispatch(dataAddOrder(order))
        },
        onUpdateRatingVideoCamera: (id, rating) => {
            dispatch(updateRatingVideoCamera(id, rating))
        }
    })
)(VideoCamera)