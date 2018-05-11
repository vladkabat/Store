import React, {Component} from 'react'
import {getTv, updateRatingTv} from '../../actions/product/tv'
import {addOrder, dataAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage"
import Rating from "../../components/Rating"

class Tv extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetTv} = this.props;
        onGetTv(id);
    }

    render() {
        const {tv, errorMessage, onAuthAddOrder, onNoAuthAddOrder, orders, customer, onUpdateRatingTv} = this.props;

        let count = 0;
        let orderWithTv = orders.filter((order) => order.product.id === tv.id);
        if (orderWithTv.length > 0) {
            count = tv.amount - orderWithTv[0].amount
        } else {
            count = tv.amount;
        }

        const handlerCreateOrder = () => {
            let order = {product: tv};
            if (customer.isAuthenticated) {
                onAuthAddOrder(order);
            } else {
                onNoAuthAddOrder(order);
            }
        };

        if(errorMessage === "") {
            return (
                <div className="col-md-12">
                    <div className="col-md-4 container-fluid bg-1">
                        <div className="alert alert-success text-center">
                            <h4><strong>{tv.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={tv.urlImage} width="220" height="240"/>
                        </div>
                        <br/>
                        <div className="alert alert-info"><h5>{tv.description}</h5></div>
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
                                                        {tv.rating}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Rating customer={customer} product={tv}
                                                            updateRating={onUpdateRatingTv}/>
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
                                        <th scope="row">Resolution screen</th>
                                        <td>{tv.resolutionScreen}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">CPU</th>
                                        <td>{tv.cpu}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Screen size</th>
                                        <td>{tv.screenSize}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{tv.price} RUB</td>
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
        tv: state.tv,
        orders: state.orders,
        errorMessage: state.message,
        customer: state.customer
    }),
    dispatch => ({
        onGetTv: (id) => {
            dispatch(getTv(id))
        },
        onAuthAddOrder: (order) => {
            dispatch(addOrder(order))
        },
        onNoAuthAddOrder: (order) => {
            dispatch(dataAddOrder(order))
        },
        onUpdateRatingTv: (id, rating) => {
            dispatch(updateRatingTv(id, rating))
        }
    })
)(Tv)