import SecondHeader from "../components/Homepage/SecondHeader";

import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Homepage/navbar/NavBar";
import useSWR from "swr";
import ServerError from "./500";
import TopHeader from "../components/Homepage/TopHeader";
import { useEffect } from "react";

function Profile() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());

  const { data, error } = useSWR(
    `http://api.hamroelectronics.com.np/api/v1/user`,
    fetcher
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  if (error) {
    if (localStorage.getItem("token")) {
      return <ServerError />;
    }
  }
  if (data) {
    console.log(data);
    return (
      <div className="bg-gray-50 h-full">
        <TopHeader />
        <SecondHeader />
        <Navbar />
        <div className="w-11/12 md:w-9/12 mx-auto bg-white shadow-md rounded-md  my-10 p-10 relative">
          <div>
            <div className="flex items-center">
              <img
                src={`http://api.hamroelectrics.com.np/storage/${data.user.profile_photo}`}
                alt=""
                className="w-16 h-16 md:w-28 md:h-28 object-cover rounded-full shadow-md"
              />
              <div className="px-5">
                <p className="md:text-xl font-bold text-gray-800">
                  {data.user.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {data.user.address}
                </p>
              </div>
            </div>

            <div className="my-5">
              <h1 className="text-xl font-bold">My Details</h1>
              <hr className="my-2" />
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td className="font-bold text-gray-600 px-2 py-2">
                        Name:
                      </td>
                      <td className="font-semibold text-gray-800 px-2 py-2">
                        {data.user.name}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-bold text-gray-600 px-2 py-2">
                        Address:
                      </td>
                      <td className="font-semibold text-gray-800 px-2 py-2">
                        {data.user.address}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-bold text-gray-600 px-2 py-2">
                        Email:
                      </td>
                      <td className="font-semibold text-gray-800 px-2 py-2">
                        {data.user.email}
                      </td>
                    </tr>

                    <tr>
                      <td className="font-bold text-gray-600 px-2 py-2">
                        Phone:
                      </td>
                      <td className="font-semibold text-gray-800 px-2 py-2">
                        {data.user.phone_number}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="absolute top-2 md:top-5 right-2">
              <NavLink to="/profile/edit">
                <button className="px-4 py-1 md:py-2 bg-indigo-500 hover:bg-indigo-600 md:text-base text-xs text-white rounded-md shadow-md mx-3">
                  Edit Profile
                </button>
              </NavLink>
            </div>

            <div className="absolute bottom-5 right-2">
              <NavLink to="/profile/edit">
                <button className="px-4 py-1 md:py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs md:text-base rounded-md shadow-md mx-3">
                  My Orders
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
