import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getFrequencyConverters} from '../../actions/products/frequencyConverters'
import Product from "../../components/Product"
import FilterProducts from "../../components/FilterProducts"

class FrequencyConverters extends Component {

    componentDidMount() {
        const {onGetFrequencyConverters, frequencyConverters} = this.props;
        onGetFrequencyConverters(0, frequencyConverters.size);
    }

    renderListProducts() {
        const {frequencyConverters} = this.props;
        return frequencyConverters.content.map((frequencyConverter, index) => {
                return <Product key={index} product={frequencyConverter}/>
            }
        )
    }

    render() {
        const {frequencyConverters, onGetFrequencyConverters} = this.props;
        return (
            <div>
                <FilterProducts/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Frequency converters</span>
                        &nbsp; <Link to="/create/frequencyConverters" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                        {(frequencyConverters.number - 1 >= 0) ?
                            <button onClick={() => onGetFrequencyConverters(frequencyConverters.number - 1, frequencyConverters.size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(frequencyConverters.number + 1 < frequencyConverters.totalPages) ?
                            <button onClick={() => onGetFrequencyConverters(frequencyConverters.number + 1, frequencyConverters.size)} className="btn btn-success">Next
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
        frequencyConverters: state.frequencyConverters
    }),
    dispatch => ({
        onGetFrequencyConverters: (page, size) => {
            dispatch(getFrequencyConverters(page, size))
        }
    })
)(FrequencyConverters)