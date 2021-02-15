import React from 'react';
export default ({ className, children, style, onClick }) => (
    <p className={className} style={style} onClick={onClick}>
        {children}
    </p>
);
