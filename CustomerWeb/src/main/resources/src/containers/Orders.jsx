import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteOrder, dataDeleteOrder, dataDeleteOrders, getOrders} from '../actions/orders'
import {createPurchase} from '../actions/purchases'
import Order from "../components/Order";
import {Link} from 'react-router-dom'
import ErrorMessage from "../components/ErrorMessage";

class Orders extends Component{
	
	componentDidMount() {
        const {onGetOrders, isAuthenticated} = this.props;
		if(isAuthenticated){
			onGetOrders();
		}
    }

    renderListOrders(){
		const {orders, onAuthDeleteOrder, onNoAuthDeleteOrder, isAuthenticated} = this.props;
        return orders.map((order, index) => {
                if (isAuthenticated) {
                    return <Order key={index} order={order} deleteOrder={onAuthDeleteOrder}/>
                } else {
                    return <Order key={index} order={order} deleteOrder={onNoAuthDeleteOrder}/>
                }
            }
        )
    }

render() {
	const {orders, errorMessage, onCreatePurchase, isAuthenticated, onDeleteOrders} = this.props;
	
	const handlerCreatePurchase = () => {
        if (isAuthenticated) {
            onCreatePurchase(orders);
        } else {
            onDeleteOrders();
        }
    };
	
    return (
        <div>
            <ErrorMessage message={errorMessage}/>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">
                        Orders &nbsp;
                        <button onClick={handlerCreatePurchase} className="btn btn-success">
                                                    Buy &raquo;</button>
                        &nbsp;
                        {isAuthenticated ? <Link to="/purchases"
                                                 className="btn btn-primary">Purchases &raquo;</Link> : null}
                    </span>
                </div>
                <div className="panel-body">
                    <div className="row">
                        {this.renderListOrders()}
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default connect(
    state => ({
        errorMessage: state.message,
        orders: state.orders,
        isAuthenticated: state.customer.isAuthenticated
    }),
    dispatch => ({
		onGetOrders: () => {
            dispatch(getOrders())
        },
        onAuthDeleteOrder: (id) => {
            dispatch(deleteOrder(id))
        },
        onNoAuthDeleteOrder: (id) => {
            dispatch(dataDeleteOrder(id))
        },
        onDeleteOrders: () => {
            dispatch(dataDeleteOrders())
        },
        onCreatePurchase: (orders) => {
            dispatch(createPurchase(orders));
        }
    })
)(Orders)