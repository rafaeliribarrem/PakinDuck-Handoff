import { DimensionInput } from "./DimensionInput";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(DimensionInput, {
  name: "Dimension Input",
  description: "2D dimension input (Width x Length) with shared unit dropdown",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Dimensions",
    }),
    widthPlaceholder: props.Text({
      name: "Width Placeholder",
      defaultValue: "Width",
    }),
    heightPlaceholder: props.Text({
      name: "Height Placeholder",
      defaultValue: "Length",
    }),
    selectedUnit: props.Text({
      name: "Selected Unit",
      defaultValue: "Cm",
    }),
    required: props.Boolean({
      name: "Required",
      defaultValue: false,
    }),
    error: props.Text({
      name: "Error Message",
      defaultValue: "",
    }),
    disabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
    }),
  },
});
