import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//* For toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//* User Pages
import App from "./App";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductView from "./pages/ProductView";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import UserSubCategory from "./pages/UserSubCategory";
import Category from "./pages/Category";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/404";

import Categories from "./pages/Categories";
import ScrollToTop from "./components/utils/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ToastContainer />

      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/view/:id" element={<ProductView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/subcategory/:id" element={<UserSubCategory />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/all-category" element={<Categories />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ScrollToTop>
    </Router>
  </React.StrictMode>
);
