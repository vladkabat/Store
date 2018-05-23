import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEngines} from '../../actions/products/engines'
import Product from "../../components/Product"
import FilterProducts from "../../components/FilterProducts"

class Engines extends Component {

    componentDidMount() {
        const {onGetEngines, engines} = this.props;
        onGetEngines(0, engines.size);
    }

    renderListProducts() {
        const {engines} = this.props;
        return engines.content.map((engine, index) => {
                return <Product key={index} product={engine}/>
            }
        )
    }

    render() {
        const {engines, onGetEngines} = this.props;
        return (
            <div>
                <FilterProducts/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Engines</span>
                        &nbsp; <Link to="/create/engines" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                        {(engines.number - 1 >= 0) ?
                            <button onClick={() => onGetEngines(engines.number - 1, engines.size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(engines.number + 1 < engines.totalPages) ?
                            <button onClick={() => onGetEngines(engines.number + 1, engines.size)} className="btn btn-success">Next
                            </button>
                            : null}
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {this.renderListProducts()}
                        </div>
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
        onGetEngines: (page, size) => {
            dispatch(getEngines(page, size))
        }
    })
)(Engines)