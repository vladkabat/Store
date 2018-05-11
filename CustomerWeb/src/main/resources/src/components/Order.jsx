import React from 'react'
import {Link} from 'react-router-dom'

const Order = ({order, deleteOrder}) => {
    return (
        <div className="col-lg-4 container-fluid bg-1">
            <div className="text-center">
                <img src={order.urlImageProduct} width="220" height="340"/>
            </div>
            <h2>{order.product.name.substr(0,10)}...</h2>
            <p>{order.product.description.substr(0,30)}...</p>
            <p>Amount - {order.amount}</p>
            <p>Price - {order.price} RUB</p>
            <p>
                <button onClick={() => deleteOrder(order.id)} className="btn btn-primary">
                    Delete &raquo;</button>
                &nbsp;
                <Link to={order.linkProduct} className="btn btn-primary">View product &raquo;</Link>

            </p>
        </div>
    )
};

export default Order