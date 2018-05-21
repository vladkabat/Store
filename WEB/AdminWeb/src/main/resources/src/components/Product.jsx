import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product}) => {

    return (
        <div className="col-lg-4 container-fluid bg-1">
            <div className="text-center">
                <img src={product.urlImage} width="220" height="340"/>
            </div>
            <h2>{product.name.substr(0,15)}...</h2>
            <h4>{product.price} RUB</h4>
            <p>{product.description.substr(0,40)}...</p>
            <p>
                <Link to={product.link} className="btn btn-primary">View details &raquo;</Link>
            </p>
        </div>
    )
};

export default Product