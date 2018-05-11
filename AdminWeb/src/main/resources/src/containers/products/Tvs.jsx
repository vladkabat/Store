import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getTvs} from '../../actions/products/tvs'
import Product from "../../components/Product";

class Tvs extends Component {

    componentDidMount() {
        const {onGetTvs, tvs} = this.props;
        onGetTvs(0, tvs.size);
    }

    renderListProducts() {
        const {tvs} = this.props;
        return tvs.content.map((tv, index) => {
                return <Product key={index} product={tv}/>
            }
        )
    }

    render() {
        const {tvs, onGetTvs} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Tvs</span>
                    &nbsp; <Link to="/create/tvs" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                    {(tvs.number - 1 >= 0) ?
                        <button onClick={() => onGetTvs(tvs.number - 1, tvs.size)} className="btn btn-success">Prev
                        </button>
                        : null} &nbsp;
                    {(tvs.number + 1 < tvs.totalPages) ?
                        <button onClick={() => onGetTvs(tvs.number + 1, tvs.size)} className="btn btn-success">Next
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
        tvs: state.tvs
    }),
    dispatch => ({
        onGetTvs: (page, size) => {
            dispatch(getTvs(page, size))
        }
    })
)(Tvs)