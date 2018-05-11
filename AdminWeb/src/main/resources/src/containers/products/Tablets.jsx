import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getTablets} from '../../actions/products/tablets'
import Product from "../../components/Product";

class Tablets extends Component {

    componentDidMount() {
        const {onGetTablets, tablets} = this.props;
        onGetTablets(0, tablets.size);
    }

    renderListProducts() {
        const {tablets} = this.props;
        return tablets.content.map((tablet, index) => {
                return <Product key={index} product={tablet}/>
            }
        )
    }

    render() {
        const {tablets, onGetTablets} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Tablets</span>
                    &nbsp; <Link to="/create/tablets" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                    {(tablets.number - 1 >= 0) ?
                        <button onClick={() => onGetTablets(tablets.number - 1, tablets.size)} className="btn btn-success">Prev
                        </button>
                        : null} &nbsp;
                    {(tablets.number + 1 < tablets.totalPages) ?
                        <button onClick={() => onGetTablets(tablets.number + 1, tablets.size)} className="btn btn-success">Next
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
        tablets: state.tablets
    }),
    dispatch => ({
        onGetTablets: (page, size) => {
            dispatch(getTablets(page, size))
        }
    })
)(Tablets)