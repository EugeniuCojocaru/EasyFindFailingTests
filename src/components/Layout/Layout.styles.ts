import { colors } from "./../../common/styles/styles";
import styled from "styled-components/macro";

export const NavigationBarContainer = styled.div`
  position: sticky;
  top: 0;
  height: max-content;
`;
export const PagesContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${colors.appBackground};
`;
