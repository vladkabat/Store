import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getManufacturers, deleteManufacturer} from '../actions/manufacturers'
import Manufacturer from "../components/Manufacturer"
import FilterProducts from "../components/FilterProducts"

class Manufacturers extends Component {

    componentDidMount() {
        const {onGetManufacturers, manufacturers} = this.props;
        onGetManufacturers(0, manufacturers.size);
    }

    renderListManufacturers() {
        const {manufacturers, errorMessage, onDeleteManufacturer} = this.props;
        return manufacturers.content.map((manufacturer, index) => {
                return <Manufacturer key={index} manufacturer={manufacturer} errorMessage={errorMessage}
                                     deleteManufacturer={onDeleteManufacturer}/>
            }
        )
    }

    render() {
        const {manufacturers, onGetManufacturers} = this.props;
        return (
            <div>
                <FilterProducts/>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Manufacturers</span>
                        &nbsp; <Link to="/create/manufacturers"
                                     className="btn btn-primary small">Create &raquo;</Link> &nbsp;
                        {(manufacturers.number - 1 >= 0) ?
                            <button onClick={() => onGetManufacturers(manufacturers.number - 1, manufacturers.size)}
                                    className="btn btn-success">Prev
                            </button>
                            : null} &nbsp;
                        {(manufacturers.number + 1 < manufacturers.totalPages) ?
                            <button onClick={() => onGetManufacturers(manufacturers.number + 1, manufacturers.size)}
                                    className="btn btn-success">Next
                            </button>
                            : null}
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            {this.renderListManufacturers()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        manufacturers: state.manufacturers,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetManufacturers: (page, size) => {
            dispatch(getManufacturers(page, size))
        },
        onDeleteManufacturer: (id) => {
            dispatch(deleteManufacturer(id))
        }
    })
)(Manufacturers)