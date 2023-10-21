import React from "react";
import Label from "../../atoms/label/Label";
import Textarea from "../../atoms/textarea/Textarea";

export default function FieldTextarea({ labelText, ...props }) {
  return (
    <div>
      <Label {...props}>
        {labelText}
        <Textarea {...props} />
      </Label>
    </div>
  );
}
