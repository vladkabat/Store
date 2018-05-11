import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {getTablet, deleteTablet} from '../../actions/product/tablet'
import {connect} from 'react-redux'
import ErrorMessage from "../../components/ErrorMessage";

class Tablet extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        const {onGetTablet} = this.props;
        onGetTablet(id);
    }

    render() {
        const {isDeletedProduct, tablet, onDeleteTablet, errorMessage} = this.props;

        if (isDeletedProduct) {
            return <Redirect to="/tablets"/>
        } else {
            return (
                <div className="col-md-12">
                    <div className="col-md-4 container-fluid bg-1">
                        <div className="alert alert-success text-center">
                            <h4><strong>{tablet.name}</strong></h4>
                        </div>
                        <div className="image text-center">
                            <img src={tablet.urlImage} width="220" height="340"/>
                        </div>
                        <br/>
                        <div className="alert alert-info"><h5>{tablet.description}</h5></div>
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
                                            <Link to={tablet.linkUpdate}
                                                  className="btn btn-primary">Update &raquo;</Link> &nbsp;
                                            <button onClick={() => onDeleteTablet(tablet.id)}
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
                                        <td>{tablet.rating}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Amount</th>
                                        <td>{tablet.amount}</td>
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
                                        <th scope="row">Number cores</th>
                                        <td>{tablet.numberCores}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">RAM</th>
                                        <td>{tablet.ram}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Screen size</th>
                                        <td>{tablet.screenSize}</td>
                                    </tr>
                                    <tr className="warning">
                                        <th scope="row">Price</th>
                                        <td>{tablet.price} RUB</td>
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
        tablet: state.tablet,
        isDeletedProduct: state.status.deletedProduct,
        errorMessage: state.message
    }),
    dispatch => ({
        onGetTablet: (id) => {
            dispatch(getTablet(id))
        },
        onDeleteTablet: (id) => {
            dispatch(deleteTablet(id))
        }
    })
)(Tablet)
