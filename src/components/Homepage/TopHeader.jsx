import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function TopHeader() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  });

  const logout = () => {
    fetch("https://api.hamroelectronics.com.np/api/v1/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
    }).then((res) => {
      res.json().then((data) => {
        toast(data.message, {
          type: "success",
        });
        localStorage.removeItem("token");
        window.location.href = "/";
      });
    });
  };
  return (
    <>
      <div className="w-11/12 mx-auto py-1 hidden md:block">
        <div className="flex justify-between text-sm">
          <div className="flex items-center h-full text-gray-500">
            <i className="ri-smartphone-line"></i>
            <p>
              <a href="tel:+9779864068268" className="mx-1">
                9864068268
              </a>
              ,{" "}
              <a href="tel:+9779801521884" className="mx-1">
                9801521884
              </a>
            </p>
          </div>
          <div>
            <div className="flex">
              <a href="https://www.facebook.com">
                <i className="ri-messenger-line text-xl text-gray-500 hover:text-blue-600 mx-1"></i>
              </a>

              <a href="https://www.facebook.com">
                <i className="ri-instagram-line text-xl text-gray-500 hover:text-pink-600 mx-1"></i>
              </a>

              <a href="https://www.facebook.com">
                <i className="ri-twitter-line text-xl text-gray-500 hover:text-sky-500 mx-1"></i>
              </a>
            </div>
          </div>
          <div>
            <div className="flex">
              {isLogged ? (
                <button
                  className="text-gray-500 hover:text-gray-800 mx-1 flex items-center"
                  onClick={logout}
                >
                  <i className="ri-logout-box-line mx-1"></i> Logout
                </button>
              ) : (
                <div>
                  <NavLink
                    to="/login"
                    className="text-gray-500 hover:text-gray-800 mx-1"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-gray-500 hover:text-gray-800 mx-1"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
