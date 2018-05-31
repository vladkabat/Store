import React from 'react'

const FilterProducts = ({setNameFilterProducts, sortProductsByPriceAsc, sortProductsByPriceDesc}) => {

    return (
        <div className="alert alert-info" role="alert">
            <div className="form-check form-check-inline">
                <label className="form-check-label">Filter products:</label>
            </div>
            <div className="form-check form-check-inline">
                <label className="form-check-label">Name</label> &nbsp;
                <input className="form-control input-sm" name="pname" onChange={setNameFilterProducts}
                       placeholder="Enter product name"/>
            </div>
            <div className="form-check form-check-inline">
                <label className="form-check-label">Sort products:</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="option" onClick={sortProductsByPriceAsc}/>
                <label className="form-check-label">Price ↑</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="option" onClick={sortProductsByPriceDesc}/>
                <label className="form-check-label">Price ↓</label>
            </div>
        </div>
    )
};

export default FilterProducts

