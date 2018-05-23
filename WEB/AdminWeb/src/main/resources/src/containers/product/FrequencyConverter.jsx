import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {getFrequencyConverter, deleteFrequencyConverter} from '../../actions/products/frequencyConverters'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage";

class FrequencyConverter extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetFrequencyConverter} = this.props;
        onGetFrequencyConverter(id);
    }

    render() {
        const {isDeleted, frequencyConverter, onDeleteFrequencyConverter, errorMessage} = this.props;

        if (isDeleted) {
            return <Redirect to="/frequencyConverters"/>
        } else {
            return (
                <div className="col-md-12">
                    <br/>
                    <div className="col-md-4 container-fluid bg-1">
                        <div className="alert alert-success text-center">
                            <h4><strong>{frequencyConverter.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={frequencyConverter.urlImage} width="220" height="250"/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="portlet light bordered">
                            <ErrorMessage message={errorMessage}/>
                        </div>
                        <div className="portlet light bordered">
                            <div className="portlet-title tabbable-line">
                                <div className="caption caption-md">
                                    <span
                                        className="caption-subject font-blue-madison bold uppercase">
                                        <h2>
                                            Data &nbsp;
                                            <Link to={frequencyConverter.linkUpdate}
                                                  className="btn btn-primary">Update &raquo;</Link> &nbsp;
                                            <button onClick={() => onDeleteFrequencyConverter(frequencyConverter.id)}
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
                                        <td>{frequencyConverter.rating}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Amount</th>
                                        <td>{frequencyConverter.amount}</td>
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
                                        <td>{frequencyConverter.manufacturer}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Output power</th>
                                        <td>{frequencyConverter.outputPower}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Output current</th>
                                        <td>{frequencyConverter.outputCurrent}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Output voltage</th>
                                        <td>{frequencyConverter.outputVoltage}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{frequencyConverter.price} RUB</td>
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
        frequencyConverter: state.frequencyConverter,
        isDeleted: state.status.deleted,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetFrequencyConverter: (id) => {
            dispatch(getFrequencyConverter(id))
        },
        onDeleteFrequencyConverter: (id) => {
            dispatch(deleteFrequencyConverter(id))
        }
    })
)(FrequencyConverter)
