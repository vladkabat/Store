import React from 'react'
import {Link} from 'react-router-dom'

const Menu = ({orders, isAuthenticated, logoutUser}) => {

    let count = 0;
    orders.forEach((order) => {
        count += order.amount;
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'><strong>Store</strong></Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to='/engines'>Engines</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/frequencyConverters'>Frequency converters</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/manufacturers'>Manufacturers</Link>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li>
                        <Link className="nav-link" to='/cart'>
                            <div>
                                Cart: {count > 0 ? count : 0}
                            </div>
                        </Link>
                    </li>
                    <li>
                        {
                            isAuthenticated ?
                                <Link className="nav-link" to='/' onClick={logoutUser}>Logout</Link> :
                                <Link className="nav-link" to='/login'>Login</Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Menu

