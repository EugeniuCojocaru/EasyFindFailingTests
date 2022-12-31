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
      {info.forEach(({ os, label }) => (
        <HeaderItem os={os as OS}>{label}</HeaderItem>
      ))}
    </HeaderContainer>
  );
};
