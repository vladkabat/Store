import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFrequencyConverters} from '../../actions/products/frequencyConverters'
import Product from "../../components/Product"
import FilterProducts from "../../components/FilterProducts"
import {dataSetNameFilterProducts} from "../../actions/products/filter/filterProducts"
import {dataSortFrequencyConvertersByPriceAsc, dataSortFrequencyConvertersByPriceDesc} from "../../actions/products/sort/sortFrequencyConverters"

class FrequencyConverters extends Component {

    componentDidMount() {
        const {onGetFrequencyConverters, size} = this.props;
        onGetFrequencyConverters(0, size);
    }

    renderListProducts() {
        const {content} = this.props;
        return content.map((frequencyConverter, index) => {
                return <Product key={index} product={frequencyConverter}/>
            }
        )
    }

    render() {
        const {number, size, totalPages, onGetFrequencyConverters, onSetNameFilterProducts, onSortFrequencyConvertersByPriceAsc,
                onSortFrequencyConvertersByPriceDesc} = this.props;
        return (
            <div>
                <FilterProducts setNameFilterProducts={onSetNameFilterProducts}
                                sortProductsByPriceAsc={onSortFrequencyConvertersByPriceAsc}
                                sortProductsByPriceDesc={onSortFrequencyConvertersByPriceDesc}/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Frequency converters</span> &nbsp;
                        {(number - 1 >= 0) ?
                            <button onClick={() => onGetFrequencyConverters(number - 1, size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(number + 1 < totalPages) ?
                            <button onClick={() => onGetFrequencyConverters(number + 1, size)} className="btn btn-success">Next
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
        number: state.frequencyConverters.number,
        size: state.frequencyConverters.size,
        totalPages: state.frequencyConverters.totalPages,
        content: state.frequencyConverters.content.filter(frequencyConverter => frequencyConverter.name.toLowerCase().includes(state.filterProducts.toLowerCase()))
    }),
    dispatch => ({
        onGetFrequencyConverters: (page, size) => {
            dispatch(getFrequencyConverters(page, size))
        },
        onSetNameFilterProducts: (event) => {
            dispatch(dataSetNameFilterProducts(event.target.value))
        },
        onSortFrequencyConvertersByPriceAsc: () => {
            dispatch(dataSortFrequencyConvertersByPriceAsc())
        },
        onSortFrequencyConvertersByPriceDesc: () => {
            dispatch(dataSortFrequencyConvertersByPriceDesc())
        }
    })
)(FrequencyConverters)