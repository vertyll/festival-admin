import React from "react";
import Label from "../atoms/Label";
import Textarea from "../atoms/Textarea";

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
