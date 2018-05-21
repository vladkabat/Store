import React from 'react'
import {setFilter} from "../actions/admin";

const FilterProducts = () => {

    return (
        <div className="alert alert-info" role="alert">
            <div className="form-check form-check-inline">
                <label className="form-check-label">Filter products:</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="option" onClick={() => setFilter("UPLOAD_DATE")} defaultChecked="true" />
                <label className="form-check-label">Upload date</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="option" onClick={() => setFilter("RATING")} />
                <label className="form-check-label">Rating</label>
            </div>
        </div>
    )
};

export default FilterProducts

