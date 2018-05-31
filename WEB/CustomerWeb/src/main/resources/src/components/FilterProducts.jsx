import React from 'react'

const FilterProducts = ({setNameFilterProducts, sortProductsByPriceAsc, sortProductsByPriceDesc}) => {

    return (
        <div className="alert alert-info">
            <div className="form-inline">
                <div className="form-group">
                    <label className="control-lable" htmlFor="pname">Name</label> &nbsp;
                    <input id="pname"
                           onChange={setNameFilterProducts}
                           className="productName form-control input-sm"
                           placeholder="Enter product name"/>
                </div> &nbsp;
                <div className="form-group pull-right">
                    <label className="radio-inline">
                        <input className="form-check-input" type="radio"
                               name="option" onClick={sortProductsByPriceAsc}/>
                        Price ↑
                    </label>
                    <label className="radio-inline">
                        <input className="form-check-input" type="radio"
                               name="option" onClick={sortProductsByPriceDesc}/>
                        Price ↓
                    </label>
                </div>
            </div>
        </div>
    )
};

export default FilterProducts

