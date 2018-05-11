import React, {Component} from 'react'
import {getTablet, updateRatingTablet} from '../../actions/product/tablet'
import {addOrder, dataAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage"
import Rating from "../../components/Rating"

class Tablet extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetTablet} = this.props;
        onGetTablet(id);
    }

    render() {
        const {tablet, errorMessage, onAuthAddOrder, onNoAuthAddOrder, orders, customer, onUpdateRatingTablet} = this.props;

        let count = 0;
        let orderWithTablet = orders.filter((order) => order.product.id === tablet.id);
        if (orderWithTablet.length > 0) {
            count = tablet.amount - orderWithTablet[0].amount
        } else {
            count = tablet.amount;
        }

        const handlerCreateOrder = () => {
            let order = {product: tablet};
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
                            <h4><strong>{tablet.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={tablet.urlImage} width="220" height="340"/>
                        </div>
                        <br/>
                        <div className="alert alert-info"><h5>{tablet.description}</h5></div>
                    </div>
                    <div className="col-md-8">
                        <div className="portlet light bordered">
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span
                                        className="caption-subject font-blue-madison bold uppercase">
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
                                                        {tablet.rating}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Rating customer={customer} product={tablet}
                                                            updateRating={onUpdateRatingTablet}/>
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
                                        <th scope="row">Number cores</th>
                                        <td>{tablet.numberCores}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">RAM</th>
                                        <td>{tablet.ram}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Screen size</th>
                                        <td>{tablet.screenSize}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{tablet.price} RUB</td>
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
        tablet: state.tablet,
        orders: state.orders,
        errorMessage: state.message,
        customer: state.customer
    }),
    dispatch => ({
        onGetTablet: (id) => {
            dispatch(getTablet(id))
        },
        onAuthAddOrder: (order) => {
            dispatch(addOrder(order))
        },
        onNoAuthAddOrder: (order) => {
            dispatch(dataAddOrder(order))
        },
        onUpdateRatingTablet: (id, rating) => {
            dispatch(updateRatingTablet(id, rating))
        }
    })
)(Tablet)
