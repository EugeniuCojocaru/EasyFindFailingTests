import React from "react";
import { Button } from "@mui/material";
import { classes } from "../../common/styles/styles";
import { ButtonContainer, NavbarButtonContainer } from "./Navbar.styles";

interface PropTypes {
  label: string;
  handleClick: () => void;
}
export const NavbarButton: React.FC<PropTypes> = ({ label, handleClick }) => {
  return (
    <NavbarButtonContainer>
      <Button
        size="medium"
        variant="text"
        onClick={handleClick}
        style={classes.button.sideMenu}
      >
        <ButtonContainer>
          <p>
            <strong>{label}</strong>
          </p>
        </ButtonContainer>
      </Button>
    </NavbarButtonContainer>
  );
};
