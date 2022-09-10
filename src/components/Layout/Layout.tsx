import React from "react";
import { NavigationBarContainer, PagesContainer } from "./Layout.styles";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavigationBarContainer />
      <PagesContainer>{children}</PagesContainer>
    </>
  );
};
