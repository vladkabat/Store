import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPhones} from '../../actions/products/phones'
import Product from "../../components/Product";

class Phones extends Component {

    componentDidMount() {
        const {onGetPhones, phones} = this.props;
        onGetPhones(0, phones.size);
    }

    renderListProducts() {
        const {phones} = this.props;
        return phones.content.map((phone, index) => {
                return <Product key={index} product={phone}/>
            }
        )
    }

    render() {
        const {phones, onGetPhones} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="lead">Phones</span>
                    &nbsp; <Link to="/create/phones" className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                    {(phones.number - 1 >= 0) ?
                        <button onClick={() => onGetPhones(phones.number - 1, phones.size)} className="btn btn-success">Prev
                        </button>
                        : null} &nbsp;
                    {(phones.number + 1 < phones.totalPages) ?
                        <button onClick={() => onGetPhones(phones.number + 1, phones.size)} className="btn btn-success">Next
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
        phones: state.phones
    }),
    dispatch => ({
        onGetPhones: (page, size) => {
            dispatch(getPhones(page, size))
        }
    })
)(Phones)