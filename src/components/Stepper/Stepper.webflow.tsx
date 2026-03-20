import { Stepper } from "./Stepper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Stepper, {
  name: "Stepper",
  description: "Number stepper with − and + buttons, click-to-edit value",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Number",
    }),
    value: props.Number({
      name: "Value",
      defaultValue: 10,
    }),
    min: props.Number({
      name: "Min",
      defaultValue: 0,
    }),
    max: props.Number({
      name: "Max",
      defaultValue: 999,
    }),
    step: props.Number({
      name: "Step",
      defaultValue: 1,
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
