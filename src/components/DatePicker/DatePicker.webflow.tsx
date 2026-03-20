import { DatePicker } from "./DatePicker";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(DatePicker, {
  name: "Date Picker",
  description: "Date picker with trigger input and calendar popup",
  group: "Form",
  props: {
    label: props.Text({ name: "Label", defaultValue: "Pick a date" }),
    disabled: props.Boolean({ name: "Disabled", defaultValue: false }),
    error: props.Text({ name: "Error Message", defaultValue: "" }),
  },
});
