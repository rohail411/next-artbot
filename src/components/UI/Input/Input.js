import React from 'react';

export default ({
    min,
    max,
    type,
    className,
    onChange,
    value,
    placeholder,
    name,
    id,
    required,
    checked,
    defaultValue,
    readOnly
}) => (
    <input
        checked={checked}
        required={required}
        type={type}
        className={className}
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
        min={min}
        max={max}
    />
);
