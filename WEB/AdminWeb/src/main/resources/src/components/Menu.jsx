import React from 'react'
import {Link} from 'react-router-dom'

const Menu = ({logout}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <strong>Store</strong>
            </div>
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
                    <li className="nav-item">
                        <Link className="nav-link" to='/login' onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Menu