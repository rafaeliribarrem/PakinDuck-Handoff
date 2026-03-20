import { Toggle } from "./Toggle";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Toggle, {
  name: "Toggle",
  description: "Toggle switch for boolean on/off states with label and error support",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Label",
    }),
    checked: props.Boolean({
      name: "Checked",
      defaultValue: false,
    }),
    disabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
    }),
    error: props.Text({
      name: "Error Message",
      defaultValue: "",
    }),
  },
});
