import React from "react";

export default function ButtonDanger({
  onClick,
  children,
  className,
  ...props
}) {
  const finalClassName = `btn-danger ${className}`;
  return (
    <button className={finalClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
