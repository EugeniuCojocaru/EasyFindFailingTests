import React, { DragEvent } from "react";
import { Container } from "./DragAndDropInput.styles";
import UploadIcon from "@mui/icons-material/Upload";
import { Button } from "@mui/material";
type Props = {
  handleDragAndDrop: (file: File | undefined) => void;
};
export const DragAndDropInput: React.FC<Props> = ({ handleDragAndDrop }) => {
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.items[0];
    if (file) {
      if (file.kind === "file" && file.type === "text/html") {
        const readFile = file.getAsFile();
        handleDragAndDrop(readFile || undefined);
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
