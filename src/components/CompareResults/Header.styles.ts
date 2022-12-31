import styled from "styled-components/macro";
import { colors } from "../../common/styles/styles";
import { OS } from "../../pages/CompareResultsPage/CompareResultsPage.types";

export const HeaderContainer = styled.div`
  display: flex;
`;
export const HeaderItem = styled.div<{ os: OS }>`
  border: 1px solid
    ${({ os }) => (os === OS.Android ? colors.success : colors.failure)};
`;
