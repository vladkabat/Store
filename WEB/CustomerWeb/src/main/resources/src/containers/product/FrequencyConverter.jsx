import React, {Component} from 'react'
import {getFrequencyConverter, updateRatingFrequencyConverter} from '../../actions/product/frequencyConverter'
import {addOrder, dataAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage"
import Rating from "../../components/Rating"

class FrequencyConverter extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetFrequencyConverter} = this.props;
        onGetFrequencyConverter(id);
    }

    render() {
        const {frequencyConverter, errorMessage, onAuthAddOrder, onNoAuthAddOrder, orders, customer, onUpdateRatingFrequencyConverter} = this.props;

        let count = 0;
        let orderWithFrequencyConverter = orders.filter((order) => order.product.id === frequencyConverter.id);
        if (orderWithFrequencyConverter.length > 0) {
            count = frequencyConverter.amount - orderWithFrequencyConverter[0].amount
        } else {
            count = frequencyConverter.amount;
        }

        const handlerCreateOrder = () => {
            let order = {product: frequencyConverter};
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
                            <h4><strong>{frequencyConverter.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={frequencyConverter.urlImage} width="220" height="250"/>
                        </div>
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
                                                        {frequencyConverter.rating}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Rating customer={customer} product={frequencyConverter}
                                                            updateRating={onUpdateRatingFrequencyConverter}/>
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
                                        <th scope="row">Manufacturer</th>
                                        <td>{frequencyConverter.manufacturer}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Output power</th>
                                        <td>{frequencyConverter.outputPower}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Output current</th>
                                        <td>{frequencyConverter.outputCurrent}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Output voltage</th>
                                        <td>{frequencyConverter.outputVoltage}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{frequencyConverter.price} RUB</td>
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
        frequencyConverter: state.frequencyConverter,
        orders: state.orders,
        errorMessage: state.message,
        customer: state.customer
    }),
    dispatch => ({
        onGetFrequencyConverter: (id) => {
            dispatch(getFrequencyConverter(id))
        },
        onAuthAddOrder: (order) => {
            dispatch(addOrder(order))
        },
        onNoAuthAddOrder: (order) => {
            dispatch(dataAddOrder(order))
        },
        onUpdateRatingFrequencyConverter: (id, rating) => {
            dispatch(updateRatingFrequencyConverter(id, rating))
        }
    })
)(FrequencyConverter)
