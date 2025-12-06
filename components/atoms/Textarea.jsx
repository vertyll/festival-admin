import React from "react";

export default function Textarea({ placeholder, value, onChange, id, className, ...props }) {
  const finalClassName = `${className}`;
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      className={finalClassName}
      {...props}
    />
  );
}
