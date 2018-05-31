import React, {Component} from 'react'
import Product from '../../components/Product'
import {connect} from 'react-redux'
import {getProducts} from '../../actions/products/products'

class Products extends Component {

    componentDidMount() {
        const {onGetProducts} = this.props;
        onGetProducts();
    }

    renderProducts() {
        const {products} = this.props;
        return Object.keys(products).map(
            (type, index) => {
                return <Product key={index} product={products[type]}/>
            }
        )
    };

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Products</span>
                </div>
                <div className="panel-body">
                    <div className="row">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        products: state.products
    }),
    dispatch => ({
        onGetProducts: () => {
            dispatch(getProducts())
        }
    })
)(Products)