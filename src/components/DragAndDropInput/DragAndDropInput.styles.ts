import styled from "styled-components/macro";
import { colors } from "../../common/styles/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 3px dashed ${colors.black};
  width: 100%;
  height: 150px;
  cursor: grab;
  /* background-color: ${colors.black}; */

  /* &:hover {
    border-width: 5px;
    border-style: solid;
    border-image-slice: 1;
    border-image-source: ${colors.black};
  } */
`;
