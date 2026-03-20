import { Dropdown } from "./Dropdown";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Dropdown, {
  name: "Dropdown",
  description: "Select input with dropdown options list",
  group: "Form",
  props: {
    label: props.Text({ name: "Label", defaultValue: "Label" }),
    placeholder: props.Text({ name: "Placeholder", defaultValue: "Placeholder" }),
    required: props.Boolean({ name: "Required", defaultValue: false }),
    error: props.Text({ name: "Error Message", defaultValue: "" }),
    disabled: props.Boolean({ name: "Disabled", defaultValue: false }),
  },
});
