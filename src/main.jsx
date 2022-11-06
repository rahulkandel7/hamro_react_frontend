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
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import UserSubCategory from "./pages/UserSubCategory";
import Category from "./pages/Category";

//* Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/category/Category";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import SubCategory from "./pages/admin/subcategory/SubCategory";
import AddSubCategory from "./pages/admin/subcategory/AddSubCategory";
import EditSubCategory from "./pages/admin/subcategory/EditSubCategory";
import Brand from "./pages/admin/brand/Brand";
import AddBrand from "./pages/admin/brand/AddBrand";
import EditBrand from "./pages/admin/brand/EditBrand";
import Products from "./pages/admin/product/Products";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import ViewProduct from "./pages/admin/product/ViewProduct";
import PageNotFound from "./pages/404";
import Shipping from "./pages/admin/shipping/Shipping";
import AddShipping from "./pages/admin/shipping/AddShipping";
import EditShipping from "./pages/admin/shipping/EditShipping";
import SearchPage from "./pages/SearchPage";
import Banner from "./pages/admin/banner/Banner";
import AddBanner from "./pages/admin/banner/AddBanner";
import EditBanner from "./pages/admin/banner/EditBanner";
import Coupon from "./pages/admin/coupon/Coupon";
import AddCoupon from "./pages/admin/coupon/AddCoupon";
import EditCoupon from "./pages/admin/coupon/EditCoupon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ToastContainer />

      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/view/:id" element={<ProductView />} />
        <Route path="/myorder" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/subcategory/:id" element={<UserSubCategory />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Route */}
        <Route path="admin">
          <Route path="dashboard" element={<Dashboard />} />
          {/* banner Route */}
          <Route path="banner">
            <Route index element={<Banner />} />
            <Route path="create" element={<AddBanner />} />
            <Route path="edit/:id" element={<EditBanner />} />
          </Route>
          {/* Category Route */}
          <Route path="category">
            <Route index element={<AdminCategory />} />
            <Route path="create" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
          {/* Sub Category Route */}
          <Route path="subcategory">
            <Route index element={<SubCategory />} />
            <Route path="create" element={<AddSubCategory />} />
            <Route path="edit/:id" element={<EditSubCategory />} />
          </Route>
          {/* Brand Route */}
          <Route path="brand">
            <Route index element={<Brand />} />
            <Route path="create" element={<AddBrand />} />
            <Route path="edit/:id" element={<EditBrand />} />
          </Route>
          {/* Products Route */}
          <Route path="products">
            <Route index element={<Products />} />
            <Route path="create" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="view/:id" element={<ViewProduct />} />
          </Route>
          {/* Shipping Route */}
          <Route path="shipping">
            <Route index element={<Shipping />} />
            <Route path="create" element={<AddShipping />} />
            <Route path="edit/:id" element={<EditShipping />} />
          </Route>
          {/* Coupon Route */}
          <Route path="coupon">
            <Route index element={<Coupon />} />
            <Route path="create" element={<AddCoupon />} />
            <Route path="edit/:id" element={<EditCoupon />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
