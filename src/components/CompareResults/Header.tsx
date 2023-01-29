import React from "react";
import {
  OS,
  ResultType,
} from "../../pages/CompareResultsPage/CompareResultsPage.types";
import { HeaderContainer, HeaderItem } from "./Header.styles";
type Props = Omit<ResultType, "file">;
type HeaderProps = {
  info: Array<Props>;
};

export const Header = ({ info }: HeaderProps) => {
  return (
    <HeaderContainer>
      {info.map(({ os, label }, index) => (
        <HeaderItem os={os as OS} key={`${os}_${label}_${index}`}>{label}</HeaderItem>
      ))}
    </HeaderContainer>
  );
};
