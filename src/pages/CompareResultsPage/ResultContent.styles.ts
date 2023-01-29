import styled from "styled-components/macro";
import { colors } from "../../common/styles/styles";
import { Result } from "./CompareResultsPage.types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  color: ${colors.testComparison.text};
  height: auto;
`;
export const PackWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const TestResultValuesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const PackContainer = styled.div<{ isPack: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  ${({ isPack }) =>
    isPack && "justify-content: center;position: sticky;top: 0;"}
  ${({ isPack }) =>
    `background-color: ${
      isPack ? colors.testComparison.pack : colors.testComparison.test
    };`}  
  border-radius: 8px;
  height: 40px;
`;

const getColorForTestResult = (value: Result | undefined) => {
  switch (value) {
    case Result.Success:
      return colors.testComparison.success;
    case Result.Fail:
      return colors.testComparison.failure;
    case Result.Skip:
      return colors.testComparison.skipped;
    default:
      return "#FFF";
  }
};
export const TestResultContainer = styled.div<{ value: number | undefined }>`
  width: 25%;  
  border: 1px solid ${({ value }) => getColorForTestResult(value)};
  color: ${({ value }) => getColorForTestResult(value)};
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
