import React from 'react';

const NotFound = () => {
    const textStyle = {
        marginTop : '20px',
        textAlign : 'center'
    }
    return (
        <div>
            <h4 style={textStyle}>Page Not Found</h4>
            <h2 style={textStyle}>Error 404</h2>
        </div>
    );
};

export default NotFound;