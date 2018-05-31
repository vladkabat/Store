import React from 'react'
import {Link} from 'react-router-dom'

const Menu = ({orders, isAuthenticated, logoutUser}) => {

    let count = 0;
    orders.forEach((order) => {
        count += order.amount;
    });

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <Link className="navbar-header navbar-brand" to='/'><strong>Store</strong></Link>
                <ul className="nav navbar-nav">
                    <li>
                        <Link to='/phones'>Phones</Link>
                    </li>
                    <li>
                        <Link to='/tablets'>Tablets</Link>
                    </li>
                    <li>
                        <Link to='/tvs'>TVs</Link>
                    </li>
                    <li>
                        <Link to='/videoCameras'>Video cameras</Link>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to='/cart'>
                            <div>
                                <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"/> &nbsp;
                                {count > 0 ? <span className="badge"> {count} </span> : null}
                            </div>
                        </Link>
                    </li>
                    <li>
                        {
                            isAuthenticated ?
                                <Link to='/' onClick={logoutUser}>Logout</Link> :
                                <Link to='/login'>Login</Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Menu

