import React, { useState } from "react";

import DifferenceIcon from "@mui/icons-material/Difference";
import { Result, ResultMeta, ResultWithMeta } from "./CompareResultsPage.types";
import {
  Container,
  FilterContainer,
  PackContainer,
  PackWrapperContainer,
  TestResultContainer,
  TestResultValuesContainer,
} from "./ResultContent.styles";
import { IconButton, Tooltip } from "@mui/material";
import { colors } from "../../common/styles/styles";
type ResultContentProps = {
  resultMap: Map<string, Map<string, ResultWithMeta>>;
  noElements: number;
};
export const ResultContent: React.FC<ResultContentProps> = ({
  resultMap,
  noElements,
}) => {
  const [onlyDiffs, setOnlyDiffs] = useState<boolean>(true);
  const array = [...resultMap];

  const getLabelForTestResut = (value: Result): string => {
    switch (value) {
      case Result.Success:
        return "Success";
      case Result.Fail:
        return "Failure";
      case Result.Skip:
        return "Skipped";
      case Result.Diff:
        return "Difference";
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
  const isDiff = (meta: ResultMeta): boolean => {
    if (
      meta.success !== noElements &&
      meta.fail === 0 &&
      meta.skip === 0 &&
      meta.diff === 0
    )
      return false;
    if (meta.success === noElements) return false;
    return true;
  };
  return (
    <>
      <Container>
        {array.map((value, key) => {
          const array2 = [...value[1]];
          return (
            <PackWrapperContainer>
              <PackContainer key={`${key}-pack`} isPack={true}>
                {value[0]}
              </PackContainer>
              {array2.map((value, key) => {
                if (onlyDiffs) {
                  if (isDiff(value[1].meta)) {
                    return (
                      <>
                        <PackContainer isPack={false} key={`${key}-test`}>
                          {value[0]}
                        </PackContainer>
                        <TestResultValuesContainer>
                          {getTestValues(value[1].values, value[0])}
                        </TestResultValuesContainer>
                      </>
                    );
                  }
                } else {
                  return (
                    <>
                      <PackContainer isPack={false} key={`${key}-test`}>
                        {value[0]}
                      </PackContainer>
                      <TestResultValuesContainer>
                        {getTestValues(value[1].values, value[0])}
                      </TestResultValuesContainer>
                    </>
                  );
                }
              })}
            </PackWrapperContainer>
          );
        })}
      </Container>
      {noElements > 0 && (
        <FilterContainer>
          <Tooltip title={onlyDiffs ? "Show all" : "Show diffs"}>
            <IconButton onClick={() => setOnlyDiffs(!onlyDiffs)}>
              <DifferenceIcon
                sx={{
                  color: onlyDiffs ? colors.testComparison.success : undefined,
                }}
              />
            </IconButton>
          </Tooltip>
        </FilterContainer>
      )}
    </>
  );
};
