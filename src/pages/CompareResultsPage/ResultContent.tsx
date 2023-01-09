import React, { useState } from "react";
import {
  ColumnContainer,
  RowContainer,
} from "../../components/BasicLayoutComponents";
import { Result, ResultShowType } from "./CompareResultsPage.types";
import {
  Container,
  PackContainer,
  PackWrapperContainer,
  TestResultContainer,
} from "./ResultContent.styles";
type ResultContentProps = {
  resultMap: Map<string, Map<string, Array<Result>>>;
};
export const ResultContent: React.FC<ResultContentProps> = ({ resultMap }) => {
  console.log({ resultMap });
  const array = [...resultMap];

  const getLabelForTestResut = (value: Result): string => {
    switch (value) {
      case Result.Success:
        return "Success";
      case Result.Fail:
        return "Failure";
      case Result.Skip:
        return "Skipped";
      default:
        return "#FF0";
    }
  };
  return (
    <Container>
      {array.map((value, key) => {
        const array2 = [...value[1]];
        return (
          <PackWrapperContainer>
            <PackContainer key={`${key}-pack`} isPack={true}>
              {value[0]}
            </PackContainer>
            {array2.map((value, key) => {
              return (
                <>
                  <PackContainer isPack={false} key={`${key}-test`}>
                    {value[0]}
                  </PackContainer>
                  <RowContainer>
                    {value[1].map((value) => (
                      <TestResultContainer
                        key={`${key}-${value}-result`}
                        value={value}
                      >
                        {getLabelForTestResut(value)}
                      </TestResultContainer>
                    ))}
                  </RowContainer>
                </>
              );
            })}
          </PackWrapperContainer>
        );
      })}
    </Container>
  );
};
