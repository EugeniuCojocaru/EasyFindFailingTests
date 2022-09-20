import React, { DragEvent } from "react";
import { Container } from "./DragAndDropInput.styles";
import UploadIcon from "@mui/icons-material/Upload";
import { Button } from "@mui/material";
type Props = {
  handleDragAndDrop: (file: File | undefined) => void;
};
export const DragAndDropInput: React.FC<Props> = ({
  handleDragAndDrop,
  children,
}) => {
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    console.log("sdfkls");
    event.preventDefault();
    console.log(event);
    const file = event.dataTransfer.items[0];
    if (file) {
      console.log("1");

      if (file.kind === "file" && file.type === "text/html") {
        console.log("2");

        const readFile = file.getAsFile();
        handleDragAndDrop(readFile || undefined);
        console.log({ readFile });
      }
    }
  };
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      handleDragAndDrop(file || undefined);
    }
  };
  return (
    <Container onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <UploadIcon />
      <span>
        <Button variant="text" component="label" onChange={handleChange}>
          Click here
          <input hidden accept=".html" type="file" />
        </Button>
        or drag and drop
      </span>
      accepts only .html files
    </Container>
  );
};
