import { ColorPicker } from "./ColorPicker";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(ColorPicker, {
  name: "Color Picker",
  description: "Color picker with gradient canvas and hex input",
  group: "Form",
  props: {
    label: props.Text({ name: "Label", defaultValue: "Color" }),
    value: props.Text({ name: "Value", defaultValue: "#FF0000" }),
    disabled: props.Boolean({ name: "Disabled", defaultValue: false }),
  },
});
