import React from 'react'
import {Link} from 'react-router-dom'
import ErrorMessage from "../components/ErrorMessage"

const Manufacturer = ({manufacturer, errorMessage}) => {

    return (
        <div className="col-md-12">
            <br/>
            <div className="col-md-8">
                <div className="portlet light bordered">
                    <ErrorMessage message={errorMessage}/>
                </div>
                <div className="portlet light bordered">
                    <div className="portlet-title tabbable-line">
                        <div className="caption caption-md">
                            <span className="caption-subject font-blue-madison bold uppercase">
                                <h2>
                                    {manufacturer.name}
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
                                <th scope="row">Phone</th>
                                <td>{manufacturer.phone}</td>
                            </tr>
                            <tr className="warning">
                                <th scope="row">Email</th>
                                <td>{manufacturer.email}</td>
                            </tr>
                            <tr className="warning">
                                <th scope="row">Description</th>
                                <td>{manufacturer.description}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Manufacturer