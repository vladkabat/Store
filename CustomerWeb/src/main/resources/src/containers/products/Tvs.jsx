import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTvs} from '../../actions/products/tvs'
import Product from "../../components/Product"
import FilterProducts from "../../components/FilterProducts"
import {dataSetNameFilterProducts} from "../../actions/products/filter/filterProducts"
import {dataSortTvsByPriceAsc, dataSortTvsByPriceDesc} from "../../actions/products/sort/sortTvs"

class Tvs extends Component {

    componentDidMount() {
        const {onGetTvs, size} = this.props;
        onGetTvs(0, size);
    }

    renderListProducts() {
        const {content} = this.props;
        return content.map((tv, index) => {
                return <Product key={index} product={tv}/>
            }
        )
    }

    render() {
        const {number, size, totalPages, onGetTvs, onSetNameFilterProducts, onSortTvsByPriceAsc, onSortTvsByPriceDesc} = this.props;
        return (
            <div>
                <FilterProducts setNameFilterProducts={onSetNameFilterProducts}
                                sortProductsByPriceAsc={onSortTvsByPriceAsc}
                                sortProductsByPriceDesc={onSortTvsByPriceDesc}/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Tvs</span> &nbsp;
                        {(number - 1 >= 0) ?
                            <button onClick={() => onGetTvs(number - 1, size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(number + 1 < totalPages) ?
                            <button onClick={() => onGetTvs(number + 1, size)} className="btn btn-success">Next
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
        number: state.tvs.number,
        size: state.tvs.size,
        totalPages: state.tvs.totalPages,
        content: state.tvs.content.filter(tv => tv.name.toLowerCase().includes(state.filterProducts.toLowerCase()))
    }),
    dispatch => ({
        onGetTvs: (page, size) => {
            dispatch(getTvs(page, size))
        },
        onSetNameFilterProducts: (event) => {
            dispatch(dataSetNameFilterProducts(event.target.value))
        },
        onSortTvsByPriceAsc: () => {
            dispatch(dataSortTvsByPriceAsc())
        },
        onSortTvsByPriceDesc: () => {
            dispatch(dataSortTvsByPriceDesc())
        }
    })
)(Tvs)