import React, { useState } from "react";
import { Result, ResultShowType } from "./CompareResultsPage.types";
import { Container } from "./ResultContent.styles";
type ResultContentProps = {
  resultMap: Map<string, Map<string, Array<Result>>>;
};
export const ResultContent: React.FC<ResultContentProps> = ({ resultMap }) => {
  console.log({resultMap})
  const array = [...resultMap];
  return (
    <Container>
      {array.map((value, key) => {
        const array2 = [...value[1]];
        return (
          <div style={{height: "50px", border: "1px solid #000"}} key={`${key}-pack`}>
            {value[0]}
            {array2.map((value, key) => {
              return (
                <div style={{height: "50px", border: "1px solid #17af3d"}} key={`${key}-test`}>
                  {value[0]}
                  {value[1].map((value) => (
                    <span style={{height: "50px", border: "1px solid #e0e415"}} key={`${key}-${value}-result`}>{value}</span>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};
