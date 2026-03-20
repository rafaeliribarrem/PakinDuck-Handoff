import { PillSelect } from "./PillSelect";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(PillSelect, {
  name: "Pill Select",
  description: "Multi-select pill buttons with label and error support",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Label",
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
