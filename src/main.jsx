import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import Wishlist from "./pages/Wishlist";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Wishlist />
  </React.StrictMode>
);
