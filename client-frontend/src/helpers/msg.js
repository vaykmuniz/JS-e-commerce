import React from 'react';

export const showSuccessMsg = msg => {
    return (
        <div className='alert alert-success' role='alert'>
            {msg}
        </div>
    )
};

export const showDangerMsg = msgs => {
    return (
        <div className='alert alert-danger' role='alert'>
            {msgs}
        </div>
    )
};

