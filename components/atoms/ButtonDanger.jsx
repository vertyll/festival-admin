import React from "react";

export default function ButtonDanger({
  children,
  className,
  ...props
}) {
  const finalClassName = `btn-danger ${className}`;
  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
