import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getVideoCameras} from '../../actions/products/videoCameras'
import Product from "../../components/Product";

class VideoCameras extends Component {

    componentDidMount() {
        const {onGetVideoCameras, videoCameras} = this.props;
        onGetVideoCameras(0, videoCameras.size);
    }

    renderListProducts() {
        const {videoCameras} = this.props;
        return videoCameras.content.map((videoCamera, index) => {
                return <Product key={index} product={videoCamera}/>
            }
        )
    }

    render() {
        const {videoCameras, onGetVideoCameras} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Video cameras</span>
                    &nbsp; <Link to="/create/videoCameras" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                    {(videoCameras.number - 1 >= 0) ?
                        <button onClick={() => onGetVideoCameras(videoCameras.number - 1, videoCameras.size)} className="btn btn-success">Prev
                        </button>
                        : null} &nbsp;
                    {(videoCameras.number + 1 < videoCameras.totalPages) ?
                        <button onClick={() => onGetVideoCameras(videoCameras.number + 1, videoCameras.size)} className="btn btn-success">Next
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
        videoCameras: state.videoCameras
    }),
    dispatch => ({
        onGetVideoCameras: (page, size) => {
            dispatch(getVideoCameras(page, size))
        }
    })
)(VideoCameras)