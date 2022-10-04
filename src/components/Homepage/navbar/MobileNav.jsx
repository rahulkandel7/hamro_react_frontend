import { NavLink } from "react-router-dom";

function MobileNav() {
  return (
    <>
      <div className="md:hidden fixed bottom-0 right-0 left-0 z-50">
        <div className="w-full bg-gray-50 shadow-inner py-1">
          <div className="grid grid-cols-5 w-11/12 mx-auto  place-items-center">
            <NavLink to="/">
              <div>
                <div className="flex justify-center">
                  <i className="ri-home-2-line text-base text-gray-600 "></i>
                </div>
                <p className="text-gray-600 text-xs text-center">Home</p>
              </div>
            </NavLink>

            <div>
              <div className="flex justify-center">
                <i className="ri-menu-3-line text-base text-gray-600 "></i>
              </div>
              <p className="text-gray-600 text-xs text-center">Categories</p>
            </div>

            <NavLink to="/cart">
              <div>
                <div className="flex justify-center">
                  <i className="ri-shopping-cart-2-line text-base text-gray-600 text-center"></i>
                </div>
                <p className="text-gray-600 text-xs text-center">Cart</p>
              </div>
            </NavLink>

            <NavLink to="/wishlist">
              <div>
                <div className="flex justify-center">
                  <i className="ri-heart-3-line text-base text-gray-600 text-center"></i>
                </div>
                <p className="text-gray-600 text-xs text-center">Wishlist</p>
              </div>
            </NavLink>

            <NavLink to="/profile">
              <div>
                <div className="flex justify-center">
                  <i className="ri-user-2-line text-base text-gray-600 text-center"></i>
                </div>
                <p className="text-gray-600 text-xs text-center">Profile</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
