import React from "react";
import { Navbar } from "../Navigation";
import { NavigationBarContainer, PagesContainer } from "./Layout.styles";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavigationBarContainer>
        <Navbar />
      </NavigationBarContainer>
      <PagesContainer>{children}</PagesContainer>
    </>
  );
};
