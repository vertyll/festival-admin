import React from "react";

export default function ButtonPrimary({
  children,
  className,
  ...props
}) {
  const finalClassName = `btn-primary ${className}`;
  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
