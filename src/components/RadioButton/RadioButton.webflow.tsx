import { RadioButton } from "./RadioButton";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RadioButton, {
  name: "Radio Button",
  description: "Radio button group with label and description",
  group: "Form",
  props: {
    required: props.Boolean({ name: "Required", defaultValue: false }),
    error: props.Text({ name: "Error Message", defaultValue: "" }),
    disabled: props.Boolean({ name: "Disabled", defaultValue: false }),
  },
});
