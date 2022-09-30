import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import ProductView from "./pages/ProductView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductView />
  </React.StrictMode>
);
