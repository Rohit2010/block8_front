import React, { createContext } from "react";
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [followStatus, setFollowStatus] = React.useState();

  return (
    <ProfileContext.Provider value={{ followStatus, setFollowStatus }}>
      {children}
    </ProfileContext.Provider>
  );
};

