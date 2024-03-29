import React from "react";

export default function Label({ children, ...props }) {
  return <label {...props}>{children}</label>;
}
