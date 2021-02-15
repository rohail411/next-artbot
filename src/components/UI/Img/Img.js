import React from 'react';

export default ({ src, className, style, alt, width, height }) => (
    <img
        src={src}
        style={style}
        className={className}
        alt={alt}
        width={`${width}`}
        height={`${height}`}
    />
);
