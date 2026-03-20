import { FileUpload } from "./FileUpload";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(FileUpload, {
  name: "File Upload",
  description: "Simple file upload field with label, filename display, clear button, and error support",
  group: "Form",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Question Label",
    }),
    accept: props.Text({
      name: "Accepted File Types",
      defaultValue: "",
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
