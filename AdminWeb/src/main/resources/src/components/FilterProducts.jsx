import React from 'react'
import {setFilter} from "../actions/admin";

const FilterProducts = () => {

    return (
        <div className="alert alert-info">
            <strong>Filter products:</strong> &nbsp;
            <label className="radio-inline">
                <input className="form-check-input" type="radio"
                       name="option" onClick={() => setFilter("UPLOAD_DATE")} defaultChecked="true"/>
                Upload date
            </label>
            <label className="radio-inline">
                <input className="form-check-input" type="radio"
                       name="option" onClick={() => setFilter("RATING")}/>
                Rating
            </label>
        </div>
    )
};

export default FilterProducts

