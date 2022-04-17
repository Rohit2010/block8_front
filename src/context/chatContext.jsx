import React, { createContext } from "react";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [searchFrndInput, setSearchFrndInput] = React.useState();
  const [currentChat, setCurrentChat] = React.useState();
  const [arrivalMessage, setArrivalMessage] = React.useState([]);

  return (
    <ChatContext.Provider
      value={{
        searchFrndInput,
        setSearchFrndInput,
        currentChat,
        setCurrentChat,
        arrivalMessage,
        setArrivalMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
