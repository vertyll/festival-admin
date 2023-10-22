import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

export default function FieldInput({ labelText, ...props }) {
  return (
    <div>
      <Label {...props}>
        {labelText}
        <Input {...props} />
      </Label>
    </div>
  );
}
