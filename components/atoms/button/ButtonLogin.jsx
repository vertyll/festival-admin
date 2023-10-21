import React from "react";

export default function ButtonLogin({
  onClick,
  children,
  className,
  ...props
}) {
  const finalClassName = `btn-login ${className}`;
  return (
    <button className={finalClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
