import React from "react";
import { useNavigate } from "react-router";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { ButtonsContainer, NavbarContainer } from "./Navbar.styles";
import { NavbarButton } from "./NavbarButton";
import { PATHS } from "../../common/utils/paths";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigateTo = (route: string) => {
    navigate(route);
  };
  return (
    <NavbarContainer>
      <p>
        <strong>Jenkins Add-on</strong>
      </p>
      <ButtonsContainer>
        <NavbarButton
          label="DASHBOARD"
          handleClick={() => handleNavigateTo(PATHS.dashboard)}
        >
          <DashboardIcon />
        </NavbarButton>
      </ButtonsContainer>
    </NavbarContainer>
  );
};
