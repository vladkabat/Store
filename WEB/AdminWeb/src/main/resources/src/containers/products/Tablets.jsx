import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getTablets} from '../../actions/products/frequencyConverters'
import Product from "../../components/Product";

class Tablets extends Component {

    componentDidMount() {
        const {onGetTablets, frequencyConverters} = this.props;
        onGetTablets(0, frequencyConverters.size);
    }

    renderListProducts() {
        const {frequencyConverters} = this.props;
        return frequencyConverters.content.map((frequencyConverter, index) => {
                return <Product key={index} product={frequencyConverter}/>
            }
        )
    }

    render() {
        const {frequencyConverters, onGetTablets} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Tablets</span>
                    &nbsp; <Link to="/create/frequencyConverters" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                    {(frequencyConverters.number - 1 >= 0) ?
                        <button onClick={() => onGetTablets(frequencyConverters.number - 1, frequencyConverters.size)} className="btn btn-success">Prev
                        </button>
                        : null} &nbsp;
                    {(frequencyConverters.number + 1 < frequencyConverters.totalPages) ?
                        <button onClick={() => onGetTablets(frequencyConverters.number + 1, frequencyConverters.size)} className="btn btn-success">Next
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
        frequencyConverters: state.frequencyConverters
    }),
    dispatch => ({
        onGetTablets: (page, size) => {
            dispatch(getTablets(page, size))
        }
    })
)(Tablets)