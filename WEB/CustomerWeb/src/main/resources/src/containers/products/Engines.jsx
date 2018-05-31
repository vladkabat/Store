import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEngines} from '../../actions/products/engines'
import Product from "../../components/Product";
import FilterProducts from "../../components/FilterProducts"
import {dataSetNameFilterProducts} from "../../actions/products/filter/filterProducts"
import {dataSortEnginesByPriceAsc, dataSortEnginesByPriceDesc} from "../../actions/products/sort/sortEngines"

class Engines extends Component {

    componentDidMount() {
        const {onGetEngines, size} = this.props;
        onGetEngines(0, size);
    }

    renderListProducts() {
        const {content} = this.props;
        return content.map((engine, index) => {
                return <Product key={index} product={engine}/>
            }
        )
    }

    render() {
        const {
            number, size, totalPages, onGetEngines, onSetNameFilterProducts, onSortEnginesByPriceAsc,
            onSortEnginesByPriceDesc
        } = this.props;
        return (
            <div>
                <FilterProducts setNameFilterProducts={onSetNameFilterProducts}
                                sortProductsByPriceAsc={onSortEnginesByPriceAsc}
                                sortProductsByPriceDesc={onSortEnginesByPriceDesc}/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Engines</span> &nbsp;
                        {(number - 1 >= 0) ?
                            <button onClick={() => onGetEngines(number - 1, size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(number + 1 < totalPages) ?
                            <button onClick={() => onGetEngines(number + 1, size)} className="btn btn-success">Next
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
        content: state.engines.content.filter(engine => engine.name.toLowerCase().includes(state.filterProducts.toLowerCase())),
        number: state.engines.number,
        size: state.engines.size,
        totalPages: state.engines.totalPages
    }),
    dispatch => ({
        onGetEngines: (page, size) => {
            dispatch(getEngines(page, size))
        },
        onSetNameFilterProducts: (event) => {
            dispatch(dataSetNameFilterProducts(event.target.value))
        },
        onSortEnginesByPriceAsc: () => {
            dispatch(dataSortEnginesByPriceAsc())
        },
        onSortEnginesByPriceDesc: () => {
            dispatch(dataSortEnginesByPriceDesc())
        }
    })
)(Engines)