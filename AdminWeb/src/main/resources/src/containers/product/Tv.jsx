import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {getTv, deleteTv} from '../../actions/product/tv'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage";

class Tv extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetTv} = this.props;
        onGetTv(id);
    }

    render() {
        const {isDeletedProduct, tv, onDeleteTv, errorMessage} = this.props;

        if (isDeletedProduct) {
            return <Redirect to="/tvs"/>
        } else {
            return (
                <div className="col-md-12">
                    <div className="col-md-4 container-fluid bg-1">
                        <div className="alert alert-success text-center">
                            <h4><strong>{tv.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={tv.urlImage} width="220" height="240"/>
                        </div>
                        <br/>
                        <div className="alert alert-info"><h5>{tv.description}</h5></div>
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
                                            <Link to={tv.linkUpdate} className="btn btn-primary">Update &raquo;</Link> &nbsp;
                                            <button onClick={() => onDeleteTv(tv.id)}
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
                                        <td>{tv.rating}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Amount</th>
                                        <td>{tv.amount}</td>
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
                                        <th scope="row">Resolution screen</th>
                                        <td>{tv.resolutionScreen}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">CPU</th>
                                        <td>{tv.cpu}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Screen size</th>
                                        <td>{tv.screenSize}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{tv.price} RUB</td>
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
        tv: state.tv,
        isDeletedProduct: state.status.deletedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetTv: (id) => {
            dispatch(getTv(id))
        },
        onDeleteTv: (id) => {
            dispatch(deleteTv(id))
        }
    })
)(Tv)