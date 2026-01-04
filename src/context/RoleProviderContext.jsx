// context/RoleProviderContext.jsx
"use client";
import { createContext, useContext } from "react";

const RoleContext = createContext(null);

export const RoleProvider = ({ role, children }) => {
  return (
    <RoleContext.Provider value={{ role }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};