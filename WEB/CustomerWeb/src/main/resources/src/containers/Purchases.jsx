import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPurchases, deletePurchase} from '../actions/purchases'
import Order from "../components/Order";
import ErrorMessage from "../components/ErrorMessage";

class Purchases extends Component {

    componentDidMount() {
        const {onGetPurchases} = this.props;
        onGetPurchases();
    }

    renderListPurchases() {
        const {purchases, onDeletePurchase} = this.props;
        return purchases.map((order, index) => {
                return <Order key={index} order={order} deleteOrder={onDeletePurchase}/>
            }
        )
    }

    render() {
        const {errorMessage} = this.props;
        return (
            <div>
                <ErrorMessage message={errorMessage}/>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Purchases</span>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {this.renderListPurchases()}
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
        purchases: state.purchases
    }),
    dispatch => ({
        onGetPurchases: () => {
            dispatch(getPurchases())
        }, 
		onDeletePurchase: (id) => {
            dispatch(deletePurchase(id))
        }
    })
)(Purchases)