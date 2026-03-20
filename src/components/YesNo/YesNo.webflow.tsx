import { YesNo } from "./YesNo";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(YesNo, {
  name: "Yes / No",
  description: "Binary yes/no choice buttons with label and error support",
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
