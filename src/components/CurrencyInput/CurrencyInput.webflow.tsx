import { CurrencyInput } from "./CurrencyInput";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(CurrencyInput, {
  name: "Currency Input",
  description: "Numeric input with currency symbol icon (USD, EUR, BRL, etc.)",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Label",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Enter amount in USD",
    }),
    currencySymbol: props.Text({
      name: "Currency Symbol",
      defaultValue: "$",
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
