import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {getEngine, deleteEngine} from '../../actions/product/engine'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage";

class Engine extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetEngine} = this.props;
        onGetEngine(id);
    }

    render() {
        const {isDeleted, engine, onDeleteEngine, errorMessage} = this.props;

        if (isDeleted) {
            return <Redirect to="/engines"/>
        } else {
            return (
                <div className="col-md-12">
                    <br/>
                    <div className="col-md-4 container-fluid bg-1">
                        <div className="alert alert-success text-center">
                            <h4><strong>{engine.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={engine.urlImage} width="220" height="250"/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="portlet light bordered">
                            <ErrorMessage message={errorMessage}/>
                        </div>
                        <div className="portlet light bordered">
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span className="caption-subject font-blue-madison bold uppercase">
                                        <h2>
                                            Data &nbsp;
                                            <Link to={engine.linkUpdate}
                                                  className="btn btn-primary">Update &raquo;</Link> &nbsp;
                                            <button onClick={() => onDeleteEngine(engine.id)}
                                                    className="btn btn-primary">Delete &raquo;</button>
                                        </h2>
                                    </span>
                                </div>
                            </div>
                            <div className="body">
                                <table className="table">
                                    <thead>
                                    <tr className="active">
                                        <th>#</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="warning">
                                        <th scope="row">Rating</th>
                                        <td>{engine.rating}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Amount</th>
                                        <td>{engine.amount}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="portlet light bordered">
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span
                                        className="caption-subject font-blue-madison bold uppercase"><h2>Description</h2></span>
                                </div>
                            </div>
                            <div className="body">
                                <table className="table">
                                    <thead>
                                    <tr className="active">
                                        <th>#</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="warning">
                                        <th scope="row">Manufacturer</th>
                                        <td>{engine.manufacturer}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Rated power</th>
                                        <td>{engine.ratedPower}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Rated current</th>
                                        <td>{engine.ratedCurrent}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Rated voltage</th>
                                        <td>{engine.ratedVoltage}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{engine.price} RUB</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(
    state => ({
        engine: state.engine,
        isDeleted: state.status.deleted,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetEngine: (id) => {
            dispatch(getEngine(id))
        },
        onDeleteEngine: (id) => {
            dispatch(deleteEngine(id))
        }
    })
)(Engine)