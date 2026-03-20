import { Textarea } from "./Textarea";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Textarea, {
  name: "Textarea",
  description: "Multiline text input with label, placeholder, error and required states",
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
    rows: props.Number({
      name: "Rows",
      defaultValue: 4,
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
