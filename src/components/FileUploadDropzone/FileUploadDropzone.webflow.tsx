import { FileUploadDropzone } from "./FileUploadDropzone";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(FileUploadDropzone, {
  name: "File Upload Dropzone",
  description:
    "Drag and drop file upload with thumbnails, progress bars, and multiple file support",
  group: "Form",
  props: {
    accept: props.Text({
      name: "Accepted File Types",
      defaultValue: "",
    }),
    multiple: props.Boolean({
      name: "Allow Multiple Files",
      defaultValue: true,
    }),
    maxSizeMB: props.Number({
      name: "Max File Size (MB)",
      defaultValue: 4,
    }),
    dropzoneText: props.Text({
      name: "Dropzone Text",
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
