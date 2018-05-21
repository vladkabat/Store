import React from 'react'

const ErrorMessage = ({message}) => {
    if (message === "") {
        return null;
    } else {
        return (
            <div className="text-danger align-middle">
                {message}
            </div>
        )
    }
};

export default ErrorMessage