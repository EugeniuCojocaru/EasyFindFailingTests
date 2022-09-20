import styled from "styled-components/macro";

import { colors } from "./../../common/styles/styles";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: ${colors.appBackground};
  padding: 8px 24px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  color: ${colors.black};

  p {
    text-decoration: none;
    text-transform: none;
    font-family: "Poppins", sans-serif;
  }
`;

export const NavbarButtonContainer = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  &:hover {
    background-color: ${colors.navigator};
    border-radius: 8px;
  }
`;
export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 70px;
`;
