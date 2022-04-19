import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { NavbarProvider } from "./context/navbarContext";
import { ProfileProvider } from "./context/profileContext";
import { AuthProvider } from "./context/authContext";
import { ChatProvider } from "./context/chatContext";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <NavbarProvider>
      <ProfileProvider>
        <AuthProvider>
          <ChatProvider>
            <ToastContainer />
            <AppRoutes />
          </ChatProvider>
        </AuthProvider>
      </ProfileProvider>
    </NavbarProvider>
  );
}

export default App;
