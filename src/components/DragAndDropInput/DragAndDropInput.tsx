import React, { DragEvent } from "react";
import { Container } from "./DragAndDropInput.styles";

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
  return (
    <Container onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {children}
    </Container>
  );
};
