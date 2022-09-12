import { colors } from "./../../common/styles/styles";
import styled from "styled-components/macro";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2% 15%;
  font-family: Comfortaa;
  color: ${colors.failure};
`;
export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 15%;
`;
export const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const ResultContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  overflow-x: hidden;
  overflow-y: auto;
  border: 2px solid #fff;
`;
