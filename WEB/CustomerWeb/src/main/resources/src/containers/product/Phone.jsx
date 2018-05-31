import React, {Component} from 'react'
import {getPhone, updateRatingPhone} from '../../actions/product/phone'
import {addOrder, dataAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage"
import Rating from "../../components/Rating"

class Phone extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetPhone} = this.props;
        onGetPhone(id);
    }

    render() {
        const {phone, errorMessage, onAuthAddOrder, onNoAuthAddOrder, orders, customer, onUpdateRatingPhone} = this.props;

        let count = 0;
        let orderWithPhone = orders.filter((order) => order.product.id === phone.id);
        if (orderWithPhone.length > 0) {
            count = phone.amount - orderWithPhone[0].amount
        } else {
            count = phone.amount;
        }

        const handlerCreateOrder = () => {
            let order = {product: phone};
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
                            <h4><strong>{phone.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={phone.urlImage} width="220" height="340"/>
                        </div>
                        <br/>
                        <div className="alert alert-info"><h5>{phone.description}</h5></div>
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
                                                        {phone.rating}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Rating customer={customer} product={phone}
                                                            updateRating={onUpdateRatingPhone}/>
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
                                        <td>{phone.numberCores}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">RAM</th>
                                        <td>{phone.ram}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Screen size</th>
                                        <td>{phone.screenSize}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{phone.price} RUB</td>
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
        phone: state.phone,
        orders: state.orders,
        errorMessage: state.message,
        customer: state.customer
    }),
    dispatch => ({
        onGetPhone: (id) => {
            dispatch(getPhone(id))
        },
        onAuthAddOrder: (order) => {
            dispatch(addOrder(order))
        },
        onNoAuthAddOrder: (order) => {
            dispatch(dataAddOrder(order))
        },
        onUpdateRatingPhone: (id, rating) => {
            dispatch(updateRatingPhone(id, rating))
        }
    })
)(Phone)