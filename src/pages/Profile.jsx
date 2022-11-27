import SecondHeader from "../components/Homepage/SecondHeader";

import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Homepage/navbar/NavBar";
import useSWR from "swr";
import ServerError from "./500";
import TopHeader from "../components/Homepage/TopHeader";
import { useEffect, useState } from "react";
import Spinner from "../components/utils/Spinner";

function Profile() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());

  const { data, error } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/user`,
    fetcher
  );

  const [orderType, setOrderType] = useState("Pending");

  const { data: orderData, error: orderError } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/user/order`,
    fetcher
  );

  // const { data: toppicks, error: e } = useSWR(
  //   `https://api.hamroelectronics.com.np/api/v1/toppicks`,
  //   fetcher
  // );

  // console.log(toppicks);

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

  if (!data) {
    return <Spinner />;
  }

  if (data) {
    console.log(orderData);

    return (
      <div className="   h-full">
        <TopHeader />
        <SecondHeader />
        <Navbar />

        <div className="w-11/12 md:w-9/12 mx-auto bg-white shadow-md rounded-md  my-10 p-10 relative">
          <div>
            <div className="flex items-center">
              <img
                src={`https://api.hamroelectronics.com.np/public/${data.user.profile_photo}`}
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

            <hr className="my-2" />

            {orderData ? (
              <div className="my-2">
                <h1 className="text-xl font-bold">My Orders</h1>
                <div className="my-2 flex justify-center">
                  <button
                    className={`text-xs md:text-base border border-indigo-500 px-4 py-2 rounded-md shadow  hover:bg-indigo-500 mx-2 hover:text-white ${
                      orderType == "Pending"
                        ? "bg-indigo-500 text-white hover:text-white"
                        : ""
                    }`}
                    onClick={() => setOrderType("Pending")}
                  >
                    Active Orders
                  </button>

                  <button
                    className={`text-xs md:text-base border border-indigo-500 px-4 py-2 rounded-md  shadow  hover:bg-indigo-500 mx-2 hover:text-white ${
                      orderType == "completed"
                        ? "bg-indigo-500 text-white hover:text-white"
                        : ""
                    }`}
                    onClick={() => setOrderType("completed")}
                  >
                    Completed Orders
                  </button>

                  <button
                    className={`text-xs md:text-base border border-indigo-500 px-4 py-2 rounded-md  shadow  hover:bg-indigo-500 mx-2 hover:text-white ${
                      orderType == "cancelled"
                        ? "bg-indigo-500 text-white hover:text-white"
                        : ""
                    }`}
                    onClick={() => setOrderType("cancelled")}
                  >
                    Cancelled Orders
                  </button>
                </div>

                <div className="my-2">
                  <table className="md:text-base text-xs w-full border border-indigo-200 rounded-lg border-collapse">
                    <thead>
                      <tr>
                        <td className="px-2 font-bold py-3">Order Date</td>

                        <td className="px-2 font-bold py-3">Product Photo</td>

                        <td className="px-2 font-bold py-3">Product Name</td>

                        <td className="px-2 font-bold py-3">Size</td>

                        <td className="px-2 font-bold py-3">Color</td>

                        <td className="px-2 font-bold py-3">Quantity</td>

                        <td className="px-2 font-bold py-3">Status</td>
                      </tr>
                    </thead>

                    <tbody className="text-sm">
                      {orderData.data.map((order) => {
                        return order.map((cart) => {
                          if (cart.cart.status == orderType) {
                            return (
                              <tr className="border border-indigo-200">
                                <td className="px-2 py-2 ">
                                  {new Date(
                                    cart.cart.created_at
                                  ).toLocaleDateString()}
                                </td>

                                <td className="px-2 py-2 ">
                                  <img
                                    src={`https://api.hamroelectronics.com.np/public/${cart.cart.photopath}`}
                                    alt=""
                                    className="w-16 h-16 object-cover"
                                  />
                                </td>

                                <td className="px-2 py-2 ">
                                  {cart.cart.productname}
                                </td>

                                <td className="px-2 py-2 ">{cart.cart.size}</td>

                                <td className="px-2 py-2 ">
                                  {cart.cart.color}
                                </td>

                                <td className="px-2 py-2 ">
                                  {cart.cart.quantity}
                                </td>

                                <td className="px-2 py-2 ">
                                  {cart.cart.status}
                                </td>
                              </tr>
                            );
                          }
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
