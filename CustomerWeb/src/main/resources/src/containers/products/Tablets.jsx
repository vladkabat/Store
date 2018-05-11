import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTablets} from '../../actions/products/tablets'
import Product from "../../components/Product"
import FilterProducts from "../../components/FilterProducts"
import {dataSetNameFilterProducts} from "../../actions/products/filter/filterProducts"
import {dataSortTabletsByPriceAsc, dataSortTabletsByPriceDesc} from "../../actions/products/sort/sortTablets"

class Tablets extends Component {

    componentDidMount() {
        const {onGetTablets, size} = this.props;
        onGetTablets(0, size);
    }

    renderListProducts() {
        const {content} = this.props;
        return content.map((tablet, index) => {
                return <Product key={index} product={tablet}/>
            }
        )
    }

    render() {
        const {number, size, totalPages, onGetTablets, onSetNameFilterProducts, onSortTabletsByPriceAsc, onSortTabletsByPriceDesc} = this.props;
        return (
            <div>
                <FilterProducts setNameFilterProducts={onSetNameFilterProducts}
                                sortProductsByPriceAsc={onSortTabletsByPriceAsc}
                                sortProductsByPriceDesc={onSortTabletsByPriceDesc}/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Tablets</span> &nbsp;
                        {(number - 1 >= 0) ?
                            <button onClick={() => onGetTablets(number - 1, size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(number + 1 < totalPages) ?
                            <button onClick={() => onGetTablets(number + 1, size)} className="btn btn-success">Next
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
        number: state.tablets.number,
        size: state.tablets.size,
        totalPages: state.tablets.totalPages,
        content: state.tablets.content.filter(tablet => tablet.name.toLowerCase().includes(state.filterProducts.toLowerCase()))
    }),
    dispatch => ({
        onGetTablets: (page, size) => {
            dispatch(getTablets(page, size))
        },
        onSetNameFilterProducts: (event) => {
            dispatch(dataSetNameFilterProducts(event.target.value))
        },
        onSortTabletsByPriceAsc: () => {
            dispatch(dataSortTabletsByPriceAsc())
        },
        onSortTabletsByPriceDesc: () => {
            dispatch(dataSortTabletsByPriceDesc())
        }
    })
)(Tablets)