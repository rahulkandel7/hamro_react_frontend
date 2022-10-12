import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "remixicon/fonts/remixicon.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductView from "./pages/ProductView";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Category from "./pages/Category";

import Dashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/category/Category";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/view/:id" element={<ProductView />} />
        <Route path="/myorder" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/category" element={<Category />} />

        {/* Admin Route */}
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category">
            <Route index element={<AdminCategory />} />
            <Route path="create" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
          <Route path="subcategory" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
