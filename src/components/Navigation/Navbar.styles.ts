import styled from "styled-components/macro";

import { colors } from "./../../common/styles/styles";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: ${colors.gradient};
  padding-left: 16px;
  padding-right: 16px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  color: ${colors.buttonPrimary};

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
    background-color: ${colors.buttonHover};
    border-radius: 8px;
  }
`;
