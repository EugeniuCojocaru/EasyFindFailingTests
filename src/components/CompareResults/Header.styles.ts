import styled from "styled-components/macro";
import { colors, gradients } from "../../common/styles/styles";
import { OS } from "../../pages/CompareResultsPage/CompareResultsPage.types";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 60px;  
  width:inherit;
  position: sticky;
  bottom: 0;  
`;

export const HeaderItem = styled.div<{ os: OS }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90%;
  width: 25%;

  border-radius: 8px;
  background-image: ${({ os }) =>
    os === OS.Android ? gradients.android : gradients.apple};
  color: ${colors.white};
`;
