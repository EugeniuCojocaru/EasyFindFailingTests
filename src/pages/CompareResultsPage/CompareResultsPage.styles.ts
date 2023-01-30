import styled from "styled-components/macro";
import { colors } from "./../../common/styles/styles";
import {
  ColumnContainer,
} from "../../components/BasicLayoutComponents";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2% 15% 0% 15%;
  font-family: Comfortaa;
  color: ${colors.black};
`;
export const ColumnResultsContainer = styled(ColumnContainer)`
  flex: 1;
`;
export const InputArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: baseline;
  margin-bottom: 24px;
`;
