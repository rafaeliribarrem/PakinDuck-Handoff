import { TextInput } from "./TextInput";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TextInput, {
  name: "Text Input",
  description: "Single line text input with label, placeholder, error and required states",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Label",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Placeholder",
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
