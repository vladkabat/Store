import React from 'react'

const ErrorMessage = ({message}) => {
    if (message === "") {
        return null;
    } else {
        return (
            <div className="alert alert-danger">
                {message}
            </div>
        )
    }
};

export default ErrorMessage