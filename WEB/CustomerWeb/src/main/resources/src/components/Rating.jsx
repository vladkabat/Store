import React from 'react'

const Rating = ({customer, product, updateRating}) => {

    let rating;
    let isVoted = false;
    product.ratings.forEach((rating) => {
        if(rating.userId === customer.id) {
            isVoted = true
        }
    });

    const handlerUpdateRating = (event) => {
        event.preventDefault();
        updateRating(product.id, {userId: customer.id, value: rating.value});
    };

    if (customer.isAuthenticated && !isVoted) {

        return (
            <form onSubmit={handlerUpdateRating} className="form-inline">
                <input type="number" min="0" max="5" defaultValue="5"
                       className="form-control mb-2 mr-sm-2 mb-sm-0"
                       ref={(input) => {
                           rating = input
                       }}
                       id="inlineFormInput"/> &nbsp;
                <input type="submit" value="Submit"
                       className="btn btn-secondary btn-sm"/>
            </form>
        )
    } else {
        return null
    }
};

export default Rating