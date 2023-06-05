import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ClubProvider from "./context/ClubProvider";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <ClubProvider>
        <App />
      </ClubProvider>
    </ChakraProvider>
  </BrowserRouter>
);
