import React from 'react';

export default ({ className, style, children }) => (
    <span className={className} style={style}>
        {children}
    </span>
);
