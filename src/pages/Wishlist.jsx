import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import Footer from "../components/Footer";
import Navbar from "../components/Homepage/navbar/Navbar";

import SecondHeader from "../components/Homepage/SecondHeader";
import TopHeader from "../components/Homepage/TopHeader";
import Spinner from "../components/utils/Spinner";

import WishlistItem from "../components/wishlist/WishlistItem";
import ServerError from "./500";

function Wishlist() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());

  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/wishlist",
    fetcher
  );

  function deleteItem(id) {
    fetch(`https://api.hamroelectronics.com.np/api/v1/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.status) {
          toast(data.message, {
            type: "success",
          });
          mutate();
        }
      });
    });
  }

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
    return (
      <>
        <TopHeader />
        <SecondHeader />
        <Navbar />

        <div className="w-11/12 mx-auto">
          <h1 className="text-3xl font-bold  text-gray-700 mt-5 mb-2">
            My Wishlist
          </h1>

          {data.data.length == 0 ? (
            <h1 className="text-center text-4xl text-gray-400 font-bold">
              No Items In Wishlist
            </h1>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-10 my-10">
              {data.data.map((wishlist) => {
                let off;

                if (wishlist.products.discountedprice !== undefined) {
                  off =
                    (wishlist.products.discountedprice /
                      wishlist.products.price) *
                    100;
                }

                return (
                  <NavLink to={`/product/view/${wishlist.products.id}`}>
                    <WishlistItem
                      image={wishlist.products.photopath1}
                      item_name={wishlist.products.name}
                      discount_price={wishlist.products.discountedprice}
                      price={wishlist.products.price}
                      delete={() => deleteItem(wishlist.id)}
                      off={Math.floor(off)}
                    />
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

        <Footer />
      </>
    );
  }
}

export default Wishlist;
