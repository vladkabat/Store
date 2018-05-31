import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product}) => {

    return (
        <div className="col-lg-4 container-fluid bg-1">
            <br/>
            <div className="text-center">
                <img src={product.urlImage} width="220" height="250"/>
            </div>
            <h2>{(product.name.length >= 15) ? (product.name.substr(0, 15) + '...') : product.name}</h2>
            <h4>{product.price} RUB</h4>
            <p>
                <Link to={product.link} className="btn btn-primary">View details &raquo;</Link>
            </p>
        </div>
    )
};

export default Product