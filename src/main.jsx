import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// BrowserRouter gives the whole app access to the url
// it has to wrap <App /> here or any router hook inside App will crash
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
