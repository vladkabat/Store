import React from 'react'
import {Link} from 'react-router-dom'

const Menu = ({logout}) => {

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header navbar-brand">
                    <strong>Store</strong>
                </div>
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
                        <Link to='/login' onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Menu

