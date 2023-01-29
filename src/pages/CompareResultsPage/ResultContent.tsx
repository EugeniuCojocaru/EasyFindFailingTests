import React from "react";
import { Result } from "./CompareResultsPage.types";
import {
  Container,
  PackContainer,
  PackWrapperContainer,
  TestResultContainer,
  TestResultValuesContainer,
} from "./ResultContent.styles";
type ResultContentProps = {
  resultMap: Map<string, Map<string, Array<Result>>>;
  noElements: number;
};
export const ResultContent: React.FC<ResultContentProps> = ({
  resultMap,
  noElements,
}) => {
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
        return "-";
    }
  };
  const getTestValues = (resultArray: Array<Result>, testName: string) => {
    const result = [];
    for (let i = 0; i < noElements; i++) {
      result.push(
        <TestResultContainer
          key={`${testName}-${i}-${resultArray[i]}-result`}
          value={resultArray[i]}
        >
          {getLabelForTestResut(resultArray[i])}
        </TestResultContainer>
      );
    }
    return result;
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
                  <TestResultValuesContainer>
                    {getTestValues(value[1], value[0])}
                  </TestResultValuesContainer>
                </>
              );
            })}
          </PackWrapperContainer>
        );
      })}
    </Container>
  );
};
