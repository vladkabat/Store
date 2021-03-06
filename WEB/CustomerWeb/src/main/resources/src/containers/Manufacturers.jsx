import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getManufacturers} from '../actions/manufacturers'
import Manufacturer from "../components/Manufacturer"

class Manufacturers extends Component {

    componentDidMount() {
        const {onGetManufacturers, manufacturers} = this.props;
        onGetManufacturers(0, manufacturers.size);
    }

    renderListManufacturers() {
        const {manufacturers, errorMessage} = this.props;
        return manufacturers.content.map((manufacturer, index) => {
                return <Manufacturer key={index} manufacturer={manufacturer} errorMessage={errorMessage}/>
            }
        )
    }

    render() {
        const {manufacturers, onGetManufacturers} = this.props;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <span className="lead">Manufacturers</span>
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
        }
    })
)(Manufacturers)