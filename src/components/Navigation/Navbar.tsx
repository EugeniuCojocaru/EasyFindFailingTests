import React from "react";
import { useNavigate } from "react-router";

import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  ButtonsContainer,
  LogoContainer,
  NavbarContainer,
} from "./Navbar.styles";
import { NavbarButton } from "./NavbarButton";
import { PATHS } from "../../common/utils/paths";
import logo from "../../common/resources/logoJenu.png";
export const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigateTo = (route: string) => {
    navigate(route);
  };
  return (
    <NavbarContainer>
      <LogoContainer>
        <img src={logo} alt="logo" />
      </LogoContainer>
      <ButtonsContainer>
        <NavbarButton
          label="COMPARE TESTS"
          handleClick={() => handleNavigateTo(PATHS.compareTests)}
        >
          <DashboardIcon />
        </NavbarButton>
        <NavbarButton
          label="TEST NAMES"
          handleClick={() => handleNavigateTo(PATHS.stringForTests)}
        >
          <DashboardIcon />
        </NavbarButton>

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
