import React, {Component} from 'react'
import {getEngine, updateRatingEngine} from '../../actions/product/engine'
import {addOrder, dataAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage"
import Rating from "../../components/Rating"

class Engine extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetEngine} = this.props;
        onGetEngine(id);
    }

    render() {
        const {engine, errorMessage, onAuthAddOrder, onNoAuthAddOrder, orders, customer, onUpdateRatingEngine} = this.props;
        let count = 0;
        let orderWithEngine = orders.filter((order) => order.product.id === engine.id);
        if (orderWithEngine.length > 0) {
            count = engine.amount - orderWithEngine[0].amount
        } else {
            count = engine.amount;
        }

        const handlerCreateOrder = () => {
            let order = {product: engine};
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
                            <h4><strong>{engine.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={engine.urlImage} width="220" height="250"/>
                        </div>
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
                                                        {engine.rating}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Rating customer={customer} product={engine}
                                                            updateRating={onUpdateRatingEngine}/>
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
                                        <td>{engine.manufacturer}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Rated power</th>
                                        <td>{engine.ratedPower}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Rated current</th>
                                        <td>{engine.ratedCurrent}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Rated voltage</th>
                                        <td>{engine.ratedVoltage}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{engine.price} RUB</td>
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
        engine: state.engine,
        orders: state.orders,
        errorMessage: state.message,
        customer: state.customer
    }),
    dispatch => ({
        onGetEngine: (id) => {
            dispatch(getEngine(id))
        },
        onAuthAddOrder: (order) => {
            dispatch(addOrder(order))
        },
        onNoAuthAddOrder: (order) => {
            dispatch(dataAddOrder(order))
        },
        onUpdateRatingEngine: (id, rating) => {
            dispatch(updateRatingEngine(id, rating))
        }
    })
)(Engine)