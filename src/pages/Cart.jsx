import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import CartItem from "../components/cart/CartItem";
import Checkout from "../components/cart/Checkout";
import Footer from "../components/Footer";
import Navbar from "../components/Homepage/navbar/NavBar";

import SecondHeader from "../components/Homepage/SecondHeader";
import ServerError from "./500";

function Cart() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());

  const { data, mutate, error } = useSWR("/api/v1/cart", fetcher);

  const [checkout, setCheckout] = useState(false);

  const toggleCheckout = () => {
    if (checkout) {
      setCheckout(false);
    } else {
      setCheckout(true);
    }
  };

  //! Delete Cart Item
  const deleteCartItem = (id) => {
    fetch(`/api/v1/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.status) {
          toast(data.message, { type: "success" });
        }
      });
    });
    mutate();
  };

  //* Update Cart quantity */
  const updateCartQuantity = (id, quantity) => {
    fetch(`/api/v1/cart/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ quantity }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.status) {
          toast(data.message, { type: "success" });
        }
      });
    });
    mutate();
  };

  if (error) {
    if (localStorage.getItem("token")) {
      return <ServerError />;
    } else {
    }
  }
  if (data) {
    let totalPrice = 0;
    data.data.map((cart) => {
      return (totalPrice += cart.price * cart.quantity);
    });
    return (
      <>
        <SecondHeader />
        <Navbar />
        <div className="w-11/12 mx-auto my-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="col-span-2">
              <h1 className="text-xl md:text-2xl font-bold">Shopping Cart</h1>
              <hr className="my-2" />
              {data.data.length < 1 ? (
                <h1 className="text-4xl text-gray-500 font-bold my-3">
                  No Items in cart
                </h1>
              ) : (
                data.data.map((cart) => {
                  return (
                    <CartItem
                      key={cart.id}
                      image={cart.product.photopath1}
                      name={cart.product.name}
                      price={cart.price}
                      quantity={cart.quantity}
                      remove={deleteCartItem}
                      id={cart.id}
                      size={cart.size}
                      color={cart.color}
                      update={updateCartQuantity}
                    />
                  );
                })
              )}

              <div className="flex w-full justify-end mt-4">
                <button className="px-4 py-1 bg-indigo-500 hover:bg-indigo-700 rounded-md shadow-md text-white ">
                  Continue Shopping
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-2xl text-gray-500 font-bold">
                Order Summary
              </h1>
              <hr className="my-2" />
              <div className="flex justify-between w-full px-4 my-2 text-sm">
                <p className="text-gray-800 font-bold">
                  Selected {data.data.length} item(s) Price
                </p>
                <p className="text-gray-500">Rs {totalPrice}</p>
              </div>

              <div className="flex justify-between w-full px-4 my-2 text-sm">
                <p className="text-gray-800 font-bold">Shipping Area</p>
                <p className="text-gray-500">Rs 12345</p>
              </div>

              <div className="flex justify-between w-full px-4 my-2 text-sm">
                <p className="text-gray-800 font-bold">Delivery Charge</p>
                <p className="text-gray-500">Rs 12345</p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between w-full px-4 my-2">
                <p className="text-gray-800 font-bold">Apply Coupon</p>
              </div>
              <div className="flex justify-between w-full px-4 my-2 text-sm relative">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="border border-gray-400 focus-visible:border-gray-800 outline-none py-1 px-4 rounded-md shadow-md w-full"
                />
                <button className="px-4 py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md">
                  Apply
                </button>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between w-full px-4 my-2 text-lg">
                <p className="text-gray-800 font-bold">Total Payable</p>
                <p className="text-gray-500">Rs 12345</p>
              </div>

              <button
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-800 text-white rounded-md shadow-md my-3"
                onClick={toggleCheckout}
              >
                {" "}
                Procced To Checkout
              </button>
            </div>
          </div>
        </div>
        {checkout ? <Checkout hide={toggleCheckout} /> : <></>}
        <Footer />
      </>
    );
  }
}

export default Cart;
