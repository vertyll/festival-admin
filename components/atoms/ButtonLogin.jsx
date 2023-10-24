import React from "react";

export default function ButtonLogin({ children, className, ...props }) {
  const finalClassName = `btn-login ${className}`;
  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
