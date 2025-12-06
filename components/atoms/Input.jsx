import React from "react";

export default function Input({ placeholder, value, onChange, id, className, ...props }) {
  const finalClassName = `${className}`;
  return (
    <input placeholder={placeholder} value={value} onChange={onChange} id={id} className={finalClassName} {...props} />
  );
}
