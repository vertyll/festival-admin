import React from "react";
import Label from "../../atoms/label/Label";
import Input from "../../atoms/input/Input";

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
