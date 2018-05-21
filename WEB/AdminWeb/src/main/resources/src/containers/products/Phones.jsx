import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPhones} from '../../actions/products/engines'
import Product from "../../components/Product";

class Phones extends Component {

    componentDidMount() {
        const {onGetPhones, engines} = this.props;
        onGetPhones(0, engines.size);
    }

    renderListProducts() {
        const {engines} = this.props;
        return engines.content.map((engine, index) => {
                return <Product key={index} product={engine}/>
            }
        )
    }

    render() {
        const {engines, onGetPhones} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Phones</span>
                    &nbsp; <Link to="/create/engines" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                    {(engines.number - 1 >= 0) ?
                        <button onClick={() => onGetPhones(engines.number - 1, engines.size)} className="btn btn-success">Prev
                        </button>
                        : null} &nbsp;
                    {(engines.number + 1 < engines.totalPages) ?
                        <button onClick={() => onGetPhones(engines.number + 1, engines.size)} className="btn btn-success">Next
                        </button>
                        : null}
                </div>
                <div className="panel-body">
                    <div className="row">
                        {this.renderListProducts()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        engines: state.engines
    }),
    dispatch => ({
        onGetPhones: (page, size) => {
            dispatch(getPhones(page, size))
        }
    })
)(Phones)