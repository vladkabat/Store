import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getVideoCameras} from '../../actions/products/videoCameras'
import Product from "../../components/Product"
import FilterProducts from "../../components/FilterProducts"
import {dataSetNameFilterProducts} from "../../actions/products/filter/filterProducts"
import {dataSortVideoCamerasByPriceAsc, dataSortVideoCamerasByPriceDesc} from "../../actions/products/sort/sortVideoCameras"

class VideoCameras extends Component {

    componentDidMount() {
        const {onGetVideoCameras, size} = this.props;
        onGetVideoCameras(0, size);
    }

    renderListProducts() {
        const {content} = this.props;
        return content.map((videoCamera, index) => {
                return <Product key={index} product={videoCamera}/>
            }
        )
    }

    render() {
        const {number, size, totalPages, onGetVideoCameras, onSetNameFilterProducts, onSortVideoCamerasByPriceAsc, onSortVideoCamerasByPriceDesc} = this.props;
        return (
            <div>
                <FilterProducts setNameFilterProducts={onSetNameFilterProducts}
                                sortProductsByPriceAsc={onSortVideoCamerasByPriceAsc}
                                sortProductsByPriceDesc={onSortVideoCamerasByPriceDesc}/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Video cameras</span> &nbsp;
                        {(number - 1 >= 0) ?
                            <button onClick={() => onGetVideoCameras(number - 1, size)} className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(number + 1 < totalPages) ?
                            <button onClick={() => onGetVideoCameras(number + 1, size)} className="btn btn-success">Next
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
        number: state.videoCameras.number,
        size: state.videoCameras.size,
        totalPages: state.videoCameras.totalPages,
        content: state.videoCameras.content.filter(videoCamera => videoCamera.name.toLowerCase().includes(state.filterProducts.toLowerCase()))
    }),
    dispatch => ({
        onGetVideoCameras: (page, size) => {
            dispatch(getVideoCameras(page, size))
        },
        onSetNameFilterProducts: (event) => {
            dispatch(dataSetNameFilterProducts(event.target.value))
        },
        onSortVideoCamerasByPriceAsc: () => {
            dispatch(dataSortVideoCamerasByPriceAsc())
        },
        onSortVideoCamerasByPriceDesc: () => {
            dispatch(dataSortVideoCamerasByPriceDesc())
        }
    })
)(VideoCameras)