import React from "react";

export default function ButtonPrimary({
  onClick,
  children,
  className,
  ...props
}) {
  const finalClassName = `btn-primary ${className}`;
  return (
    <button className={finalClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
