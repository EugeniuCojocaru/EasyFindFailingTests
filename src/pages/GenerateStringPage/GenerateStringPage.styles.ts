import { colors } from "./../../common/styles/styles";
import styled from "styled-components/macro";
import {
  ColumnContainer,
  RowContainer,
} from "../../components/BasicLayoutComponents";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2% 15%;
  font-family: Comfortaa;
  color: ${colors.black};
`;
export const Row = styled(RowContainer)`
  padding-top: 8%;
`;
export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 1%;
  flex: 1;
`;
export const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const ResultContainer = styled(ColumnContainer)`
  width: 100%;
  flex: 2;
  padding: 2% 1%;
`;
export const ResultTextContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  border: 2px solid #000;

  padding: 2% 1%;
  min-height: 40%;
`;
