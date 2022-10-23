import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function SecondHeader() {
  return (
    <>
      <div className="w-full bg-white shadow-md ">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between py-1 md:py-0">
            <div>
              <NavLink to="/">
                <img
                  src="/logo.png"
                  alt="Hamro Electronics Logo"
                  className="w-20 md:w-32"
                />
              </NavLink>
            </div>
            <div className="relative w-full ml-5 md:ml-0 md:w-6/12">
              <input
                type="text"
                name="search"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="I'm looking for....."
                className="w-full border-gray-400 focus-visible:border-amber-400 border rounded-md py-1 px-5 outline-none "
              />
              <div className="absolute top-[50%] -translate-y-[50%] right-2">
                <i className="ri-search-2-line text-gray-500"></i>
              </div>
            </div>
            <div className="hidden md:flex">
              <NavLink to="/cart">
                <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-lg hover:text-black ">
                  <i className="ri-shopping-cart-2-line mx-1"></i> cart
                </button>
              </NavLink>

              <NavLink to="/wishlist">
                <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-lg hover:text-black ">
                  <i className="ri-heart-3-line mx-1"></i> Wishlist
                </button>
              </NavLink>

              <NavLink to="/profile">
                <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-lg hover:text-black ">
                  <i className="ri-user-3-line mx-1"></i> Profile
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecondHeader;
