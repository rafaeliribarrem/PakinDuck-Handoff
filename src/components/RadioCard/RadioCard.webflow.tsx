import { RadioCard } from "./RadioCard";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(RadioCard, {
  name: "Radio Card",
  description: "Radio card group with image thumbnail",
  group: "Form",
  props: {
    label: props.Text({ name: "Label", defaultValue: "" }),
    disabled: props.Boolean({ name: "Disabled", defaultValue: false }),
    error: props.Text({ name: "Error Message", defaultValue: "" }),
  },
});
