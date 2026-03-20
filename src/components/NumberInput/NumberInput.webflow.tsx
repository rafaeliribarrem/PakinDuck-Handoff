import { NumberInput } from "./NumberInput";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(NumberInput, {
  name: "Number Input",
  description: "Numeric input with selectable unit dropdown (px, %, rem, etc.)",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Label",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "0",
    }),
    selectedUnit: props.Text({
      name: "Selected Unit",
      defaultValue: "px",
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
