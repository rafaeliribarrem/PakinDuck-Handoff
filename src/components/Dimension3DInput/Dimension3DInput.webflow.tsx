import { Dimension3DInput } from "./Dimension3DInput";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Dimension3DInput, {
  name: "Dimension 3D Input",
  description: "3D dimension input (Width x Length x Height) with shared unit dropdown",
  group: "Form",
  props: {
    label: props.Text({ name: "Label", defaultValue: "Dimensions" }),
    widthPlaceholder: props.Text({ name: "Width Placeholder", defaultValue: "Width" }),
    lengthPlaceholder: props.Text({ name: "Length Placeholder", defaultValue: "Length" }),
    heightPlaceholder: props.Text({ name: "Height Placeholder", defaultValue: "Height" }),
    selectedUnit: props.Text({ name: "Selected Unit", defaultValue: "Cm" }),
    required: props.Boolean({ name: "Required", defaultValue: false }),
    error: props.Text({ name: "Error Message", defaultValue: "" }),
    disabled: props.Boolean({ name: "Disabled", defaultValue: false }),
  },
});
