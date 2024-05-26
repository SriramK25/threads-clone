import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./components/theme.js";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);
