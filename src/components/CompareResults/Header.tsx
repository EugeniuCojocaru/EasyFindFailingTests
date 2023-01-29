import React from "react";

import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import {
  OS,
  ResultType,
} from "../../pages/CompareResultsPage/CompareResultsPage.types";
import { HeaderContainer, HeaderItem } from "./Header.styles";
type Props = Omit<ResultType, "file">;
type HeaderProps = {
  info: Array<Props>;
  handleRemoveEntry: (index: number) => void;
};

export const Header = ({ info, handleRemoveEntry }: HeaderProps) => {
  return (
    <HeaderContainer>
      {info.map(({ os, label }, index) => (
        <HeaderItem os={os as OS} key={`${os}_${label}_${index}`}>
          {label}
          <IconButton onClick={() => handleRemoveEntry(index)}>
            <RemoveIcon />
          </IconButton>
        </HeaderItem>
      ))}
    </HeaderContainer>
  );
};
