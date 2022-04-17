import React, { createContext } from "react";
export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [searchInput, setSearchInput] = React.useState();
  return (
    <NavbarContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </NavbarContext.Provider>
  );
};

