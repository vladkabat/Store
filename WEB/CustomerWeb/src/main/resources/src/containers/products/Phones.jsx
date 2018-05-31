import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPhones} from '../../actions/products/phones'
import Product from "../../components/Product";
import FilterProducts from "../../components/FilterProducts"
import {dataSetNameFilterProducts} from "../../actions/products/filter/filterProducts"
import {dataSortPhonesByPriceAsc, dataSortPhonesByPriceDesc} from "../../actions/products/sort/sortPhones"

class Phones extends Component {

    componentDidMount() {
        const {onGetPhones, size} = this.props;
        onGetPhones(0, size);
    }

    renderListProducts() {
        const {content} = this.props;
        return content.map((phone, index) => {
                return <Product key={index} product={phone}/>
            }
        )
    }

    render() {
        const {
            number, size, totalPages, onGetPhones, onSetNameFilterProducts, onSortPhonesByPriceAsc,
            onSortPhonesByPriceDesc
        } = this.props;
        return (
            <div>
                <FilterProducts setNameFilterProducts={onSetNameFilterProducts}
                                sortProductsByPriceAsc={onSortPhonesByPriceAsc}
                                sortProductsByPriceDesc={onSortPhonesByPriceDesc}/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Phones</span> &nbsp;
                        {(number - 1 >= 0) ?
                            <button onClick={() => onGetPhones(number - 1, size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(number + 1 < totalPages) ?
                            <button onClick={() => onGetPhones(number + 1, size)} className="btn btn-success">Next
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
        content: state.phones.content.filter(phone => phone.name.toLowerCase().includes(state.filterProducts.toLowerCase())),
        number: state.phones.number,
        size: state.phones.size,
        totalPages: state.phones.totalPages
    }),
    dispatch => ({
        onGetPhones: (page, size) => {
            dispatch(getPhones(page, size))
        },
        onSetNameFilterProducts: (event) => {
            dispatch(dataSetNameFilterProducts(event.target.value))
        },
        onSortPhonesByPriceAsc: () => {
            dispatch(dataSortPhonesByPriceAsc())
        },
        onSortPhonesByPriceDesc: () => {
            dispatch(dataSortPhonesByPriceDesc())
        }
    })
)(Phones)